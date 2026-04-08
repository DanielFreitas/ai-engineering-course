# Casos de Borda — Observabilidade com OpenTelemetry e Datadog

## CE01: Overhead de Instrumentação Degrada Performance em Produção

**Cenário:** Uma pipeline de embaralhamento ativa com alta taxa de instrumentação — centenas de spans por request — introduz overhead de CPU e memória que impacta a latência p99 em 15%.

**Comportamento esperado:** O sampling rate deve ser configurado de forma adaptativa: 100% em desenvolvimento e staging, 1-10% em produção com head-based sampling, e 100% para requests com erros (tail-based sampling). O Datadog Agent deve ser o único exportador de telemetria para evitar overhead de múltiplos exportadores simultâneos.

**Risco sem tratamento:** A instrumentação compromete os SLOs que deveria ajudar a monitorar, criando um paradoxo operacional.

---

## CE02: Trace Context Perdido em Processamento Assíncrono via Fila

**Cenário:** Um request HTTP inicia uma pipeline onde parte do processamento acontece em workers assíncronos que consomem mensagens de uma fila. O trace context não é propagado na mensagem de fila, criando traces fragmentados.

**Comportamento esperado:** O trace context (`traceparent`) deve ser serializado como atributo da mensagem na fila e desserializado pelo worker consumer para criar spans filhos do trace original. Bibliotecas de instrumentação como `opentelemetry-instrumentation-kafka` fazem isso automaticamente para mensageiros suportados.

**Risco sem tratamento:** O trace do request termina no ponto de enfileiramento, tornando invisível tudo que acontece no processamento assíncrono — que frequentemente é onde a maior parte do tempo é gasta.

---

## CE03: Explosion de Cardinalidade em Labels de Métricas

**Cenário:** Um engenheiro adiciona `user_id` como label de uma métrica de latência. Com milhares de usuários ativos, isso cria milhares de séries temporais únicas no Datadog, resultando em bill de observabilidade exorbitante e dashboards lentos.

**Comportamento esperado:** Labels de métricas devem ter cardinalidade controlada — máximo de dezenas a centenas de valores únicos por label. User IDs, session IDs, request IDs e qualquer identificador único por request jamais devem ser labels de métricas. Para análises por usuário, traces e logs são os instrumentos corretos.

**Risco sem tratamento:** Custo de observabilidade pode superar o custo de infraestrutura. O Datadog pode throttle métricas de alta cardinalidade, causando lacunas nos dados.

---

## CE04: Logs de Stack Trace com Dados Sensíveis em Produção

**Cenário:** Uma exceção não tratada loga o stack trace completo, que inclui o conteúdo do prompt do usuário e partes do contexto da conversa — dados potencialmente sensíveis que não deveriam estar em logs de produção.

**Comportamento esperado:** Stack traces em produção devem ser sanitizados para remover dados de input do usuário antes do logging. A configuração de log deve distinguir entre ambientes: stack traces completos em desenvolvimento, stack traces sanitizados em produção, com dados sensíveis substituídos por placeholders como `[REDACTED]`.

**Risco sem tratamento:** Dados pessoais de usuários ficam armazenados em sistemas de log, violando LGPD e criando risco de vazamento em caso de acesso indevido ao sistema de observabilidade.

---

## CE05: Span de Longa Duração Excede Limite de Escrita do Backend

**Cenário:** Uma operação de batch processing cria um único span que dura mais de 1 hora. O Datadog tem limite de tamanho e duração de spans, e o span é truncado ou descartado ao ser enviado.

**Comportamento esperado:** Operações longas devem ser instrumentadas com hierarquia de spans: um span pai de curta duração por unidade de trabalho (ex: cada item do batch), agrupados por um trace de sessão. Spans não devem representar operações de duração ilimitada — cada span deve ter início e fim bem definidos dentro de limites razoáveis (< 10 minutos).

**Risco sem tratamento:** Operações críticas de batch ficam invisíveis na observabilidade, impedindo diagnóstico de problemas de performance nestas operações.

---

## CE06: Coleta de Telemetria Falha Silenciosamente, Parando o Fluxo de Dados

**Cenário:** O OpenTelemetry Collector ou o Datadog Agent fica indisponível. A aplicação continua funcionando, mas toda a telemetria é descartada silenciosamente — sem alertas, sem fallback, sem notificação.

**Comportamento esperado:** O SDK de OpenTelemetry deve usar exportação assíncrona com buffer em memória e nunca bloquear a thread principal por falha de exportação. Métricas de saúde do próprio collector (self-telemetry) devem ser monitoradas com alertas de data gap — se nenhum dado chega por N minutos, um alerta deve ser disparado.

**Risco sem tratamento:** Durante incidentes graves — precisamente quando observabilidade é mais crítica — os dados podem não estar sendo coletados, comprometendo a capacidade de diagnóstico.

---

## CE07: Latência de Coleta de Métricas Distorce Análise de Incidente

**Cenário:** O pipeline de coleta de métricas tem latência de 3-5 minutos entre o evento real e sua visibilidade no Datadog. Durante um incidente, a equipe toma decisões baseadas em dados desatualizados.

**Comportamento esperado:** A latência de coleta de métricas deve ser monitorada e publicada como SLO interno da plataforma de observabilidade. Para alertas críticos, métricas com latência de flush mais baixa (ex: DogStatsD UDP com flush de 10s) devem ser priorizadas sobre métricas OTLP com batch intervals maiores. A diferença deve ser documentada no runbook de incidentes.

**Risco sem tratamento:** A equipe faz rollback de uma mudança saudável por estar olhando para dados de 5 minutos atrás que ainda refletem o problema anterior — agravando o incidente.
