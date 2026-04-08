---
name: frontend-backend-integration-frontend
description: "Use when: SSE in frontend, WebSocket for AI chat, polling for async task, task cancellation frontend, re-execute AI task, async task status, long-polling AI, streaming protocol, backend synchronization for AI, AbortController"
applyTo: "docs/frontend/19-frontend-backend-integration/**"
---

# Integração Frontend-Backend para IA

## Objetivo
Ensinar os protocolos e padrões para integrar frontend com backend em fluxos de IA assíncronos — SSE, WebSocket, polling, cancelamento, re-execução e feedback de tarefas assíncronas.

## Escopo
**Entra:** SSE, WebSocket, polling, cancelamento de requisição, re-execução, feedback de tarefa assíncrona, sincronização com backend.

**Não entra:** GraphQL subscriptions, gRPC streaming, implementação do lado do servidor em profundidade (módulo 12), deploy e infraestrutura de WebSocket.

## Quando usar
Use este módulo quando o estudante precisar decidir e implementar o protocolo de comunicação entre frontend e backend para features de IA que têm latência alta, resultados parciais ou processamento assíncrono.

## Resultado esperado do módulo
O estudante consegue implementar ou projetar pelo menos dois protocolos de integração (ex: SSE e polling), entende quando usar cada um e consegue implementar cancelamento e re-execução no frontend.

## Conteúdos principais
1. Comparação de protocolos: SSE vs. WebSocket vs. polling vs. long-polling
2. SSE (Server-Sent Events): implementação no frontend com `EventSource`
3. WebSocket: quando usar em vez de SSE
4. Polling e long-polling: casos de uso e trade-offs
5. Cancelamento de requisição: `AbortController` no browser
6. Re-execução: limpar estado e reiniciar o fluxo
7. Feedback de tarefa assíncrona: status polling e notificações
8. Sincronização: garantir consistência entre UI e backend

## Estrutura sugerida da aula
1. Introdução — por que o HTTP request-response não é suficiente para IA
2. Conceito — comparação dos protocolos
3. Exemplo — chat com SSE vs. tarefa de background com polling
4. Prática — implementar rastreamento de tarefa assíncrona
5. Fechamento — decidir o protocolo certo para cada caso

## Prática do módulo
**Exercício:** Implemente (ou projete) um fluxo onde o usuário clica em "Gerar Relatório", o frontend inicia uma tarefa assíncrona no backend, faz polling do status a cada 2 segundos e exibe o progresso. Quando concluir, exibe o resultado. Inclua um botão "Cancelar" que interrompe o polling e notifica o backend.

**Critérios de validação:**
- O frontend não bloqueia enquanto aguarda a tarefa
- O status é atualizado visualmente a cada poll
- O botão "Cancelar" para o polling e envia cancelamento ao backend
- O resultado é exibido corretamente quando a tarefa conclui

## Critérios mínimos de qualidade
- [ ] O protocolo escolhido é justificado (não escolhido por padrão)
- [ ] Cancelamento libera recursos no cliente E notifica o servidor
- [ ] Erros de rede são tratados com retry ou mensagem ao usuário
- [ ] O estado da UI é consistente com o estado do backend
- [ ] Timeout máximo de espera é definido e comunicado ao usuário

## Relações com outros módulos
- **Módulo 12 (pubsub-async-backend):** O backend que publica os status
- **Módulo 17 (react-ai-frontend-frontend):** O componente que exibe os resultados
- **Módulo 14 (observability-otel-datadog-backend):** Rastreamento do ciclo de vida da requisição

## Notas de consistência
- Usar `AbortController` para cancelamento de fetch, nunca timeouts manuais
- Status de task: `pending` | `processing` | `completed` | `failed` | `cancelled`
- Interval de polling: configurável, com backoff para tarefas longas
- Sempre limpar `EventSource` e `WebSocket` no cleanup do componente (return do `useEffect`)
