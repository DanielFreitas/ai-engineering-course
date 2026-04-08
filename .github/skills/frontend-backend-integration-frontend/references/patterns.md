# Padrões — Integração Frontend-Backend para Fluxos de IA

## P01: Streaming de Respostas via Server-Sent Events (SSE)

Para transmissão unidirecional de tokens gerados pelo modelo, SSE é a abordagem mais simples e eficiente: usa HTTP padrão, tem suporte nativo em browsers modernos via `EventSource` e é compatível com proxies reversos sem configuração adicional. O backend emite eventos no formato `data: <chunk>\n\n` e o frontend processa cada fragmento incrementalmente. Essa abordagem é preferível ao WebSocket quando a comunicação é majoritariamente do servidor para o cliente.

## P02: Comunicação Bidirecional via WebSocket

Quando o fluxo exige comunicação bidirecional em tempo real — como agentes que solicitam input zusätzlich do usuário durante a execução ou funcionalidades de voz — WebSocket oferece canal full-duplex com baixa latência. O gerenciamento de reconexão automática deve ser implementado no cliente para lidar com quedas de rede. Protocolos de heartbeat garantem que a conexão seja detectada como encerrada mesmo sem mensagens ativas.

## P03: Polling Adaptativo para Tarefas Assíncronas de Longa Duração

Quando SSE e WebSocket não são viáveis — por restrições de infraestrutura ou integrações legadas — o polling periódico é uma alternativa razoável para verificar o status de tarefas assíncronas. O intervalo de polling deve aumentar progressivamente (backoff exponencial) para reduzir carga no servidor conforme a tarefa avança. O polling deve ser combinado com um token de status que permita ao frontend identificar mudanças de estado sem reenviar dados desnecessários.

## P04: Cancelamento Gracioso de Requisições em Progresso

O frontend deve implementar a capacidade de cancelar operações de IA em progresso usando `AbortController` para fetch/SSE ou mensagens de controle para WebSocket. O backend deve reconhecer sinais de cancelamento e interromper o processamento, liberando recursos de forma ordenada. Interface deve refletir imediatamente o estado de cancelamento, sem aguardar confirmação do servidor.

## P05: Re-execução com Preservação Parcial de Estado

Fluxos de re-execução devem reutilizar o contexto acumulado da sessão, preservando histórico e arquivos anexados já processados. A re-execução não deve ser equivalente a uma nova sessão limpa, a menos que o usuário explicitamente solicite. O sistema deve deduplicar contexto repetido para evitar inflação desnecessária do prompt e dos custos de inferência.

## P06: Feedback Progressivo de Status para Tarefas Assíncronas

O frontend deve consumir atualizações de status da tarefa backend — etapas concluídas, percentual de progresso, subtarefas em execução — e traduzir esses estados em mensagens compreensíveis para o usuário. Estados técnicos internos precisam ser mapeados para linguagem de domínio antes de serem exibidos. Um componente de progresso bem implementado reduz abandono e aumenta a confiança na plataforma.

## P07: Sincronização de Estado entre Frontend e Backend

O estado da UI deve refletir com fidelidade o estado real do processo no backend, evitando desincronias onde o usuário vê "concluído" enquanto o backend ainda processa. Estratégias de reconciliação — como polling de verificação após SSE fechar ou confirmação explícita do backend antes de transição de estado — garantem consistência. O estado local no frontend deve ser tratado como cache otimista, com capacidade de rollback em caso de divergência.

## P08: Circuit Breaker no Frontend para Proteção do Backend

O frontend deve implementar lógica de circuit breaker para evitar bombardeamento do backend com requisições durante períodos de degradação. Após um número configurável de falhas consecutivas, novas requisições devem ser bloqueadas por um período de cooling-off, com mensagem explicativa ao usuário. Esse padrão protege tanto o backend quanto a experiência do usuário em cenários de alta carga ou instabilidade.
