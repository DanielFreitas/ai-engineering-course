# Contratos — Tool Calling e Orquestração

## Contrato: Definição de Ferramenta

```python
from pydantic import BaseModel
from typing import Any

class ToolParameter(BaseModel):
    type: str                   # "string", "number", "boolean", "array", "object"
    description: str
    enum: list[str] | None = None    # valores permitidos
    required: bool = True

class ToolDefinition(BaseModel):
    name: str                   # ex: "get_order_status"
    description: str            # quando usar e o que faz
    parameters: dict[str, ToolParameter]
    is_reversible: bool = True  # False para ações destrutivas
    requires_confirmation: bool = False
```

## Contrato: Chamada de Ferramenta Solicitada pelo Modelo

```python
class ToolCall(BaseModel):
    tool_call_id: str           # ID gerado pelo modelo para correlação
    tool_name: str
    parameters: dict[str, Any]  # parâmetros gerados pelo modelo (não validados)
```

## Contrato: Resultado de Ferramenta

```python
class ToolResult(BaseModel):
    tool_call_id: str           # deve corresponder ao ToolCall.tool_call_id
    tool_name: str
    success: bool
    result: Any | None          # resultado em caso de sucesso
    error_message: str | None   # mensagem de erro em caso de falha
    latency_ms: int
```

## Contrato: Ciclo de Tool Calling

```python
class OrchestrationStep(BaseModel):
    iteration: int
    tool_calls_requested: list[ToolCall]
    tool_results: list[ToolResult]
    context_tokens_used: int

class OrchestrationResult(BaseModel):
    final_response: str
    total_iterations: int
    steps: list[OrchestrationStep]
    total_tool_calls: int
    total_tokens: int
    completed: bool             # False se interrompido por limite de iterações
```

## Schema JSON de Exemplo para Provider (OpenAI-compatível)

```json
{
  "type": "function",
  "function": {
    "name": "get_order_status",
    "description": "Consulta o status atual de um pedido pelo ID. Use quando o usuário perguntar sobre o status, localização ou prazo de entrega de um pedido.",
    "parameters": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "O identificador único do pedido (ex: '#12345' ou 'ORD-2024-001')"
        }
      },
      "required": ["order_id"]
    }
  }
}
```
