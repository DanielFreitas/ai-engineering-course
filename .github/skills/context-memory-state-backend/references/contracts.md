# Contratos — Contexto, Memória e Estado Conversacional

## Contrato: Mensagem de Histórico

```python
from pydantic import BaseModel
from typing import Literal
from datetime import datetime

class Message(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str
    timestamp: datetime
    token_count: int | None = None  # calculado ao armazenar
```

## Contrato: Sessão de Conversa

```python
class ConversationSession(BaseModel):
    session_id: str             # UUID único por conversa
    user_id: str                # dono da sessão
    messages: list[Message]
    created_at: datetime
    updated_at: datetime
    total_tokens_used: int = 0  # acumulado de todos os turnos
    is_active: bool = True
```

## Contrato: Função de Construção de Contexto

```python
from typing import Protocol

class ContextBuilder(Protocol):
    def build_context(
        self,
        session: ConversationSession,
        max_tokens: int,
        system_prompt: str
    ) -> list[dict]:
        """
        Retorna lista de mensagens formatadas para a API do LLM.
        Garante que:
        - system_prompt está sempre na primeira posição
        - total de tokens <= max_tokens
        - mensagens mais recentes são priorizadas
        """
        ...
```

## Contrato: Memória de Longo Prazo

```python
class UserMemory(BaseModel):
    user_id: str
    facts: list[str]            # fatos sobre o usuário (ex: "prefere respostas curtas")
    preferences: dict           # preferências estruturadas
    last_updated: datetime

class MemoryStore(Protocol):
    def get_memory(self, user_id: str) -> UserMemory: ...
    def update_memory(self, user_id: str, new_facts: list[str]) -> None: ...
```

## Contrato: Resultado de Truncamento

```python
class TruncationResult(BaseModel):
    original_message_count: int
    final_message_count: int
    original_token_count: int
    final_token_count: int
    strategy_used: str          # "sliding_window" | "summarization" | "drop_oldest"
    summary_generated: bool     # True se sumarização foi feita
```
