# Padrões — Redis para Performance em Aplicações de IA

## P01: Cache de Respostas de IA para Prompts Idênticos

Respostas geradas para prompts semanticamente ou textualmente idênticos podem ser cacheadas com TTL adequado, evitando chamadas redundantes ao modelo e reduzindo latência para zero no cache hit. A chave de cache deve incluir o hash do prompt normalizado, a versão do modelo e parâmetros de inferência relevantes. Esse padrão é especialmente eficaz em casos de uso com alta taxa de prompts repetidos, como FAQs, relatórios periódicos e queries de suporte.

## P02: Cache de Contexto de Sessão para Acesso Rápido

O contexto ativo da conversa — os últimos N turnos e metadados da sessão — deve ser mantido no Redis com TTL baseado na janela de inatividade esperada (ex: 30 minutos). Isso elimina a latência de leitura do banco de dados principal a cada request e é especialmente impactante quando o contexto é lido em cada turno. A chave de sessão deve incluir o session_id e o Redis deve ser tratado como cache, não como fonte de verdade — o banco principal é o autoritativo.

## P03: Cache Semântico com Limiar de Similaridade Configurável

Para casos onde prompts diferentes podem ter respostas equivalentes, o cache semântico usa embeddings para calcular similaridade entre a nova query e queries cached. Se a similaridade ultrapassar um limiar (ex: cosine similarity > 0.95), a resposta cacheada é retornada. O limiar deve ser calibrado por domínio: contextos factuais exigem limiares altos (0.97+), contextos criativos ou exploratórios podem usar limiares mais baixos ou não usar cache semântico.

## P04: Invalidação de Cache Baseada em Eventos de Mudança de Dados

Cache de respostas que dependem de dados variáveis — como informações de produto, preços ou documentos do usuário — deve ser invalidado automaticamente quando os dados subjacentes mudam, não apenas por TTL. Um pattern publish/subscribe no Redis permite que o serviço de dados publique eventos de invalidação que os consumers de cache processam imediatamente. A idempotência da invalidação garante que múltiplos eventos de mudança não causem race conditions.

## P05: Reutilização de Resultados Computados em Pipeline de IA

Resultados intermediários de pipelines de IA — embeddings de documentos, chunks processados, classificações de intent — devem ser cacheados no Redis para reutilização em pipelines subsequentes que processam o mesmo documento. Um documento enviado por 1.000 usuários diferentes não precisa ter seus embeddings gerados 1.000 vezes. O cache de pipeline reduz custo e latência em cenários de compartilhamento de base de conhecimento.

## P06: Cache em Camadas (L1 Memória + L2 Redis + L3 Banco)

Para dados de altíssima frequência de acesso — prompts de sistema compilados, configurações de modelo, templates — uma estratégia de cache em camadas minimiza latência: L1 é cache em memória da aplicação (mais rápido, capacidade limitada), L2 é Redis (latência de 1-5ms, capacidade maior), L3 é o banco de dados (fonte de verdade). Cada camada tem TTL menor que a anterior para garantir atualização eventual. Cache warming no startup popula L1 e L2 com dados críticos antes de receber tráfego.

## P07: Monitoramento de Impacto de Cache no Custo de LLM

A taxa de hit/miss do cache deve ser correlacionada com o custo de inferência para quantificar o ROI de cada estratégia de caching. Um dashboard mostrando "tokens economizados por hora" e "custo evitado por hora" torna o valor do cache tangível para stakeholders. Esse monitoramento também revela quando o cache está sendo ineficiente — baixa hit rate indica que a estratégia de chaveamento ou o TTL precisam de ajuste.

## P08: Rate Limiting com Redis para Proteção das APIs de Modelo

Redis é ideal para implementar rate limiting distribuído usando o algoritmo de sliding window ou token bucket: contadores atômicos por usuário/tenant com TTL automático garantem limites precisos mesmo em instâncias múltiplas de serviço. INCR e EXPIRE atômicos via scripts Lua ou comandos pipelining garantem consistência sem race conditions. O rate limiting deve ser aplicado tanto por usuário quanto por tier de serviço.
