# Padrões — Observabilidade com OpenTelemetry e Datadog

## P01: Rastreamento Distribuído com Propagação de Contexto

Todo request que atravessa múltiplos serviços deve carregar um trace ID propagado via headers W3C Trace Context (`traceparent`, `tracestate`). Cada serviço cria spans filhos a partir do contexto recebido, formando uma árvore de spans que representa o caminho completo da requisição. O rastreamento distribuído permite identificar exatamente onde o tempo está sendo gasto e qual serviço é responsável por cada gargalo.

## P02: Spans Dedicados para Chamadas de Modelos de IA

Cada chamada a uma API de LLM deve ter um span OpenTelemetry dedicado com atributos semânticos padronizados: nome do modelo, versão, contagem de tokens de entrada e saída, latência até o primeiro token (TTFT), finish reason e custo estimado. Esses spans de modelo devem ser filhos do span da operação principal, permitindo correlação com o contexto de negócio. A convenção de atributos do OpenTelemetry Semantic Conventions for AI deve ser seguida.

## P03: Logs Estruturados com Contexto de Trace Injetado

Logs devem ser emitidos em formato JSON com campos padronizados: `trace_id`, `span_id`, `severity`, `message`, `service_name`, `timestamp` e campos de contexto de negócio relevantes. A injeção automática de trace_id e span_id nos logs permite correlacionar log entries com spans no Datadog APM sem busca manual. Logs não estruturados (texto livre) devem ser tratados como dívida técnica a ser eliminada.

## P04: Métricas de Latência e Throughput por Operação

Métricas de histograma para latência (com percentis p50, p95, p99) e contadores para throughput devem ser instrumentados para todas as operações críticas: chamadas de modelo, buscas vetoriais, operações de banco de dados e processamento de filas. Métricas devem ter labels de cardinalidade controlada (evitar labels com valores únicos por request). O OpenTelemetry SDK exporta métricas diretamente para o Datadog via OTLP.

## P05: Dashboards Operacionais no Datadog por Domínio

Cada domínio funcional deve ter um dashboard dedicado no Datadog com os KPIs operacionais mais relevantes: taxa de erro, latência por percentil, throughput, custo de inferência e saúde dos componentes críticos. Dashboards devem ser versionados como código (terraform-datadog ou JSON exportado no repositório). Alertas de SLO devem ser configurados diretamente a partir dos dashboards para garantir cobertura.

## P06: Custo de Inferência Observável por Request e por Feature

O custo estimado de tokens de LLM deve ser calculado, registrado como span attribute e agregado como métrica por feature, por usuário (em aggregate anônimo) e por versão de modelo. Esse dado permite identificar features com custo desproporcional ao valor entregue e fundamentar decisões de otimização. Budget alerts no Datadog devem notificar a equipe quando custos projetados superam thresholds definidos.

## P07: Identificação de Gargalos na Pipeline de IA

Flame graphs e waterfall views de traces multi-hop revelam gargalos que métricas agregadas escondem: uma busca vetorial que ocorre sequencialmente quando poderia ser paralela, um reranking síncrono que bloqueia o streaming, ou um prompt assembly que consume tempo excessivo. Análise regular de traces de requisições lentas (sampled por percentil de latência) deve ser parte do processo de revisão de performance.

## P08: Alertas Baseados em Anomalias e Tendências

Além de alertas de threshold estático (ex: "erro > 5%"), o Datadog suporta alertas baseados em detecção de anomalias que identificam desvios em relação ao comportamento histórico — incluindo sazonalidade. Alertas de mudança de tendência (metrica crescendo 2x mais rápido que o historico) são mais eficazes para detectar degradação gradual antes que atinja limiares críticos. O mix de alertas deve incluir tanto thresholds absolutos quanto detecção de anomalias.
