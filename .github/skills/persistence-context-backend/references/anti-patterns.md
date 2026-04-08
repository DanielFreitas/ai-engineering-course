# Anti-Padrões — Persistência para Contexto de IA

## AP01: Armazenar Contexto Completo sem Estratégia de Compressão

Persistir o histórico integral de conversas crescentes sem nenhuma estratégia de compressão ou sumarização resulta em contextos que rapidamente excedem os limites de tokens do modelo e aumentam exponencialmente a latência e o custo de cada novo request. À medida que a conversa cresce, o overhead de processamento do contexto completo supera o valor marginal das informações mais antigas. O sistema deve implementar janelas deslizantes, sumarização automática ou seleção semântica de turnos relevantes.

## AP02: Recarregar o Histórico Completo a Cada Novo Request

Fazer uma busca completa no banco de dados para carregar todo o histórico de contexto a cada request, sem nenhuma estratégia de cache ou carregamento incremental, cria um gargalo de I/O que escala linearmente com o tamanho da conversa. Contextos frequentemente acessados devem ser mantidos em memória ou cache de aplicação (Redis) e apenas atualizados incrementalmente com novos turnos. Carregar tudo a cada vez é ineficiente mesmo para conversas curtas.

## AP03: Sem Estratégia de Expiração e Limpeza de Contextos Antigos

Acumular indefinidamente contextos de sessões abandonadas, conversas inativas e históricos de usuários inativos sem política de retenção e expiração resulta em crescimento ilimitado do banco de dados. Contextos antigos raramente têm valor após um período de inatividade, mas continuam consumindo espaço e afetando performance de queries. Políticas de TTL e archiving devem ser definidas antes de ir para produção.

## AP04: Misturar Dados de Contexto de Usuários Diferentes no Mesmo Registro

Armazenar contextos de múltiplos usuários sem isolamento adequado — seja por compartilhamento de IDs, por sessões sem namespace ou por falta de validação de ownership — cria risco de vazamento de informação entre usuários. Mesmo que não intencional, uma query sem filtro de user_id pode retornar dados de outro usuário. O isolamento de contexto por usuário deve ser garantido em nível de schema (chave de partição), não apenas em nível de aplicação.

## AP05: Operações de Persistência Síncronas no Hot Path de Request

Inserir cada turn de conversa no banco de dados de forma síncrona dentro do fluxo principal de request — antes de retornar a resposta ao usuário — adiciona latência de I/O desnecessária ao caminho crítico. A persistência de contexto pode ser feita de forma assíncrona (fire-and-forget com garantia eventual) na maioria dos casos, sem afetar a experiência do usuário. Apenas operações que devem ser confirmadas antes de prosseguir justificam persistência síncrona.

## AP06: Vetores sem Indexação Adequada para Busca

Armazenar embeddings de contexto em colunas de banco de dados sem índice vetorial adequado — usando apenas busca por full scan — resulta em queries de similaridade com complexidade O(n) que não escalam. Bancos de dados vetoriais (pgvector com HNSW/IVFFlat, Pinecone, Qdrant) ou índices especializados são necessários para que a busca semântica seja viável em escala de produção. A ausência de indexação transforma a busca semântica em um gargalo de performance.

## AP07: Histórico de Contexto sem Versionamento ou Snapshot de Estado

Sobrescrever o estado do contexto sem manter histórico de versões ou snapshots torna impossível rollback de estado em caso de corrompimento, debugging de comportamentos inesperados e auditoria de mudanças. Para contextos que representam estado de agentes ou fluxos de trabalho multi-etapa, a perda do histórico de estado pode ser irrecuperável. Um log append-only de mutações de contexto oferece rastreabilidade sem custo excessivo de armazenamento.
