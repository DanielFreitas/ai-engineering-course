# Casos de Borda — Integração Frontend-Backend para Fluxos de IA

## CE01: Conexão SSE Interrompida no Meio do Streaming

**Cenário:** A conexão SSE cai após o servidor ter enviado 60% dos tokens — por queda de rede, timeout de proxy ou reinicialização de pod.

**Comportamento esperado:** O frontend detecta o fechamento inesperado do `EventSource` (sem receber o evento `done`) e exibe ao usuário a opção de "continuar" a partir do ponto de interrupção ou de "regenerar" a resposta completa. O estado parcial deve ser preservado e exibido, não descartado.

**Risco sem tratamento:** O usuário vê a resposta truncada sem explicação, interpreta como falha do sistema e perde confiança na plataforma.

---

## CE02: Múltiplos Cliques no Botão de Envio

**Cenário:** O usuário clica no botão de envio duas vezes rapidamente antes de o estado de loading ser ativado na UI.

**Comportamento esperado:** O frontend deve desabilitar o botão imediatamente no primeiro clique e usar idempotency key (baseada em session_id + timestamp) para que o backend descarte requisições duplicadas. Apenas uma resposta deve ser gerada.

**Risco sem tratamento:** Duas requisições paralelas consomem tokens em dobro, podem retornar em ordem incorreta e causam race condition no estado da UI.

---

## CE03: Token JWT Expirado Durante Streaming em Andamento

**Cenário:** Uma sessão de streaming longa (>15 minutos) tem início com token válido, mas o token expira enquanto o stream ainda está ativo.

**Comportamento esperado:** O backend deve aceitar streams em andamento com tokens válidos no início da conexão. O frontend deve renovar o token proativamente antes da expiração e reautenticar silenciosamente. Se a reconexão for necessária, deve reutilizar o session_id para preservar o contexto.

**Risco sem tratamento:** O stream é interrompido abruptamente com erro 401, e todo o contexto da sessão é perdido, frustrando o usuário e desperdiçando a computação realizada.

---

## CE04: Resposta Chega Após Cancelamento Solicitado pelo Usuário

**Cenário:** O usuário clica em "Cancelar" e, em seguida, a resposta do servidor chega antes que o cancelamento seja processado pelo backend.

**Comportamento esperado:** O frontend deve ignorar qualquer resposta recebida após emitir o sinal de cancelamento, independentemente da ordem de chegada das mensagens. O estado da UI deve permanecer no estado "cancelado", sem exibir a resposta tardia.

**Risco sem tratamento:** A resposta tardia sobrescreve o estado de cancelamento da UI, causando confusão sobre o estado real da tarefa.

---

## CE05: Backend Retorna Status "Processing" Indefinidamente (Task Stall)

**Cenário:** Uma tarefa assíncrona entra em estado `processing` mas nunca avança para `completed` ou `failed` — por deadlock, pod travado ou mensagem perdida na fila.

**Comportamento esperado:** O frontend deve implementar um timeout máximo de polling (ex: 5 minutos) e, após esse período, exibir mensagem de erro com opção de reenviar a tarefa. O backend deve implementar health check de tasks com mecanismo de timeout e auto-falha.

**Risco sem tratamento:** O usuário aguarda indefinidamente, a tarefa nunca completa e os recursos de backend ficam presos sem liberação.

---

## CE06: Contexto Maior que o Limite de Tokens Suportado

**Cenário:** Após múltiplos turnos de conversa, o histórico acumulado ultrapassa o limite de contexto do modelo (ex: 128K tokens).

**Comportamento esperado:** O backend deve retornar erro `CONTEXT_TOO_LONG` com sugestão de truncagem ou resumo do histórico. O frontend deve exibir aviso ao usuário e oferecer ação de "resumir conversa" ou "iniciar nova sessão". O sistema deve tentar truncagem automática com confirmação do usuário antes de exibir erro.

**Risco sem tratamento:** O backend falha silenciosamente ou trunca o contexto sem avisar, causando respostas incoerentes que o usuário não consegue diagnosticar.

---

## CE07: WebSocket Desconecta com Mensagens Pendentes na Fila

**Cenário:** O cliente WebSocket perde conexão com mensagens ainda enfileiradas no servidor não entregues.

**Comportamento esperado:** O servidor deve manter um buffer de mensagens não confirmadas associado ao session_id por um período razoável (ex: 30 segundos). Ao reconectar, o cliente deve enviar o ID da última mensagem recebida e o servidor deve reenviar as mensagens pendentes.

**Risco sem tratamento:** Mensagens parciais ou tokens de resposta são perdidos permanentemente, resultando em resposta incompleta exibida ao usuário.

---

## CE08: Rate Limit Atingido no Meio de uma Sessão Ativa

**Cenário:** O usuário atinge o limite de requisições (rate limit) enquanto está no meio de um fluxo de trabalho com múltiplos turnos.

**Comportamento esperado:** O backend retorna `429 Too Many Requests` com o header `X-RateLimit-Reset` indicando quando o limite será liberado. O frontend exibe mensagem clara informando o tempo de espera e desabilita novas submissões até o reset, preservando o contexto da sessão atual para continuar após a liberação.

**Risco sem tratamento:** O usuário recebe erro genérico, não entende o que aconteceu e perde todo o contexto da sessão ao tentar recarregar a página.
