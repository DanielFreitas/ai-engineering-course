---
name: react-ai-frontend-frontend
description: "Use when: React frontend for AI, streaming UI in React, loading states for AI, AI response display, source display, regenerate response button, progressive loading AI, frontend AI integration, SSE in React, skeleton loading AI"
applyTo: "docs/frontend/17-react-ai-frontend/**"
---

# Frontend React para IA

## Objetivo
Ensinar como construir interfaces React para features de IA — com suporte a streaming, estados intermediários, regeneração, exibição de fontes, loading progressivo e integração com backend de IA.

## Escopo
**Entra:** Streaming com SSE em React, estados de carregamento, regeneração, exibição de fontes/referências, loading progressivo, componentes para fluxos de IA, integração com backend.

**Não entra:** Design visual aprofundado, acessibilidade avançada (módulo 18), WebSocket em profundidade (módulo 19), gerenciamento de estado global (Redux/Zustand) em profundidade.

## Quando usar
Use este módulo quando o estudante precisar implementar a camada de interface para uma feature de IA — desde a entrada do usuário até a exibição do resultado com feedback visual adequado.

## Resultado esperado do módulo
O estudante consegue criar um componente React funcional que exibe estados de carregamento, recebe resposta via streaming, permite regeneração e mostra fontes quando relevante.

## Conteúdos principais
1. Por que a UI de IA é diferente: incerteza, latência, resultados parciais
2. Streaming com SSE: `EventSource` e `fetch` com `ReadableStream`
3. Estados da UI de IA: idle, loading, streaming, success, error
4. Componente de resposta progressiva: renderização incremental
5. Ação de regeneração: limpar estado e reenviar
6. Exibição de fontes e referências em RAG
7. Tratamento de erros na UI: retry, mensagem amigável
8. Integração com backend: contratos de API e tipos TypeScript

## Estrutura sugerida da aula
1. Introdução — o que a UI precisa fazer que não existia antes da IA
2. Conceito — máquina de estados de uma resposta de IA
3. Exemplo — chat simples com streaming
4. Prática — implementar os estados de loading, error e regeneração
5. Fechamento — checklist de qualidade de UI de IA

## Prática do módulo
**Exercício:** Crie um componente React `AIResponsePanel` que recebe uma pergunta, faz uma chamada ao backend (pode ser mockada), e exibe: estado de carregamento (spinner ou skeleton), a resposta em streaming (texto incremental), um botão "Regenerar" e uma mensagem de erro com botão de retry em caso de falha.

**Critérios de validação:**
- Todos os 4 estados são implementados (loading, streaming, success, error)
- O botão "Regenerar" limpa a resposta anterior e faz nova chamada
- Mensagem de erro é amigável (não expõe detalhes técnicos)
- O componente funciona com resposta mockada

## Critérios mínimos de qualidade
- [ ] Estados loading, streaming, success e error são visualmente distintos
- [ ] O usuário pode interromper ou regenerar a resposta
- [ ] Erros são apresentados com ação clara (tentar novamente)
- [ ] Fontes são sempre linkadas quando disponíveis na resposta
- [ ] O componente é testável de forma independente (sem dependências reais)

## Relações com outros módulos
- **Módulo 08 (fastapi-ai-backend-backend):** O backend que o frontend consome
- **Módulo 18 (ai-ux-quality-frontend):** Qualidade de UX aplicada ao componente
- **Módulo 19 (frontend-backend-integration-frontend):** Protocolos de integração (SSE/WebSocket)

## Notas de consistência
- Nomear estados do componente: `idle` | `loading` | `streaming` | `success` | `error`
- Usar `useReducer` para gerenciar máquina de estados complexa
- Mensagens de erro para o usuário nunca expõem stack traces ou erros técnicos
- Botão "Regenerar" deve reiniciar o estado para `loading`, não manter o resultado anterior
