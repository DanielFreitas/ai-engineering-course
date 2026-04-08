# Padrões — Persistência de Contexto e Histórico

## P01: UUID como Identificador de Sessão
Use UUID v4 como identificador de sessão e conversa. UUIDs são difíceis de adivinhar (reduz enumeração), únicos globalmente e padronizados. Nunca use IDs sequenciais para entidades de usuário.

## P02: Timestamps em UTC em Todos os Registros
Armazene todos os timestamps em UTC. Conversão para o fuso horário do usuário deve acontecer na camada de apresentação. Misturar fusos no banco de dados causa ordenação errada e bugs difíceis de rastrear.

## P03: Índices em Campos de Consulta Frequente
Crie índices nos campos usados em filtros de consulta: `user_id`, `session_id`, `created_at`. Sem índices, consultas de histórico ficam lentas à medida que os dados crescem. Revise o plano de execução das queries principais.

## P04: Política de Retenção de Dados
Defina explicitamente por quanto tempo cada tipo de dado é retido: histórico de sessão (ex: 90 dias), traces de execução (ex: 30 dias), preferências do usuário (ex: indefinidamente até exclusão). Implemente limpeza automática.

## P05: Schema Append-Only para Histórico
Projete o esquema de mensagens como append-only (nunca atualiza, apenas insere). Isso simplifica concorrência, facilita auditoria e permite reprocessamento histórico. Para "editar" uma mensagem, insira uma nova versão com referência à original.

## P06: Separação entre Dados de Negócio e Metadados de IA
Separe dados de negócio (conteúdo da mensagem) de metadados de IA (modelo usado, tokens, latência, versão do prompt). Os metadados de IA podem ser armazenados em uma tabela separada ligada à mensagem, para não poluir o modelo de domínio.

## P07: Migração de Schema Compatível com Versões Anteriores
Ao evoluir o schema do banco de dados, garanta retrocompatibilidade: adicione campos com valor padrão, nunca remova campos usados, renomeie com período de transição. Migrações devem ser executáveis sem downtime.

## P08: Validação de Integridade Referencial
Garanta que sessões sem usuário associado não existam, que mensagens sem sessão não existam (foreign keys). Dados órfãos são difíceis de limpar e causam comportamentos inesperados.
