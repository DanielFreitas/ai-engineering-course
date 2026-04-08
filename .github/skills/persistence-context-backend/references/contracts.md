# Contratos — Persistência para Contexto de IA

## Contrato de Esquema de Sessão de Contexto

### Postgres — Tabela de Sessões

```sql
CREATE TABLE ai_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id),
  title         TEXT,
  model_version VARCHAR(100) NOT NULL,
  status        VARCHAR(20) NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active', 'archived', 'deleted')),
  token_count   INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at    TIMESTAMPTZ,
  metadata      JSONB DEFAULT '{}'
);

CREATE INDEX idx_ai_sessions_user_id ON ai_sessions(user_id);
CREATE INDEX idx_ai_sessions_status  ON ai_sessions(status, updated_at DESC);
```

### Postgres — Tabela de Turnos de Conversa

```sql
CREATE TABLE conversation_turns (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID NOT NULL REFERENCES ai_sessions(id) ON DELETE CASCADE,
  turn_index      INTEGER NOT NULL,
  role            VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system', 'tool')),
  content         TEXT NOT NULL,
  content_tokens  INTEGER NOT NULL DEFAULT 0,
  tool_calls      JSONB,
  tool_results    JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (session_id, turn_index)
);

CREATE INDEX idx_turns_session_id ON conversation_turns(session_id, turn_index);
```

---

## Contrato de Esquema de Contexto Vetorial

### pgvector — Tabela de Embeddings de Contexto

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE context_embeddings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    UUID NOT NULL REFERENCES ai_sessions(id) ON DELETE CASCADE,
  turn_id       UUID REFERENCES conversation_turns(id),
  chunk_text    TEXT NOT NULL,
  embedding     vector(1536) NOT NULL,
  chunk_index   INTEGER NOT NULL DEFAULT 0,
  source_type   VARCHAR(50),  -- 'conversation', 'document', 'tool_result'
  source_id     UUID,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índice HNSW para busca aproximada eficiente
CREATE INDEX idx_embeddings_hnsw ON context_embeddings
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
```

---

## Contrato de API de Contexto

### Ler Contexto de Sessão

```
GET /api/sessions/{session_id}/context
?max_tokens=4096
&include_embeddings=false
&strategy=sliding_window|semantic|full
```

**Response:**
```json
{
  "session_id": "string",
  "turns": [
    {
      "turn_index": 0,
      "role": "user"|"assistant"|"system",
      "content": "string",
      "content_tokens": 0,
      "created_at": "ISO8601"
    }
  ],
  "total_tokens": 0,
  "truncated": false,
  "truncation_strategy": "string"
}
```

### Persistir Novo Turno

```
POST /api/sessions/{session_id}/turns
```

```json
{
  "role": "user"|"assistant",
  "content": "string",
  "tool_calls": [],
  "tool_results": [],
  "generate_embedding": true
}
```

---

## Contrato de Traces de Execução (MongoDB)

```json
{
  "_id": "ObjectId",
  "session_id": "UUID",
  "user_id": "UUID",
  "execution_trace": {
    "started_at": "ISO8601",
    "completed_at": "ISO8601",
    "steps": [
      {
        "step_index": 0,
        "step_type": "llm_call"|"tool_invocation"|"retrieval"|"reasoning",
        "input": {},
        "output": {},
        "duration_ms": 0,
        "tokens_used": 0,
        "status": "success"|"error"
      }
    ]
  },
  "final_status": "completed"|"failed"|"cancelled",
  "total_tokens": 0,
  "total_cost_usd": 0.0
}
```
