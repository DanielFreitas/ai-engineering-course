# Contratos — Segurança Operacional para IA

## Contrato de Evento de Auditoria

Toda ação executada por agentes de IA deve gerar um evento de auditoria no seguinte formato:

```json
{
  "audit_event": {
    "id": "string (UUID)",
    "timestamp": "ISO8601",
    "event_type": "tool_invocation"|"data_access"|"external_api_call"|"permission_check"|"rate_limit_hit"|"abuse_detected",
    "actor": {
      "user_id": "string",
      "session_id": "string",
      "ip_address": "string (hasheado ou anonimizado)",
      "user_agent": "string"
    },
    "resource": {
      "type": "tool"|"database"|"external_service"|"file",
      "name": "string",
      "id": "string (opcional)"
    },
    "action": {
      "name": "string",
      "parameters": { /* parâmetros sanitizados — sem dados sensíveis */ },
      "outcome": "success"|"denied"|"error",
      "error_code": "string (opcional)"
    },
    "ai_context": {
      "model_version": "string",
      "prompt_id": "string (hash do prompt, não o conteúdo)",
      "session_turn": 0
    },
    "risk_score": 0.0
  }
}
```

---

## Contrato de Manifesto de Permissões de Tool

Define quais ferramentas um agente pode invocar em um determinado contexto de usuário:

```json
{
  "tool_permission_manifest": {
    "user_id": "string",
    "role": "string",
    "session_id": "string",
    "valid_until": "ISO8601",
    "allowed_tools": [
      {
        "tool_name": "string",
        "allowed_operations": ["read"|"write"|"delete"|"execute"],
        "scope_constraints": {
          "resource_ids": ["string"],
          "max_records": 0,
          "read_only_fields": ["string"]
        }
      }
    ],
    "denied_tools": ["string"],
    "require_confirmation_for": ["string (tool names que requerem confirmação humana)"]
  }
}
```

---

## Contrato de Configuração de Rate Limiting

```json
{
  "rate_limit_policy": {
    "policy_id": "string",
    "applies_to": "ip"|"user"|"tenant"|"api_key",
    "limits": [
      {
        "window": "per_second"|"per_minute"|"per_hour"|"per_day",
        "max_requests": 0,
        "max_tokens_consumed": 0,
        "max_cost_usd": 0.0
      }
    ],
    "enforcement": {
      "action_on_exceed": "reject"|"throttle"|"queue",
      "retry_after_seconds": 60,
      "notify_user": true
    },
    "exceptions": {
      "whitelist_ids": ["string"],
      "burst_allowance": 10
    }
  }
}
```

---

## Contrato de Alerta de Segurança

```json
{
  "security_alert": {
    "id": "string (UUID)",
    "timestamp": "ISO8601",
    "severity": "low"|"medium"|"high"|"critical",
    "type": "prompt_injection_attempt"|"rate_limit_abuse"|"unauthorized_tool_access"|"data_exfiltration_attempt"|"context_poisoning",
    "description": "string",
    "affected_user_id": "string",
    "affected_session_id": "string",
    "evidence": {
      "request_ids": ["string"],
      "pattern_matched": "string",
      "risk_indicators": ["string"]
    },
    "recommended_action": "block_user"|"increase_monitoring"|"notify_team"|"trigger_incident",
    "auto_action_taken": "string (ação já executada automaticamente)",
    "status": "open"|"investigating"|"resolved"
  }
}
```

---

## Contrato de Sanitização de Input

Regras de sanitização aplicadas em todas as entradas do usuário antes de inserção em prompts:

| Categoria | Padrão Detectado | Ação |
|-----------|-----------------|------|
| Prompt injection direto | `Ignore previous instructions`, `[[SYSTEM]]`, `<|im_start|>` | Rejeitar request |
| Injeção de delimitadores | Sequências `###`, `---`, blocos XML fora de contexto | Escapar/normalizar |
| PII no input | CPF, CNPJ, número de cartão (regex) | Mascarar antes de logar |
| URLs internas | IPs privados RFC1918, `localhost`, hostnames internos | Remover ou substituir |
| Instruções de escaping | Tentativas de quebrar contexto JSON/XML | Sanitizar encoding |
