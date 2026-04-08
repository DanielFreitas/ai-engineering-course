# Contratos — Integração Frontend-Backend para Fluxos de IA

## Contrato SSE (Server-Sent Events)

### Endpoint de Geração com Streaming

```
POST /api/ai/generate/stream
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "session_id": "string (UUID)",
  "prompt": "string (máx. 4096 chars)",
  "context": {
    "history": [
      { "role": "user"|"assistant", "content": "string" }
    ],
    "metadata": { "model": "string", "temperature": "number 0-1" }
  }
}
```

**Response Stream (text/event-stream):**
```
event: token
data: {"delta": "string", "index": 0}

event: token
data: {"delta": "string", "index": 1}

event: done
data: {"finish_reason": "stop"|"length"|"cancelled", "usage": {"prompt_tokens": 0, "completion_tokens": 0}}

event: error
data: {"code": "string", "message": "string", "retryable": true}
```

---

## Contrato WebSocket

### Protocolo de Mensagens

**Conexão:**
```
ws(s)://<host>/api/ai/ws?session_id=<UUID>&token=<JWT>
```

**Mensagens Cliente → Servidor:**
```json
{ "type": "start", "payload": { "prompt": "string", "context": {} } }
{ "type": "cancel", "payload": { "request_id": "string" } }
{ "type": "ping", "payload": {} }
```

**Mensagens Servidor → Cliente:**
```json
{ "type": "token", "payload": { "delta": "string", "request_id": "string" } }
{ "type": "status", "payload": { "state": "queued"|"processing"|"done"|"error", "request_id": "string" } }
{ "type": "error", "payload": { "code": "string", "message": "string" } }
{ "type": "pong", "payload": { "server_time": "ISO8601" } }
```

---

## Contrato de Polling para Tarefas Assíncronas

### Submissão de Tarefa

```
POST /api/ai/tasks
Content-Type: application/json
```

**Request:**
```json
{
  "task_type": "embedding_generation"|"document_analysis"|"batch_inference",
  "input": { /* payload específico por tipo */ },
  "callback_url": "string (opcional)",
  "priority": "low"|"normal"|"high"
}
```

**Response (202 Accepted):**
```json
{
  "task_id": "string (UUID)",
  "status": "queued",
  "estimated_duration_ms": 5000,
  "poll_after_ms": 2000
}
```

### Consulta de Status

```
GET /api/ai/tasks/{task_id}
```

**Response:**
```json
{
  "task_id": "string",
  "status": "queued"|"processing"|"completed"|"failed"|"cancelled",
  "progress": {
    "percentage": 0,
    "current_step": "string",
    "steps_total": 0
  },
  "result": { /* presente apenas quando status=completed */ },
  "error": { "code": "string", "message": "string" },
  "created_at": "ISO8601",
  "updated_at": "ISO8601"
}
```

### Cancelamento de Tarefa

```
DELETE /api/ai/tasks/{task_id}
```

**Response (200 OK):**
```json
{
  "task_id": "string",
  "status": "cancelled",
  "cancelled_at": "ISO8601"
}
```

---

## Contrato de Erros Padronizados

Todos os endpoints retornam erros no formato:

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED"|"MODEL_UNAVAILABLE"|"CONTEXT_TOO_LONG"|"INVALID_INPUT"|"INTERNAL_ERROR",
    "message": "string (human-readable, pt-BR)",
    "details": {},
    "request_id": "string",
    "retryable": true,
    "retry_after_ms": 1000
  }
}
```

---

## Contrato de Headers HTTP

| Header | Direção | Descrição |
|--------|---------|-----------|
| `X-Request-ID` | Request | ID único gerado pelo cliente para rastreabilidade |
| `X-Session-ID` | Request | ID da sessão de conversa ativa |
| `X-Model-Version` | Response | Versão do modelo utilizado na resposta |
| `X-RateLimit-Remaining` | Response | Requisições restantes na janela atual |
| `X-RateLimit-Reset` | Response | Timestamp Unix de reset do rate limit |
