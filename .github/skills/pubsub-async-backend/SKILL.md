---
name: pubsub-async-backend
description: "Use when: async AI processing, background job for AI, pub/sub for AI pipeline, decoupling AI requests, embedding generation in background, retry with queue, dead letter queue, long-running AI task, idempotent AI processing"
applyTo: "docs/backend/12-pubsub-async/**"
---

# Pub/Sub e Processamento Assíncrono

## Objetivo
Ensinar como desacoplar operações de IA usando Pub/Sub e processamento assíncrono — especialmente para tarefas de longa duração, geração de embeddings em background, retentativas e pipelines distribuídos.

## Escopo
**Entra:** Desacoplamento, Pub/Sub, jobs de longa duração, geração de embeddings em background, retentativas, idempotência, fila de mensagens mortas (DLQ), pipelines distribuídos.

**Não entra:** Streaming de resposta ao usuário (módulo 19), orquestração de workflows complexos (ex: Airflow), filas de tarefa síncronas.

## Quando usar
Use este módulo quando o estudante precisar processar operações de IA que não podem bloquear o request HTTP — como ingestão de documentos, geração de embeddings em batch ou envio de notificações baseadas em IA.

## Resultado esperado do módulo
O estudante consegue projetar ou implementar um fluxo onde um request HTTP publica um evento e o processamento acontece de forma assíncrona — com retentativas e garantia de pelo menos uma entrega.

## Conteúdos principais
1. Por que desacoplar: latência, confiabilidade e escalabilidade
2. Padrão Pub/Sub: publisher, subscriber, tópico, mensagem
3. Casos de uso em IA: indexação de documentos, geração de embeddings, notificações
4. Retentativas: estratégias e limites
5. Idempotência: processar a mesma mensagem mais de uma vez com segurança
6. Dead Letter Queue (DLQ): o que fazer com mensagens que falham
7. Pipelines distribuídos: encadear múltiplos processadores
8. Monitoramento de filas: profundidade, latência, taxa de erros

## Estrutura sugerida da aula
1. Introdução — o problema da sincronicidade em fluxos de IA
2. Conceito — arquitetura Pub/Sub
3. Exemplo — ingestão assíncrona de documentos para RAG
4. Prática — projetar ou implementar um fluxo assíncrono
5. Fechamento — trade-offs de sistemas assíncronos

## Prática do módulo
**Exercício:** Projete (ou implemente com uma fila simples como Redis ou in-memory) um fluxo onde `POST /documents` publica um evento de ingestão e um worker processa o documento (chunking + embedding) de forma assíncrona. Implemente retentativa em caso de falha de processamento.

**Critérios de validação:**
- O endpoint HTTP retorna imediatamente (não bloqueia aguardando processamento)
- O worker processa o documento de forma independente
- Uma falha de processamento aciona retentativa (máximo 3 tentativas)
- Mensagens que falham em todas as tentativas são movidas para DLQ

## Critérios mínimos de qualidade
- [ ] Publisher não aguarda a conclusão do processamento
- [ ] Mensagens são idempotentes (reprocessar não gera duplicatas)
- [ ] DLQ existe e é monitorada
- [ ] Logs identificam cada etapa do processamento assíncrono
- [ ] Há um mecanismo de consulta de status do job

## Relações com outros módulos
- **Módulo 04 (embeddings-rag-core):** Embeddings gerados em background
- **Módulo 11 (persistence-context-backend):** Estado do job persistido para consulta
- **Módulo 14 (observability-otel-datadog-backend):** Monitoramento de filas e workers

## Notas de consistência
- Mensagens de fila devem ter `message_id` único para idempotência
- Incluir timestamp de publicação em toda mensagem
- Nomear eventos com verbos no passado: `document.uploaded`, `embedding.requested`
- DLQ deve conter a mensagem original + motivo do erro + número de tentativas
