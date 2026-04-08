---
name: observability-otel-datadog-backend
description: "Use when: tracing LLM calls, OpenTelemetry for AI, Datadog for AI, instrumenting model calls, distributed tracing AI, structured logs for AI, metrics for AI backend, latency monitoring LLM, error tracking AI, spans for AI"
applyTo: "docs/backend/14-observability-otel-datadog/**"
---

# Observabilidade com OpenTelemetry e Datadog

## Objetivo
Ensinar como instrumentar sistemas de IA para observabilidade — usando OpenTelemetry para traces e spans, logs estruturados, métricas customizadas e dashboards no Datadog.

## Escopo
**Entra:** Distributed tracing, spans em chamadas ao modelo, instrumentação com OpenTelemetry, logs estruturados, métricas, dashboards no Datadog, custo observável, identificação de gargalos e erros.

**Não entra:** Alertas e on-call em profundidade, APM de aplicações não-IA, setup de infraestrutura Datadog, análise de logs em escala.

## Quando usar
Use este módulo quando o estudante precisar entender o que está acontecendo em produção — medindo latência, identificando erros, rastreando custos e correlacionando problemas em sistemas de IA.

## Resultado esperado do módulo
O estudante consegue instrumentar uma chamada de LLM com um trace e span customizados, capturar latência e tokens como atributos, e visualizar o resultado em uma ferramenta de observabilidade.

## Conteúdos principais
1. Por que observabilidade é diferente em IA: não-determinismo, custo por uso
2. Tracing distribuído: trace, span, parent-child, context propagation
3. Spans em chamadas de LLM: atributos essenciais (modelo, tokens, latência)
4. Instrumentação com OpenTelemetry SDK
5. Logs estruturados: formato JSON, campos obrigatórios
6. Métricas customizadas: latência por modelo, taxa de erro, custo/hora
7. Dashboards no Datadog: traces, logs e métricas correlacionados
8. Identificação de gargalos e erros em produção

## Estrutura sugerida da aula
1. Introdução — o que você não consegue depurar sem observabilidade
2. Conceito — traces, spans, logs e métricas
3. Exemplo — instrumentar uma chamada de LLM com OpenTelemetry
4. Prática — adicionar trace e métricas a um endpoint de IA
5. Fechamento — o que monitorar em produção

## Prática do módulo
**Exercício:** Instrumente uma chamada de LLM existente com OpenTelemetry. O span deve incluir: nome do modelo, prompt_tokens, completion_tokens, latência total e se houve erro. Exporte o trace para um coletor local (Jaeger ou OTLP stdout) e valide que os atributos aparecem corretamente.

**Critérios de validação:**
- Um span é criado para cada chamada ao modelo
- Os atributos do span incluem modelo, tokens e latência
- Erros são registrados como eventos no span (`span.record_exception`)
- Os traces aparecem no coletor configurado

## Critérios mínimos de qualidade
- [ ] Toda chamada de LLM tem um span dedicado
- [ ] Tokens e custo estimado são atributos do span
- [ ] Erros são capturados no span (não apenas logados)
- [ ] Logs usam formato JSON estruturado com trace_id correlacionado
- [ ] Existe pelo menos uma métrica de latência p50/p95 por modelo

## Relações com outros módulos
- **Módulo 02 (llm-api-integration-core):** O ponto de instrumentação primário
- **Módulo 08 (fastapi-ai-backend-backend):** Propagação de trace pelo serviço
- **Módulo 15 (llmops-lifecycle-backend):** Observabilidade como base para decisões de LLMOps

## Notas de consistência
- Atributos de span para LLM: `llm.model`, `llm.prompt_tokens`, `llm.completion_tokens`, `llm.latency_ms`
- Usar `tracer.start_as_current_span` como context manager
- Sempre propagar o trace_id nos logs para correlação
- Custo estimado: `llm.estimated_cost_usd` como atributo do span
