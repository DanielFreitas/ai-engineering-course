# Contratos — Embeddings e RAG

## Contrato de Entrada: Indexação de Documento

```python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DocumentChunk(BaseModel):
    chunk_id: str               # identificador único do chunk
    content: str                # texto do chunk
    source: str                 # origem (URL, nome de arquivo, ID do documento)
    position: int               # posição do chunk no documento original
    created_at: datetime        # data de criação/indexação
    metadata: dict = {}         # metadados adicionais de negócio

class IndexRequest(BaseModel):
    document_id: str
    chunks: list[DocumentChunk]
    embedding_model: str        # modelo usado para gerar embeddings
```

## Contrato de Saída: Chunk Recuperado

```python
from pydantic import BaseModel, Field

class RetrievedChunk(BaseModel):
    chunk_id: str
    content: str
    source: str
    similarity_score: float = Field(ge=0.0, le=1.0)
    metadata: dict = {}

class RetrievalResult(BaseModel):
    query: str
    chunks: list[RetrievedChunk]
    retrieval_latency_ms: int
    model_used: str
```

## Contrato de Entrada: Consulta RAG

```python
class RAGQueryRequest(BaseModel):
    query: str
    top_k: int = 3              # número máximo de chunks a recuperar
    min_similarity: float = 0.7 # threshold mínimo de similaridade
    filter_metadata: dict = {}  # filtros opcionais por metadados
```

## Contrato de Saída: Resposta RAG

```python
class RAGResponse(BaseModel):
    answer: str
    sources: list[str]          # lista de fontes usadas
    chunks_used: int            # quantos chunks foram injetados
    has_relevant_context: bool  # False se nenhum chunk superou o threshold
    prompt_tokens: int
    completion_tokens: int
```
