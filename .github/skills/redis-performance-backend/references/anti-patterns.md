# Anti-Padrões — Redis para Performance em Aplicações de IA

## AP01: Cache sem Estratégia de Invalidação Definida

Usar apenas TTL como mecanismo de invalidação — sem invalidação por evento de mudança de dados — resulta em cache serving dados desatualizados até o TTL expirar. Em contextos de IA onde os dados de base mudam com frequência (documentos atualizados, configurações de modelo alteradas, prompts modificados), TTL longo significa respostas potencialmente incorretas servidas com confiança. A estratégia de invalidação deve ser definida antes da implementação, não adicionada depois.

## AP02: TTL Excessivamente Longo para Respostas com Dados Dinâmicos

Cachear respostas de IA com TTL de dias ou semanas quando os dados subjacentes mudam com frequência semelhante torna o cache fonte de desinformação. Um usuário que pergunta sobre o preço de um produto receberá a resposta desatualizada durante toda a vigência do TTL. O TTL deve ser calibrado pelo tempo máximo aceitável de desatualização por domínio, não pelo máximo tecnicamente possível.

## AP03: Cache Semântico sem Calibração do Limiar de Similaridade

Implementar cache semântico com limiar genérico sem calibração por domínio resulta em cache hits incorretos — retornar a resposta de "qual é a capital da França?" para a query "qual é a capital da Alemanha?" se o limiar estiver muito baixo. O limiar de similaridade deve ser escolhido empiricamente com base em exemplos reais do domínio, testando pares de queries e avaliando se a resposta cacheada seria adequada para a nova query.

## AP04: Cachear Respostas Personalizadas ou Sensíveis ao Usuário

Cachear respostas que dependem da identidade, histórico ou dados privados de um usuário específico — usando apenas o prompt como chave de cache — pode servir a resposta de um usuário para outro. Um prompt como "quais são as minhas compras recentes?" deve nunca ter cache compartilhado entre usuários. A chave de cache deve incluir o user_id para qualquer resposta que varia por usuário, ou o cache deve ser por usuário em namespace separado.

## AP05: Usar Redis como Banco de Dados Principal para Contexto de IA

Persistir contextos de conversa, histórico de sessões e embeddings exclusivamente no Redis — tratando-o como banco de dados primário — cria risco de perda de dados ao reiniciar o cluster, exaurir memória ou em caso de falha sem RDB/AOF configurado. Redis é otimizado para cache e dados efêmeros, não para persistência durável. O banco de dados principal (Postgres, MongoDB) deve ser a fonte de verdade; o Redis é o cache.

## AP06: Ausência de Monitoramento de Hit Rate e Métricas de Cache

Operar sem monitoramento de hit rate, miss rate e latência do cache é operar à cegas. Uma hit rate de 20% indica que o cache está consumindo memória e latência de rede sem entregar valor proporcional. Sem métricas de cache, não é possível justificar o custo da infraestrutura Redis, detectar degradação de eficiência ao longo do tempo ou tomar decisões informadas sobre estratégia de chaveamento e TTL.

## AP07: Invalidação em Cascata Descontrolada

Estratégias de invalidação que, ao invalidar um item, disparam invalidações de múltiplos outros itens relacionados podem causar cache stampede: todos os itens expiram simultaneamente e múltiplas requisições simultâneas fazem cache miss ao mesmo tempo, bombardeando o banco e o modelo. Técnicas como probabilistic early expiration, cache locks (mutex) e cache warming gradual previnem a invalidação em cascata de se tornar um incidente de produção.
