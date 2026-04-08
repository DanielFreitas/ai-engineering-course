---
name: context-memory-state-backend
description: "Use when: managing conversation history, truncating context window, summarizing conversation, short-term memory, long-term memory, session state in AI, context cost optimization, chat history management, multi-turn conversation"
applyTo: "docs/backend/09-context-memory-state/**"
---

# Contexto, Memória e Estado Conversacional

## Objetivo
Ensinar como gerenciar estado conversacional em sistemas de IA — incluindo truncamento de histórico, sumarização de contexto, memória de curto e longo prazo e o impacto no custo e latência.

## Escopo
**Entra:** Estado conversacional, truncamento de histórico, sumarização de contexto, memória de curto e longo prazo, recuperação de estado externo, impacto de custo e latência, quando persistir vs. recalcular.

**Não entra:** Bancos de dados vetoriais em profundidade (módulo 11), cache de resposta (módulo 13), RAG como mecanismo de recuperação (módulo 04).

## Quando usar
Use este módulo quando o estudante precisar construir um chat ou fluxo multi-turno onde o histórico precisa ser gerenciado para manter coerência sem explodir o custo ou o tamanho do contexto.

## Resultado esperado do módulo
O estudante consegue implementar uma estratégia de gerenciamento de histórico de conversa — usando truncamento por janela ou sumarização — e entende quando usar memória de curto vs. longo prazo.

## Conteúdos principais
1. O problema do contexto crescente: custo e limite de tokens
2. Estratégias de truncamento: por número de mensagens, por tokens, sliding window
3. Sumarização de contexto: resumir o que foi discutido antes
4. Memória de curto prazo: histórico de sessão in-memory
5. Memória de longo prazo: preferências e fatos do usuário persistidos
6. Recuperação de estado externo: buscar contexto relevante antes da chamada
7. Impacto de custo e latência: medir antes e depois de cada estratégia
8. Quando persistir vs. recalcular

## Estrutura sugerida da aula
1. Introdução — o que acontece quando o contexto fica grande demais
2. Conceito — tipos de memória e estratégias de gerenciamento
3. Exemplo — chat com sliding window de 10 mensagens
4. Prática — implementar truncamento ou sumarização
5. Fechamento — decisão: qual estratégia para qual caso

## Prática do módulo
**Exercício:** Implemente uma função `build_context(history, max_tokens)` que recebe um histórico de conversa e retorna uma versão truncada ou sumarizada que respeita o limite de tokens. Compare o custo estimado de uma conversa de 20 turnos sem e com a estratégia implementada.

**Critérios de validação:**
- A função nunca retorna um histórico maior que `max_tokens`
- A resposta do modelo ainda é coerente com o histórico truncado
- O custo estimado com truncamento é menor que sem truncamento
- A função é testável de forma independente

## Critérios mínimos de qualidade
- [ ] Limite de tokens do contexto é testado antes de cada chamada
- [ ] Estratégia de truncamento/sumarização é documentada e justificada
- [ ] Mensagens do sistema (`system`) são preservadas na truncagem
- [ ] Custo e tamanho do contexto são logados por chamada
- [ ] Estratégia de fallback existe quando o histórico não pode ser recuperado

## Relações com outros módulos
- **Módulo 02 (llm-api-integration-core):** Tokens e janela de contexto da API
- **Módulo 08 (fastapi-ai-backend-backend):** Integração do gerenciamento de estado no serviço
- **Módulo 11 (persistence-context-backend):** Persistência do histórico de conversação

## Notas de consistência
- Distinguir claramente: `context` (o que vai no prompt atual), `history` (histórico completo), `memory` (fatos persistentes)
- Funções de gerenciamento de contexto devem ser puras e testáveis
- Sempre incluir o `system prompt` ao reconstruir o contexto após truncamento
