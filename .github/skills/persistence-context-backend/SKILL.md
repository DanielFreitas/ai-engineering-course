---
name: persistence-context-backend
description: "Use when: storing conversation history, persisting AI context, vector storage, AI interaction trace, database for AI, MongoDB for context, Postgres for AI, designing schema for AI history, AI data model"
applyTo: "docs/backend/11-persistence-context/**"
---

# Persistência de Contexto e Histórico

## Objetivo
Ensinar como modelar e implementar persistência de dados em sistemas de IA — histórico de conversação, traces de execução, contextos de sessão e o uso de vetores no stack de dados.

## Escopo
**Entra:** Postgres, MongoDB, armazenamento de contexto, histórico e traces de execução, vetores no stack, trade-offs de persistência, atualizações incrementais.

**Não entra:** Bancos de dados vetoriais dedicados em profundidade (ex: Pinecone, Weaviate), cache (módulo 13), pub/sub (módulo 12).

## Quando usar
Use este módulo quando o estudante precisar projetar o esquema de dados para histórico de conversação, contexto de sessão e traces de execução de IA — escolhendo entre SQL e NoSQL.

## Resultado esperado do módulo
O estudante consegue modelar um esquema mínimo para armazenar histórico de interações de IA, implementar operações básicas de CRUD com Postgres ou MongoDB, e entender os trade-offs de cada abordagem.

## Conteúdos principais
1. O que precisa ser persistido em sistemas de IA: histórico, trace, preferências, vetores
2. Postgres para dados estruturados: sessões, mensagens, resultados
3. MongoDB para dados semi-estruturados: logs, contexts, steps de execução
4. Armazenamento de vetores no Postgres com pgvector vs. banco dedicado
5. Esquema mínimo: tabelas/coleções essenciais
6. Trade-offs: consistência, flexibilidade, performance
7. Atualizações incrementais: append-only vs. overwrite
8. Retenção e limpeza: o que deletar e quando

## Estrutura sugerida da aula
1. Introdução — o que se perde sem persistência adequada
2. Conceito — tipos de dados em sistemas de IA
3. Exemplo — esquema de histórico de chat com Postgres
4. Prática — modelar e criar o esquema
5. Fechamento — quando usar SQL vs. NoSQL

## Prática do módulo
**Exercício:** Modele o esquema mínimo (tabelas ou coleções) para armazenar o histórico de interações de um chatbot. O esquema deve suportar: múltiplos usuários, múltiplas sessões por usuário, sequência de mensagens por sessão e metadados básicos (modelo usado, tokens, timestamp). Implemente as operações de inserção e consulta.

**Critérios de validação:**
- O esquema suporta múltiplos usuários e sessões
- Mensagens têm ordem preservada
- Metadados de custo (tokens) são armazenados
- As operações de inserção e consulta funcionam corretamente

## Critérios mínimos de qualidade
- [ ] Chaves primárias e foreign keys definidas onde apropriado
- [ ] Timestamps em todos os registros (created_at, updated_at)
- [ ] Dados sensíveis do usuário não são armazenados sem necessidade
- [ ] Índices criados para campos de consulta frequente (user_id, session_id)
- [ ] Política de retenção de dados documentada

## Relações com outros módulos
- **Módulo 09 (context-memory-state-backend):** O que é persistido para suportar memória
- **Módulo 04 (embeddings-rag-core):** Vetores como parte do stack de dados
- **Módulo 14 (observability-otel-datadog-backend):** Traces de execução armazenados para análise

## Notas de consistência
- Usar UUID como identificador de sessão e conversa
- Nome de tabelas: `sessions`, `messages`, `execution_traces`, `user_preferences`
- Timestamps sempre em UTC
- Nunca armazenar chaves de API ou tokens de acesso em tabelas de histórico
