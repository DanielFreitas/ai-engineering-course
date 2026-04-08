# Contratos — Redis para Performance em Aplicações de IA

## Convenção de Chaves Redis

Todas as chaves Redis devem seguir o padrão: `{namespace}:{tipo}:{identificador}[:{sub-id}]`

| Namespace | Tipo | Identificador | Exemplo |
|-----------|------|---------------|---------|
| `ai` | `response` | hash do prompt | `ai:response:sha256_abc123` |
| `ai` | `session` | session_id | `ai:session:uuid-xxx` |
| `ai` | `embed` | document_id:chunk | `ai:embed:doc-id:chunk-0` |
| `ai` | `semantic` | hash do embedding | `ai:semantic:embed_hash` |
| `ai` | `ratelimit` | user_id:window | `ai:ratelimit:user-id:2026-04-08T10` |
| `ai` | `lock` | recurso:id | `ai:lock:session:uuid-xxx` |

---

## Contrato de Cache de Resposta

```
SET ai:response:{prompt_hash} {payload} EX {ttl_seconds}
```

**prompt_hash:** SHA-256 de (prompt_normalizado + model_version + temperatura + max_tokens)

**Payload (JSON serializado):**
```json
{
  "response": "string",
  "model_version": "string",
  "finish_reason": "string",
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0
  },
  "cached_at": "ISO8601",
  "ttl_seconds": 3600
}
```

**TTLs recomendados por tipo de conteúdo:**

| Tipo de Conteúdo | TTL Recomendado |
|-----------------|----------------|
| FAQ / Perguntas frequentes | 24h |
| Dados de produto (preços, estoque) | 5 min |
| Análise de documentos estáticos | 7 dias |
| Respostas personalizadas por usuário | Não cachear globalmente |
| Configurações de sistema | 1h |

---

## Contrato de Cache de Sessão

```
HSET ai:session:{session_id} turns {json} model {model_version} created_at {timestamp}
EXPIRE ai:session:{session_id} {ttl_seconds}
```

**Estrutura do hash:**
```json
{
  "turns": "[{...}]",
  "model": "string",
  "total_tokens": "integer",
  "created_at": "ISO8601",
  "last_activity": "ISO8601",
  "user_id": "string"
}
```

---

## Contrato de Cache Semântico

```
HSET ai:semantic:{embedding_hash} response {json} similarity_threshold {float} original_query {string}
EXPIRE ai:semantic:{embedding_hash} {ttl_seconds}
```

**embedding_hash:** Hash dos primeiros 8 bytes do vetor de embedding (normalized)

**Busca semântica via RediSearch:**
```
FT.SEARCH idx:semantic_cache * RETURN 3 response similarity_threshold cached_at LIMIT 0 5
```

**Limiares de similaridade por domínio:**

| Domínio | Limiar Mínimo | Observação |
|---------|--------------|------------|
| Factual / Q&A | 0.97 | Alta precisão necessária |
| Suporte técnico | 0.95 | Pequenas variações ok |
| Criativo / Brainstorm | Não usar | Alta variabilidade esperada |
| Classificação de intent | 0.92 | Categorias bem definidas |

---

## Contrato de Rate Limiting com Sliding Window

```lua
-- Script Lua para sliding window rate limiting atômico
local key = KEYS[1]
local window_ms = tonumber(ARGV[1])
local max_requests = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

redis.call('ZREMRANGEBYSCORE', key, 0, now - window_ms)
local count = redis.call('ZCARD', key)

if count < max_requests then
  redis.call('ZADD', key, now, now)
  redis.call('PEXPIRE', key, window_ms)
  return {1, max_requests - count - 1}  -- allowed, remaining
else
  return {0, 0}  -- denied, remaining
end
```

**Chave:** `ai:ratelimit:{user_id}:{endpoint}`

---

## Contrato de Invalidação por Evento

```
PUBLISH ai:invalidate:response {json_payload}
```

**Payload de evento de invalidação:**
```json
{
  "event_type": "document_updated"|"model_changed"|"prompt_updated",
  "affected_keys_pattern": "ai:response:*",
  "reason": "string",
  "timestamp": "ISO8601",
  "scope": "global"|"user:{user_id}"|"session:{session_id}"
}
```
