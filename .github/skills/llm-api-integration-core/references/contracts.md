# Contratos — Integração com APIs de LLMs

## Contrato de Entrada: Chamada de API

```python
# Estrutura de entrada para qualquer chamada de LLM
{
    "model": str,           # ex: "gpt-4o-mini"
    "messages": [
        {
            "role": "system" | "user" | "assistant",
            "content": str
        }
    ],
    "temperature": float,   # 0.0 – 2.0 (recomendado: 0.0–0.7)
    "max_tokens": int,       # limite de tokens na resposta
    "response_format": {    # opcional, para JSON mode
        "type": "json_object"
    },
    "stream": bool          # True para streaming via SSE
}
```

## Contrato de Saída: Resposta Estruturada

```python
# Schema de resposta estruturada — exemplo de análise de sentimento
from pydantic import BaseModel, Field
from typing import Literal

class SentimentResponse(BaseModel):
    sentimento: Literal["positivo", "negativo", "neutro"]
    confianca: float = Field(ge=0.0, le=1.0)
    resumo: str = Field(max_length=300)

# Metadados de uso (sempre registrar)
class UsageMetadata(BaseModel):
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int
    estimated_cost_usd: float
    latency_ms: int
    model: str
```

## Contrato de Erro

```python
# Erros esperados e como tratá-los
class LLMError(Exception):
    pass

class RateLimitError(LLMError):
    # HTTP 429 — aguardar e tentar novamente
    retry_after: int  # segundos

class LLMTimeoutError(LLMError):
    # Chamada excedeu o tempo máximo configurado
    pass

class InvalidRequestError(LLMError):
    # Prompt inválido, modelo inexistente, parâmetros fora do range
    pass

class ContentFilterError(LLMError):
    # Conteúdo bloqueado pelo provedor
    pass
```

## Contrato de Configuração do Cliente

```python
from typing import Optional
from pydantic import BaseModel

# Configurações mínimas para instanciar um cliente de LLM
class LLMClientConfig(BaseModel):
    api_key: str                    # via variável de ambiente
    model: str                      # modelo padrão
    timeout_seconds: int = 30       # timeout por requisição
    max_retries: int = 3            # tentativas máximas
    base_url: Optional[str] = None  # para provedores com API compatível
```
