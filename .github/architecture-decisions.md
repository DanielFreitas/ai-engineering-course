# Decisões Arquiteturais

> Registro de decisões técnicas que afetam múltiplos módulos. Toda skill deve consultar este arquivo antes de recomendar ferramentas, padrões ou abordagens.

## Formato de registro

Cada decisão segue o padrão ADR (Architecture Decision Record):
- **Contexto:** por que essa decisão foi necessária
- **Decisão:** o que foi escolhido
- **Justificativa:** por que essa opção e não outras
- **Consequências:** o que muda, o que fica mais difícil

---

## ADR-001: Python como linguagem backend principal

**Contexto:** O curso abrange backends com IA e precisa de uma linguagem com ecossistema maduro de LLMs.

**Decisão:** Python 3.11+ como linguagem backend de referência.

**Justificativa:**
- Maior concentração de SDKs de LLM (OpenAI, Anthropic, LangChain, LlamaIndex)
- Pydantic v2 oferece validação de dados de classe mundial, essencial para structured outputs
- FastAPI tem ergonomia excelente para APIs assíncronas

**Consequências:** exemplos de TypeScript/Node.js ficam secundários; mencionados apenas quando há diferença relevante de abordagem.

---

## ADR-002: FastAPI como framework backend

**Contexto:** Precisávamos de um framework que suportasse async nativo, tipagem forte e geração automática de documentação.

**Decisão:** FastAPI como framework de referência para todos os exemplos de backend.

**Justificativa:**
- Async nativo (crucial para chamadas de LLM com streaming)
- Integração nativa com Pydantic v2
- OpenAPI automático facilita contratos com frontend

**Consequências:** Flask e Django não são abordados. Quando mencionados, apenas como contraste.

---

## ADR-003: pgvector como solução vetorial primária

**Contexto:** O curso precisava de uma solução de busca vetorial que não exigisse infraestrutura adicional complexa no aprendizado inicial.

**Decisão:** pgvector (extensão do PostgreSQL) como solução vetorial primária.

**Justificativa:**
- Usa Postgres existente — não adiciona um novo serviço ao stack
- Suficiente para a maioria dos casos de uso iniciais
- Facilita exercícios práticos sem conta em serviço externo

**Consequências:** Pinecone, Weaviate e Qdrant são mencionados como alternativas escaláveis no módulo 04, mas não são o foco dos exercícios.

---

## ADR-004: Server-Sent Events (SSE) como mecanismo de streaming primário

**Contexto:** Streaming de respostas LLM para o frontend é um caso de uso central.

**Decisão:** SSE como abordagem primária de streaming.

**Justificativa:**
- Mais simples que WebSocket para fluxos unidirecionais (servidor → cliente)
- Suporte nativo no browser sem biblioteca adicional
- Reconexão automática built-in
- Funciona bem com proxies e load balancers

**Consequências:** WebSocket é mencionado nos módulos 17 e 19 para casos bidirecionais (como colaboração em tempo real), mas não é o padrão.

---

## ADR-005: OpenTelemetry como padrão de instrumentação

**Contexto:** Observabilidade em sistemas com LLM requer rastreamento de spans em chamadas de modelo, latências e custos.

**Decisão:** OpenTelemetry SDK como padrão de instrumentação; Datadog como plataforma de visualização de referência.

**Justificativa:**
- OpenTelemetry é vendor-neutral — o padrão não muda se a empresa trocar de plataforma
- Datadog tem integração madura com OTEL e é amplamente usado em produção

**Consequências:** Exemplos usam o SDK Python do OTEL. A exportação para Datadog é mostrada, mas o padrão de instrumentação serve para qualquer plataforma OTEL-compatible.

---

## ADR-006: Separação entre regra de negócio e chamada de modelo

**Contexto:** Um dos problemas mais comuns em código com IA é misturar lógica de negócio com chamadas de LLM.

**Decisão:** Toda chamada de modelo deve estar isolada em uma camada de serviço separada da lógica de aplicação.

**Justificativa:**
- Facilita testes (mockando o serviço de LLM)
- Facilita troca de modelo ou provedor
- Facilita versionamento e A/B testing de prompts

**Consequências:** Todos os exemplos de código devem respeitar essa separação. Um endpoint FastAPI nunca deve chamar `openai.chat.completions.create()` diretamente — sempre via uma função/classe de serviço.

---

## ADR-007: Pydantic v2 para toda validação de entrada/saída

**Contexto:** Saídas de LLM precisam de validação rigorosa; entradas de API também.

**Decisão:** Pydantic v2 como única biblioteca de validação no curso.

**Justificativa:**
- Performance superior ao v1 (10-50x mais rápido)
- Integração nativa com FastAPI
- `model_validate` e `model_json_schema` facilitam structured outputs

**Consequências:** dataclasses e TypedDict são mencionados apenas quando há razão explícita para preferí-los.

---

## Decisões pendentes (a definir no checkpoint do núcleo)

- [ ] Estratégia de truncamento de histórico: sliding window vs. sumarização automática
- [ ] Framework de agentes: manual vs. LangChain vs. LlamaIndex (posição a definir)
- [ ] Estratégia de rate limiting nos exemplos de prática
- [ ] Estratégia de mock de LLM nos exercícios práticos (para não exigir API key)
