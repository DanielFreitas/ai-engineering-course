# Contratos — Arquitetura Assíncrona com Pub/Sub para IA

## Contrato de Esquema de Mensagem Base

Todas as mensagens de eventos devem incluir o envelope padrão:

```json
{
  "envelope": {
    "id": "string (UUID — idempotency key)",
    "type": "string (ex: document.uploaded, embedding.requested)",
    "version": "string (semver do schema, ex: 1.0.0)",
    "source": "string (nome do serviço emissor)",
    "timestamp": "ISO8601",
    "trace_id": "string (propagado do request originador)",
    "retry_count": 0,
    "correlation_id": "string (ID do workflow ou sessão relacionada)"
  },
  "payload": { /* específico por tipo de evento */ }
}
```

---

## Contratos de Eventos por Tipo

### `document.uploaded`

```json
{
  "payload": {
    "document_id": "string (UUID)",
    "user_id": "string (UUID)",
    "session_id": "string (UUID)",
    "file_name": "string",
    "file_size_bytes": 0,
    "mime_type": "string",
    "storage_path": "string (gs:// ou s3://)",
    "upload_timestamp": "ISO8601",
    "processing_config": {
      "chunk_size": 512,
      "chunk_overlap": 50,
      "embedding_model": "string"
    }
  }
}
```

### `embedding.requested`

```json
{
  "payload": {
    "document_id": "string",
    "chunks": [
      {
        "chunk_id": "string",
        "text": "string",
        "metadata": { "page": 0, "section": "string" }
      }
    ],
    "embedding_model": "string",
    "target_collection": "string",
    "priority": "low"|"normal"|"high"
  }
}
```

### `embedding.completed`

```json
{
  "payload": {
    "document_id": "string",
    "chunks_processed": 0,
    "chunks_failed": 0,
    "embedding_model": "string",
    "model_version": "string",
    "total_tokens_used": 0,
    "processing_duration_ms": 0,
    "status": "success"|"partial"|"failed"
  }
}
```

### `ai.task.status_changed`

```json
{
  "payload": {
    "task_id": "string",
    "task_type": "string",
    "previous_status": "queued"|"processing"|"completed"|"failed",
    "new_status": "queued"|"processing"|"completed"|"failed",
    "progress_percentage": 0,
    "error": {
      "code": "string",
      "message": "string",
      "retryable": true
    }
  }
}
```

---

## Contrato de Tópicos e Assinaturas

| Tópico | Publisher | Subscriber(s) | Retenção |
|--------|-----------|---------------|----------|
| `ai.documents.uploaded` | API Service | Document Processor | 7 dias |
| `ai.embeddings.requested` | Document Processor | Embedding Worker | 7 dias |
| `ai.embeddings.completed` | Embedding Worker | Index Service, Notification Service | 7 dias |
| `ai.tasks.status` | Any Worker | Dashboard Service, Notification Service | 3 dias |
| `ai.tasks.failed` | Any Worker | DLQ Monitor, Alerting Service | 30 dias |

---

## Contrato de Dead Letter Queue

Mensagens na DLQ incluem metadados de falha adicionais:

```json
{
  "dlq_metadata": {
    "original_topic": "string",
    "original_message_id": "string",
    "retry_attempts": 3,
    "first_failure_at": "ISO8601",
    "last_failure_at": "ISO8601",
    "failure_reason": "string",
    "error_details": {
      "code": "string",
      "message": "string",
      "stack_trace_sample": "string"
    }
  },
  "original_message": { /* mensagem original completa */ }
}
```

---

## Contrato de Idempotência

Workers devem verificar idempotência consultando a tabela de mensagens processadas:

```sql
CREATE TABLE processed_messages (
  message_id   UUID PRIMARY KEY,
  topic        VARCHAR(200) NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  worker_id    VARCHAR(100),
  outcome      VARCHAR(20) CHECK (outcome IN ('success', 'skipped'))
);

CREATE INDEX idx_processed_messages_topic ON processed_messages(topic, processed_at);
```

Regra: antes de processar qualquer mensagem, o worker deve verificar se `message_id` já existe. Se existir, a mensagem deve ser acknowledged sem reprocessamento (outcome = 'skipped').
