# Anti-Padrões — Observabilidade com OpenTelemetry e Datadog

## AP01: Logs Não Estruturados como Principal Fonte de Observabilidade

Depender de logs em texto livre como principal fonte de diagnóstico de produção é um anti-padrão que não escala. Logs não estruturados são difíceis de parsear, não permitem agregação confiável e impossibilitam correlação automática com traces. À medida que o volume de tráfego cresce, a busca por padrões em texto livre torna-se ineficiente e cara.

## AP02: Código de Chamada de Modelo sem Instrumentação

Realizar chamadas para APIs de LLM sem criar spans dedicados significa que o tempo gasto em inferência é invisível no rastreamento distribuído. Sem instrumentação nas chamadas de modelo, é impossível distinguir se a lentidão de um endpoint está na montagem do prompt, na inferência, no pós-processamento ou em outra etapa. Cada chamada de modelo é um ponto de observabilidade crítico que não deve ser omitido.

## AP03: Métricas Apenas Agregadas sem Detalhamento por Dimensão

Monitorar apenas métricas globais — como "latência média de toda a aplicação" — sem breakdown por endpoint, versão de modelo, tipo de operação ou tenant oculta problemas específicos sob médias enganosas. Um endpoint crítico com 50% de taxa de erro pode ser mascarado por centenas de endpoints saudáveis. Métricas devem ser segmentadas por dimensões relevantes de negócio e operação.

## AP04: Ausência de Correlação entre Traces, Logs e Métricas

Ter traces no APM, logs no Log Management e métricas em monitores como silos desconexos força engenheiros a fazer correlação manual durante incidentes — consumindo tempo precioso. O poder pleno do Datadog emerge quando trace_id é injetado nos logs, exemplares vinculam métricas a traces específicos e dashboards linkam diretamente para traces relevantes. A correlação automática reduz o MTTR significativamente.

## AP05: Ignorar Custo Operacional na Observabilidade

Não instrumentar o custo de inferência por request significa operar na escuridão financeira: o sistema pode estar consumindo muito mais orçamento de LLM do que o previsto sem que ninguém perceba antes da fatura chegar. Custo é uma métrica de observabilidade tão importante quanto latência e disponibilidade. Dashboards de custo devem estar na mesma área de visibilidade dos dashboards de saúde do sistema.

## AP06: Dashboards sem Contexto de Negócio

Dashboards puramente técnicos — CPU, memória, requests/s — sem correlação com métricas de negócio — conversões, usuários ativos, revenue impactado — são difíceis de interpretar por stakeholders não-técnicos e não comunicam o impacto real de incidentes. Dashboards operacionais devem ter uma camada de negócio que traduz saúde técnica em impacto no produto. Isso facilita priorização durante incidentes.

## AP07: Ausência Total de Alertas — Sistema Monitorado Apenas Reativamente

Descobrir problemas em produção através de reclamações de usuários ou tickets de suporte é o sinal mais claro de observabilidade insuficiente. A ausência de alertas proativos significa que o tempo de detecção de incidentes é determinado pela velocidade dos usuários em reportar problemas, não pela velocidade dos sistemas em detectá-los. Todo serviço crítico deve ter ao menos alertas de disponibilidade, taxa de erro e latência.
