# Contratos — Observabilidade com OpenTelemetry e Datadog

## Contrato de Atributos de Span para Chamadas de LLM

Seguindo a convenção OpenTelemetry Semantic Conventions for Generative AI:

```json
{
  "span": {
    "name": "llm.generate",
    "kind": "CLIENT",
    "attributes": {
      "gen_ai.system": "openai"|"anthropic"|"google_vertex_ai",
      "gen_ai.request.model": "string (ex: gpt-4o-mini)",
      "gen_ai.request.max_tokens": 2048,
      "gen_ai.request.temperature": 0.7,
      "gen_ai.response.model": "string (versão exata retornada pelo provedor)",
      "gen_ai.response.finish_reasons": ["stop"],
      "gen_ai.usage.input_tokens": 512,
      "gen_ai.usage.output_tokens": 256,
      "gen_ai.usage.total_tokens": 768,
      "llm.estimated_cost_usd": 0.00042,
      "llm.time_to_first_token_ms": 320,
      "llm.total_duration_ms": 2100,
      "service.name": "string",
      "service.version": "string"
    }
  }
}
```

---

## Contrato de Formato de Log Estruturado

Todos os logs da plataforma de IA devem seguir o schema:

```json
{
  "timestamp": "ISO8601",
  "severity": "DEBUG"|"INFO"|"WARN"|"ERROR"|"FATAL",
  "message": "string",
  "service": {
    "name": "string",
    "version": "string",
    "environment": "production"|"staging"|"development"
  },
  "trace": {
    "trace_id": "string (hex 32 chars)",
    "span_id": "string (hex 16 chars)",
    "sampled": true
  },
  "context": {
    "user_id": "string (anônimo/hash)",
    "session_id": "string",
    "request_id": "string",
    "feature": "string"
  },
  "error": {
    "type": "string (class de erro)",
    "message": "string",
    "stack_trace": "string (apenas em ambientes não-produção ou amostrado)"
  }
}
```

---

## Contrato de Métricas OpenTelemetry

### Métricas de Latência de Modelo

| Nome da Métrica | Tipo | Unit | Labels |
|----------------|------|------|--------|
| `llm.request.duration` | Histogram | `ms` | `model`, `provider`, `feature`, `status` |
| `llm.time_to_first_token` | Histogram | `ms` | `model`, `provider`, `feature` |
| `llm.tokens.input` | Counter | `tokens` | `model`, `provider`, `feature` |
| `llm.tokens.output` | Counter | `tokens` | `model`, `provider`, `feature` |
| `llm.cost.usd` | Counter | `USD` | `model`, `provider`, `feature` |
| `llm.errors` | Counter | `1` | `model`, `provider`, `error_type` |

### Métricas de Pipeline de IA

| Nome da Métrica | Tipo | Unit | Labels |
|----------------|------|------|--------|
| `ai.pipeline.duration` | Histogram | `ms` | `pipeline_name`, `status` |
| `ai.vector.search.duration` | Histogram | `ms` | `index_name`, `top_k` |
| `ai.embedding.duration` | Histogram | `ms` | `model`, `batch_size` |
| `ai.cache.hit_rate` | Gauge | `ratio` | `cache_type`, `feature` |

---

## Contrato de Propagação de Contexto HTTP

Headers obrigatórios em todas as requisições entre serviços:

| Header | Formato | Exemplo |
|--------|---------|---------|
| `traceparent` | `00-{trace_id}-{span_id}-{flags}` | `00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01` |
| `tracestate` | `vendor=value` | `dd=s:1;p:00f067aa0ba902b7` |
| `X-Datadog-Trace-Id` | decimal string | `11803532876627986220` |
| `X-Datadog-Parent-Id` | decimal string | `7355165027156701193` |
| `X-Datadog-Sampling-Priority` | `1` = sampled, `0` = not sampled | `1` |

---

## Contrato de Alert de SLO

```json
{
  "slo": {
    "name": "string",
    "service": "string",
    "target_percentage": 99.5,
    "window_days": 30,
    "indicators": [
      {
        "type": "latency",
        "threshold_ms": 2000,
        "percentile": 95
      },
      {
        "type": "error_rate",
        "threshold_percentage": 1.0
      }
    ],
    "burn_rate_alerts": [
      { "window_minutes": 60, "burn_rate": 14.4, "severity": "critical" },
      { "window_minutes": 360, "burn_rate": 6.0, "severity": "warning" }
    ]
  }
}
```
