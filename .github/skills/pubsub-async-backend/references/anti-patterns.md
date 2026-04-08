# Anti-Padrões — Arquitetura Assíncrona com Pub/Sub para IA

## AP01: Processamento Síncrono de Tarefas de IA de Longa Duração

Executar operações pesadas de IA — geração de embeddings em lote, análise de documentos, pipelines RAG — na thread principal de um request HTTP síncrono bloqueia o servidor e deteriora a latência para todos os outros usuários durante o processamento. Requests HTTP têm timeouts (30-60s) que são facilmente excedidos por tarefas de IA complexas. Todo processamento de IA que pode levar mais de alguns segundos deve ser feito de forma assíncrona.

## AP02: Ausência de Idempotência em Workers de Processamento

Workers que não implementam verificação de idempotência executam operações duplicadas quando mensagens são reentregues — o que acontece regularmente em sistemas de mensageria com garantia at-least-once. Sem idempotência, um documento pode ser indexado múltiplas vezes, e-mails de notificação podem ser enviados em duplicata e embeddings podem ser gerados até exaurir o budget de tokens. A idempotência não é optional em workers de produção.

## AP03: Sistema de Filas sem Dead Letter Queue

Operar sem DLQ significa que mensagens que falham repetidamente são simplesmente descartadas — silenciosamente, sem registro ou possibilidade de análise. Isso torna invisível uma categoria inteira de falhas: documentos nunca indexados, notificações nunca enviadas, tarefas nunca completadas. A ausência de DLQ transforma falhas recuperáveis em perda silenciosa de dados e torna a depuração de problemas em produção extremamente difícil.

## AP04: Retry Infinito sem Limite ou Circuit Breaker

Configurar workers para tentarem indefinidamente ao encontrar falhas sem limite de retries e sem backoff adequado pode criar loops de alto custo e consumo de recursos. Um documento malformado que sempre falha pode ser tentado milhares de vezes, consumindo tokens de LLM, CPU e gerando ruído nos logs. O número de retries deve ser limitado, o intervalo entre tentativas deve crescer exponencialmente e erros estruturais devem ir para DLQ sem retry.

## AP05: Filas sem Monitoramento de Lag e Saúde

Não monitorar o tamanho das filas e o consumer lag significa descobrir backlog apenas quando o usuário reporta que sua tarefa está pendente há horas. Um lag crescente é um sinal precoce de que os workers precisam ser escalados ou que há um bug causando falhas silenciosas. Sistemas de fila sem monitoramento operacional são uma bomba-relógio em produção de alta escala.

## AP06: Acoplamento Temporal Mascarado como Assíncrono

Substituir chamadas síncronas por publicação de eventos e polling agressivo para verificar o resultado imediatamente após não resolve o problema de acoplamento temporal — apenas o disfarça. O verdadeiro padrão assíncrono implica que o produtor não tem expectativa de tempo de conclusão e o resultado é consumido via callback, evento de reply ou verificação lazy. Polling imediato após publicação de evento anula os benefícios de desacoplamento.

## AP07: Mensagens de Fila sem Esquema e Versionamento

Publicar mensagens de fila como dicionários JSON sem schema definido — esperando que produtores e consumidores concordem implicitamente sobre a estrutura — cria fragilidade extrema: qualquer mudança no produtor pode quebrar silenciosamente o consumer. Mensagens devem ter schema versionado (usando Avro, Protobuf ou JSON Schema) registrado em um schema registry. Mudanças de schema devem seguir regras de compatibilidade retroativa.
