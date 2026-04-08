# Casos de Borda — Persistência para Contexto de IA

## CE01: Contexto Excede o Limite de Tokens do Modelo Durante a Sessão

**Cenário:** Uma conversa com múltiplos documentos anexados e dezenas de turnos acumula mais tokens do que o modelo suporta. A chamada à API do modelo retorna erro `context_length_exceeded`.

**Comportamento esperado:** O sistema deve monitorar continuamente o token count acumulado e aplicar a estratégia de truncagem definida (sliding window, sumarização automática ou remoção de turnos mais antigos) antes que o limite seja atingido. O usuário deve ser avisado quando o contexto se aproximar do limite, com opção de resumir ou iniciar nova sessão.

**Risco sem tratamento:** A requisição falha ao atingir o limite, o usuário perde o trabalho da sessão atual e não entende o que aconteceu.

---

## CE02: Falha de Escrita no Banco Durante Streaming de Resposta

**Cenário:** O backend começa a persistir o turno do assistente incrementalmente durante o streaming. No meio do processo, a conexão com o banco de dados cai. O stream continua retornando tokens ao frontend, mas a resposta parcial não é salva completamente.

**Comportamento esperado:** A persistência de turnos deve ser atômica: o turno completo deve ser gravado de uma vez após o término do stream, não incrementalmente durante a geração. Se a gravação final falhar, o sistema deve fazer retry com backoff. O usuário deve ser notificado se a persistência falhar definitivamente, com opção de recuperar a resposta da memória da sessão ativa.

**Risco sem tratamento:** O contexto da base de dados diverge do que o usuário viu, causando comportamentos incoerentes em turnos subsequentes.

---

## CE03: Busca Vetorial Retorna Resultados Semanticamente Incorretos por Drift de Embedding

**Cenário:** O modelo de embedding é atualizado para uma nova versão. Embeddings antigos gerados com a versão anterior são matematicamente incompatíveis com queries usando a nova versão, resultando em buscas semânticas com resultados de baixa qualidade.

**Comportamento esperado:** A versão do modelo de embedding deve ser armazenada junto com cada embedding. Ao mudar a versão do modelo, os embeddings existentes devem ser regenerados em um processo de migração background. Queries devem ser roteadas para o índice correspondente à versão de embedding correta até que a migração seja completa.

**Risco sem tratamento:** A qualidade da busca semântica degrada silenciosamente após atualização do modelo de embedding, sem alarme ou detecção automática.

---

## CE04: Concorrência — Dois Requests Gravando no Mesmo Session State

**Cenário:** O usuário abre a mesma sessão em duas abas do browser e envia mensagens simultaneamente. Dois requests concorrentes tentam gravar o próximo turno com o mesmo `turn_index`.

**Comportamento esperado:** A tabela de turnos deve ter constraint `UNIQUE (session_id, turn_index)`. A lógica de persistência deve usar uma sequência atômica para o índice do turno (via sequence de banco ou lock otimista) e tratar erros de constraint com retry automático. Sessões ativas não devem ser abertas em múltiplos contextos simultâneos sem controle de concorrência.

**Risco sem tratamento:** Dados corrompidos por race condition, turnos duplicados ou perdidos, ou erro de unicidade exposto ao usuário.

---

## CE05: Expiração de Sessão Durante Operação de Longa Duração

**Cenário:** Uma tarefa de agente demora 25 minutos para completar. A sessão tem TTL de 20 minutos. Quando o agente tenta persistir os resultados finais, a sessão expirou e foi marcada como inativa.

**Comportamento esperado:** TTLs de sessão devem ser renovados automaticamente enquanto há operações ativas associadas a ela. O sistema deve verificar o status da sessão antes de iniciar operações longas e atualizá-la para um estado que impeça expiração prematura. Operações críticas de persistência devem funcionar mesmo se o TTL nominal expirou, com uma janela de graça.

**Risco sem tratamento:** Resultados de operações longas custosas são perdidos por expiração de sessão, desperdiçando tokens e tempo de computação.

---

## CE06: Corrupção de Estado por Rollback Parcial de Transação

**Cenário:** Uma operação multi-passo persiste o turno do usuário com sucesso, mas falha ao gerar e salvar o embedding correspondente. A transação não envolvia os dois passos atomicamente, resultando em um turno sem embedding indexado.

**Comportamento esperado:** Operações de persistência que envolvem múltiplas tabelas ou sistemas (SQL + banco vetorial) devem ser agrupadas de forma que uma falha parcial seja detectável e recuperável. Um job de reconciliação periódico deve identificar e corrigir turnos sem embeddings. O estado inconsistente nunca deve causar erros silenciosos na busca semântica.

**Risco sem tratamento:** Partes do contexto ficam invisíveis para a busca semântica porque seus embeddings não foram gerados, resultando em respostas do modelo que ignoram informações relevantes já fornecidas pelo usuário.

---

## CE07: Migração de Esquema com Sessões Ativas em Produção

**Cenário:** Uma migração de banco de dados adiciona uma coluna `NOT NULL` sem valor padrão à tabela `conversation_turns`. Requests em andamento falham ao tentar inserir novos turnos durante a janela de migração.

**Comportamento esperado:** Migrações de schema em tabelas de alta escrita devem ser executadas em múltiplas fases: adicionar coluna nullable → preencher valores padrão em background → adicionar constraint NOT NULL. Ferramentas como `pg-osc` (online schema change) ou migrações zero-downtime devem ser usadas. A janela de impacto de migrações deve ser documentada e comunicada antes da execução.

**Risco sem tratamento:** Requests de usuários ativos falham durante a janela de migração, causando perda de dados de contexto e experiência degradada sem aviso prévio.
