# Padrões — Arquitetura Assíncrona com Pub/Sub para IA

## P01: Desacoplamento de Produtores e Consumidores via Pub/Sub

Separar os serviços que geram eventos dos serviços que os processam através de um broker de mensagens (Pub/Sub, Kafka, RabbitMQ) elimina dependências temporais e de disponibilidade entre componentes. Um serviço de upload de documentos não precisa aguardar a conclusão do pipeline de embedding para responder ao usuário. O desacoplamento permite que cada componente escale, atualize e falhe independentemente.

## P02: Processamento de Tarefas Pesadas em Workers de Background

Operações de IA que consomem tempo e recursos — geração de embeddings em lote, análise de documentos longos, pipelines de RAG complexos — devem ser executadas por workers dedicados que consomem mensagens de uma fila, sem bloquear o fluxo HTTP. O serviço principal aceita a tarefa, retorna um ID de acompanhamento imediatamente e o worker processa de forma assíncrona. Esse padrão permite alta concorrência sem degradação de latência perceptível pelo usuário.

## P03: Geração Assíncrona de Embeddings com Trigger por Evento

Em vez de gerar embeddings de forma síncrona no momento do upload de conteúdo, o sistema publica um evento `content.uploaded` e workers dedicados de embedding reagem a esse evento. Isso permite que a ingestão de conteúdo seja rápida e resiliente: se o serviço de embedding estiver sobrecarregado, os eventos se acumulam na fila e são processados quando a capacidade estiver disponível. O evento deve incluir todos os metadados necessários para que o worker processe independentemente.

## P04: Retry com Backoff Exponencial e Jitter

Mensagens que falham no processamento devem ser reenfileiradas com intervalo crescente entre tentativas, seguindo backoff exponencial com jitter para evitar thundering herd. O número máximo de tentativas deve ser configurável por tipo de mensagem. A estratégia de retry deve distinguir entre erros recuperáveis (timeout de API do modelo, indisponibilidade temporária) e erros permanentes (dados malformados, violação de schema) — estes últimos devem ir direto para a DLQ sem retry.

## P05: Idempotência de Processamento de Mensagens

Cada mensagem deve ter um ID único, e os workers devem implementar verificação de idempotência antes de processar — consultando um registro de mensagens já processadas ou usando operações idempotentes por natureza (upsert em vez de insert). Isso garante que, em caso de reentrega da mensagem por falha de acknowledgment, o efeito colateral seja executado apenas uma vez. A idempotência é fundamental quando a operação tem side effects como envio de e-mail, chamada de API externa ou escrita em banco.

## P06: Dead Letter Queue (DLQ) com Monitoramento e Processo de Remediation

Mensagens que esgotaram as tentativas de retry devem ser movidas para uma Dead Letter Queue dedicada com metadados de falha completos: número de tentativas, último erro, timestamp de cada tentativa. A DLQ deve ser monitorada com alertas: acúmulo de mensagens indica problema sistêmico. O processo de remediation — análise da causa, correção do código e reprocessamento das mensagens da DLQ — deve ser documentado e testável.

## P07: Pipelines Distribuídas de IA com Orquestração de Eventos

Fluxos de trabalho de IA multi-etapa (upload → chunking → embedding → indexação → notificação) podem ser implementados como cadeias de eventos: cada worker completa sua etapa e publica o evento que aciona o próximo. Esse padrão de coreografia é altamente escalável e resiliente, mas requer disciplina de naming de eventos e monitoramento do fluxo completo. Ferramentas como Temporal ou AWS Step Functions oferecem orquestração com visibilidade de estado para pipelines mais complexas.

## P08: Monitoramento de Filas com Métricas de Throughput e Lag

O tamanho das filas, a taxa de processamento (messages/sec) e o consumer lag (atraso entre publicação e processamento) devem ser monitorados continuamente. Um lag crescente indica que a capacidade de processamento é insuficiente para o volume de eventos — sinal de que é necessário escalar workers. Alertas devem disparar quando o lag ultrapassa thresholds que afetariam a experiência do usuário (ex: lag > 30 segundos em pipeline de indexação em tempo real).
