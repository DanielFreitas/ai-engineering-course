# Contratos — Avaliação de LLMs

## Contrato: Caso de Teste

```python
from pydantic import BaseModel
from typing import Any, Literal

class EvaluationCriteria(BaseModel):
    field: str                  # campo a verificar (ex: "sentimento")
    operator: Literal["eq", "in", "range", "contains", "not_empty"]
    expected: Any               # valor esperado

class TestCase(BaseModel):
    test_id: str                # ex: "test_sentiment_positive_review"
    input: dict                 # entrada para o componente
    expected_output: dict       # saída esperada
    criteria: list[EvaluationCriteria]
    tags: list[str] = []        # ex: ["edge_case", "regression"]
    description: str = ""
```

## Contrato: Resultado de Avaliação

```python
class TestResult(BaseModel):
    test_id: str
    passed: bool
    actual_output: dict
    failed_criteria: list[str]  # critérios que falharam
    latency_ms: int
    model_used: str
    prompt_version: str

class EvaluationReport(BaseModel):
    run_id: str
    timestamp: str
    prompt_version: str
    model: str
    total_cases: int
    passed: int
    failed: int
    pass_rate: float            # passed / total_cases
    results: list[TestResult]
    regression_detected: bool   # True se pass_rate < baseline
```

## Contrato: Métricas RAG

```python
class RAGMetrics(BaseModel):
    # Métricas de retrieval
    retrieval_precision: float      # chunks relevantes / total chunks recuperados
    retrieval_recall: float         # chunks relevantes recuperados / total relevantes

    # Métricas de geração
    faithfulness: float             # resposta baseada no contexto (0.0–1.0)
    answer_relevance: float         # resposta relevante para a pergunta (0.0–1.0)

    # Meta
    evaluated_by: str               # "human" | "llm_judge" | "automated"
    judge_model: str | None         # modelo usado se LLM-as-judge
```

## Contrato: Comparação de Versões

```python
class VersionComparison(BaseModel):
    baseline_version: str
    candidate_version: str
    baseline_pass_rate: float
    candidate_pass_rate: float
    improvement: float              # candidate - baseline
    regressions: list[str]          # test_ids que pioraram
    improvements: list[str]         # test_ids que melhoraram
    recommendation: Literal["promote", "reject", "needs_review"]
```
