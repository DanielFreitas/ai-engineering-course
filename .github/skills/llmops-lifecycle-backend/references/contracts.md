# Contratos — LLMOps e Ciclo de Vida de Modelos

## Contrato de Versão de Modelo

### Esquema de Registro de Versão

```json
{
  "model_version": {
    "id": "string (UUID)",
    "name": "string (ex: gpt-4o-mini)",
    "version_tag": "string (semver, ex: 2.1.0)",
    "provider": "openai"|"anthropic"|"google"|"azure"|"self-hosted",
    "deployment_env": "development"|"staging"|"production",
    "status": "candidate"|"active"|"deprecated"|"rolled-back",
    "traffic_percentage": 0,
    "deployed_at": "ISO8601",
    "deployed_by": "string (user ID)",
    "rollback_target": "string (version_id anterior)",
    "config": {
      "temperature": 0.7,
      "max_tokens": 2048,
      "top_p": 1.0,
      "frequency_penalty": 0.0
    },
    "metadata": {
      "changelog": "string",
      "ticket": "string (JIRA/Linear ID)",
      "ab_test_id": "string (opcional)"
    }
  }
}
```

---

## Contrato de Versão de Prompt

### Esquema de Registro de Prompt Versionado

```json
{
  "prompt_version": {
    "id": "string (UUID)",
    "prompt_name": "string (identificador semântico)",
    "version_tag": "string (semver)",
    "content": {
      "system": "string (system prompt completo)",
      "user_template": "string (template com variáveis {{var}})",
      "variables": ["string"]
    },
    "model_version_id": "string (UUID do modelo associado)",
    "status": "draft"|"active"|"archived",
    "created_at": "ISO8601",
    "created_by": "string",
    "eval_scores": {
      "accuracy": 0.0,
      "relevance": 0.0,
      "safety": 0.0
    }
  }
}
```

---

## Contrato de Configuração de A/B Test

```json
{
  "ab_test": {
    "id": "string (UUID)",
    "name": "string",
    "status": "draft"|"running"|"paused"|"completed",
    "variants": [
      {
        "id": "A",
        "model_version_id": "string",
        "prompt_version_id": "string",
        "traffic_percentage": 50
      },
      {
        "id": "B",
        "model_version_id": "string",
        "prompt_version_id": "string",
        "traffic_percentage": 50
      }
    ],
    "success_metrics": ["acceptance_rate", "latency_p95", "cost_per_request"],
    "minimum_sample_size": 1000,
    "started_at": "ISO8601",
    "ends_at": "ISO8601"
  }
}
```

---

## Contrato de Métricas de Qualidade para Gate de Rollout

```json
{
  "quality_gate": {
    "model_version_id": "string",
    "evaluation_window_minutes": 60,
    "thresholds": {
      "error_rate_max": 0.02,
      "latency_p95_ms_max": 3000,
      "acceptance_rate_min": 0.75,
      "cost_per_request_max_usd": 0.05
    },
    "auto_rollback_enabled": true,
    "rollback_trigger": "any_threshold_breached"|"all_thresholds_breached",
    "notification_channels": ["slack", "pagerduty", "email"]
  }
}
```

---

## Contrato de Evento de Deploy

```json
{
  "deploy_event": {
    "event_type": "deploy"|"rollout_progress"|"rollback"|"rollout_complete",
    "model_version_id": "string",
    "previous_version_id": "string",
    "traffic_percentage_before": 0,
    "traffic_percentage_after": 10,
    "triggered_by": "manual"|"automated_gate"|"scheduled",
    "reason": "string",
    "timestamp": "ISO8601"
  }
}
```
