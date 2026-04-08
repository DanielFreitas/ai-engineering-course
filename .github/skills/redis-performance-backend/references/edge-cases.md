# Casos de Borda — Redis para Performance em Aplicações de IA

## CE01: Cache Stampede ao Expirar Chave de Alta Frequência

**Cenário:** Uma chave de cache de resposta muito acessada (ex: FAQ popular com 500 req/s) tem seu TTL expirado. Centenas de requests simultâneos detectam o cache miss ao mesmo tempo e todos disparam a chamada ao modelo simultaneamente, sobrecarregando a API de LLM.

**Comportamento esperado:** Implementar probabilistic early expiration (rever o TTL com pequena probabilidade antes do vencimento) ou cache locking com mutex (primeiro request que detecta miss adquire lock, os demais aguardam). O Redis SET NX (set if not exists) com TTL curto implementa o mutex de forma atômica. Após a regeneração, o lock é liberado e todos os waiters recebem o novo valor.

**Risco sem tratamento:** Pico de latência severo e possível violação de rate limit da API do provedor de LLM, causando erros em cascata para outros usuários.

---

## CE02: Redis Fora do Ar — Aplicação Sem Fallback para o Banco

**Cenário:** O Redis fica indisponível por falha de rede ou reinicialização. A aplicação não tem circuit breaker configurado e cada request tenta conectar ao Redis com timeout de 5 segundos, cascateando latência para todas as respostas.

**Comportamento esperado:** O circuit breaker de Redis deve detectar falhas consecutivas e abrir o circuito, fazendo com que as operações de cache sejam puladas (bypass, não erro) com fallthrough para o banco de dados. O sistema deve funcionar de forma degradada (sem cache) durante a indisponibilidade do Redis, sem falhar. Alertas de circuit breaker aberto devem notificar o time de operações imediatamente.

**Risco sem tratamento:** A indisponibilidade do Redis causa indisponibilidade em cascata de toda a aplicação, mesmo que o banco de dados e o modelo estejam saudáveis.

---

## CE03: Memória Redis Esgotada por Chaves sem TTL ou TTL Excessivamente Longo

**Cenário:** Embeddings cacheados de documentos são armazenados com TTL de 90 dias. Com crescimento de usuários, o volume de embeddings cached satura a memória disponível no Redis.

**Comportamento esperado:** A política de evição do Redis deve ser configurada como `allkeys-lru` ou `volatile-lru` para remover as chaves menos recentemente usadas quando a memória estiver próxima do limite. Alertas de uso de memória devem disparar a 70% e 90% do limite configurado. TTLs de embeddings cacheados devem ser proporcionais à frequência de acesso — documentos raramente acessados não justificam cache de longa duração.

**Risco sem tratamento:** Redis começa a rejeitar escritas com `OOM command not allowed` ou adota política de evição não configurada explicitamente, potencialmente removendo chaves críticas (como sessões ativas) em vez das menos importantes.

---

## CE04: Cache Semântico Retorna Resposta Incorreta por Limiar Mal Calibrado

**Cenário:** Um limiar de similaridade de 0.90 é usado para cache semântico de um sistema de orientação jurídica. A query "quais são os direitos do consumidor na compra de produto com defeito?" tem similaridade 0.91 com "quais são os direitos do consumidor no cancelamento de serviço?" e retorna a resposta da query de cancelamento.

**Comportamento esperado:** O limiar deve ser calibrado especificamente para o domínio jurídico, onde a semântica é precisa e respostas incorretas têm consequências sérias — provavelmente 0.97+. O cache semântico deve incluir logging de cache hits para auditoria periódica de qualidade. Em domínios críticos, o cache semântico deve ser considerado com cautela e validado extensivamente antes de ativação em produção.

**Risco sem tratamento:** Usuários recebem orientação jurídica incorreta por cache hit semântico inadequado, com potencial impacto legal para a plataforma.

---

## CE05: Race Condition na Atualização de Cache de Sessão

**Cenário:** Dois requests da mesma sessão chegam simultaneamente (usuário com conexão instável enviou o mesmo mensagem duas vezes). Ambos leem o contexto do Redis, adicionam a mensagem do usuário e escrevem de volta — o segundo sobrescreve as mudanças do primeiro, resultando em um turno duplicado ou perdido.

**Comportamento esperado:** Atualizações de sessão devem usar operações atômicas do Redis (MULTI/EXEC ou scripts Lua) ou locking por session_id para garantir serialização das escritas. A lógica de append de turno deve verificar o índice atual antes de adicionar, usando o turn_index como guard de concorrência. Sessões devem ter timestamps de última modificação para detecção de conflitos.

**Risco sem tratamento:** O estado da sessão fica corrompido com turnos faltando ou duplicados, causando comportamentos incoerentes do modelo em turnos subsequentes.

---

## CE06: Dados Sensíveis Persistidos em Redis sem Criptografia

**Cenário:** Contextos de conversa contendo informações médicas, financeiras ou pessoais identificáveis são armazenados no Redis sem criptografia em repouso. O servidor Redis é comprometido por acesso não autorizado à rede interna.

**Comportamento esperado:** Redis deve ser configurado com autenticação obrigatória (requirepass ou ACLs). Dados sensíveis no cache devem ser criptografados em nível de aplicação antes de serem escritos no Redis (criptografia envelope com KMS). O Redis não deve ser exposto diretamente à internet — deve ser acessível apenas pela rede interna do cluster. Backups e snapshots (RDB) também devem ser criptografados.

**Risco sem tratamento:** Vazamento de dados sensíveis de usuários, violação de LGPD e potencial exposição legal significativa para a organização.

---

## CE07: Invalidação Incompleta Deixa Cache Inconsistente após Migração de Dados

**Cenário:** Uma migração de banco de dados renomeia campos em documentos de usuários. O serviço é atualizado para usar os novos nomes, mas respostas cacheadas no Redis ainda referenciam os campos antigos e são servidas por horas até o TTL expirar.

**Comportamento esperado:** Migrações de dados que alteram a semântica das respostas de IA devem incluir etapa de invalidação de cache como parte do processo de deploy. A estratégia recomendada é versionamento de namespace de cache — ao mudar o schema, incrementa-se o namespace (`ai:v2:response:...`), efetivamente invalidando todo o cache antigo instantaneamente. As chaves antigas expiram naturalmente pelo TTL, sem custo de invalidação explícita.

**Risco sem tratamento:** Respostas baseadas em dados desatualizados são servidas com aparência de dados frescos, podendo causar decisões incorretas por parte dos usuários durante a janela de inconsistência.
