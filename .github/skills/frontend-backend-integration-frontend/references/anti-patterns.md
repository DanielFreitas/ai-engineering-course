# Anti-Padrões — Integração Frontend-Backend para Fluxos de IA

## AP01: Polling Excessivo sem Estratégia de Back-off

Implementar polling com intervalo fixo e curto — por exemplo, 500ms constantes — sobrecarrega o backend e aumenta custos de infraestrutura sem benefício proporcional para o usuário. A maioria das tarefas não muda de estado em intervalos tão curtos, tornando a maior parte das requisições desperdiçada. Polling sempre deve usar backoff exponencial com jitter para distribuir a carga e respeitar os limites do backend.

## AP02: Ausência de Mecanismo de Cancelamento

Não implementar cancelamento de requisições força o backend a continuar processando tarefas cujos resultados o usuário já não precisa, desperdiçando tokens de LLM, CPU e memória. No frontend, a ausência de cancelamento leva a race conditions onde múltiplas respostas chegam fora de ordem. Toda integração com fluxos de IA deve implementar `AbortController` e os respectivos handlers no backend.

## AP03: Estado de UI Desatualizado após Resposta do Servidor

Atualizar apenas parte do estado da UI quando uma resposta chega — por exemplo, mostrar o conteúdo mas não atualizar o estado de loading — cria inconsistências visuais que confundem o usuário. O gerenciamento de estado deve ser transacional: todas as partes relacionadas do estado mudam de forma atômica a cada atualização relevante. Ferramentas de gestão de estado como Zustand ou Redux ajudam a garantir consistência.

## AP04: Timeout sem Tratamento Adequado e Mensagem Clara

Deixar expirar o timeout de uma conexão SSE ou fetch sem exibir mensagem de erro, oferecer retry ou redirecionar o usuário resulta em uma experiência de "buraco negro". O usuário fica preso em um estado de loading infinito, sem entender o que aconteceu ou como proceder. Timeouts devem acionar handlers explícitos que comunicam o problema com clareza e oferecem ação de recuperação.

## AP05: Re-execução sem Deduplicação de Contexto

Reenviar todo o histórico de contexto a cada re-execução sem verificar o que já foi processado pelo backend infla desnecessariamente o tamanho do prompt e aumenta latência e custo. Em sessões longas, esse anti-padrão pode fazer com que o contexto ultrapasse o limite de tokens do modelo, causando erros. O frontend deve enviar apenas o delta de contexto desde a última sincronização confirmada.

## AP06: Falta de Feedback Visual para Operações Longas

Iniciar uma operação de IA sem feedback imediato na UI — nenhum spinner, nenhuma mensagem de status, nenhum indicador de progresso — leva o usuário a clicar novamente no botão, gerando múltiplas requisições paralelas não intencionais. Esse anti-padrão é um dos principais responsáveis por duplicação de tarefas e inconsistências de estado. O estado de "processando" deve ser refletido na UI imediatamente, antes mesmo da resposta do servidor.

## AP07: Acoplamento Forte ao Formato de Resposta do Backend

Parsear a resposta do backend diretamente na camada de UI sem uma camada de adaptação torna o frontend frágil: qualquer mudança no contrato de API quebra a interface. O frontend deve ter um adaptador ou mapper que isola a estrutura interna do modelo de dados do backend da representação usada nos componentes de UI. Isso permite que backend e frontend evoluam independentemente com impacto mínimo de um no outro.
