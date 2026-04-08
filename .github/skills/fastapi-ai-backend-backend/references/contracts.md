# Contratos — Backend de IA com FastAPI

## Contrato de Entrada: Requisição de Análise

```python
from pydantic import BaseModel, Field

class AnalyzeRequest(BaseModel):
    text: str = Field(min_length=1, max_length=5000)
    language: str = "pt-BR"
    options: dict = {}
```

## Contrato de Saída: Resposta de Análise

```python
from pydantic import BaseModel
from typing import Literal

class AnalyzeResponse(BaseModel):
    sentiment: Literal["positive", "negative", "neutral"]
    confidence: float
    summary: str
    processing_time_ms: int
    model_used: str
    prompt_version: str
```

## Contrato de Erro HTTP

```python
from pydantic import BaseModel

class ErrorDetail(BaseModel):
    code: str           # ex: "LLM_UNAVAILABLE", "INVALID_INPUT"
    message: str        # mensagem amigável para o cliente
    request_id: str     # para rastreamento interno

# Mapeamento de erros internos → HTTP status
# RateLimitError       → 429 Too Many Requests
# LLMTimeoutError      → 504 Gateway Timeout
# InvalidRequestError  → 400 Bad Request
# ContentFilterError   → 422 Unprocessable Entity
# Exception genérica   → 500 Internal Server Error
```

## Contrato de Saída: Streaming de Resposta

```python
# Formato de cada chunk SSE para StreamingResponse
# Content-Type: text/event-stream

# data: {"type": "chunk", "content": "texto parcial..."}
# data: {"type": "chunk", "content": " continuação..."}
# data: {"type": "done", "usage": {"prompt_tokens": 45, "completion_tokens": 120}}
# data: {"type": "error", "code": "LLM_TIMEOUT", "message": "Tempo limite excedido"}
```

## Estrutura de Pastas Recomendada

```
app/
├── routers/
│   └── analysis.py         # endpoints HTTP
├── services/
│   └── analysis_service.py # lógica de negócio e orquestração
├── clients/
│   └── llm_client.py       # abstração do provedor de LLM
├── models/
│   ├── requests.py         # modelos Pydantic de entrada
│   └── responses.py        # modelos Pydantic de saída
└── prompts/
    └── sentiment_v1.0.txt  # arquivos de prompt versionados
```
