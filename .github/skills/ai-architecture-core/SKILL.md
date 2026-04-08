---
name: ai-architecture-core
description: "Use when: designing AI system architecture, backend frontend model integration, AI feature lifecycle, context management architecture, memory and state design, observability for AI, async AI flows, system design with LLM, AI feature from scratch"
applyTo: "docs/core/07-ai-architecture/**"
---

# Arquitetura de Sistemas de IA

## Objetivo
Ensinar uma visão sistêmica de como construir features de IA — integrando backend, frontend e modelo — com foco em contexto/memória/estado, persistência, observabilidade e fluxos síncronos e assíncronos.

## Escopo
**Entra:** Relação backend/frontend/modelo, gerenciamento de contexto/memória/estado, persistência, observabilidade, fluxos síncronos e assíncronos, ciclo de vida completo de uma feature com IA.

**Não entra:** Detalhes de implementação de cada componente (cobertos nos módulos específicos), MLOps e treinamento de modelos.

## Quando usar
Use este módulo quando o estudante precisar projetar (ou compreender) a arquitetura completa de uma feature de IA — antes de implementar os componentes individuais.

## Resultado esperado do módulo
O estudante consegue desenhar o fluxo completo de uma feature de IA — desde a entrada do usuário no frontend até a chamada ao modelo e retorno da resposta — identificando os componentes, responsabilidades e pontos de falha.

## Conteúdos principais
1. Visão geral: backend, frontend e modelo como sistema integrado
2. Papel do backend de IA: orquestração, não lógica de negócio misturada
3. Contexto, memória e estado: definições e responsabilidades
4. Persistência: o que salvar, quando salvar, onde salvar
5. Observabilidade: traces, logs e métricas em sistemas de IA
6. Fluxo síncrono vs. assíncrono: quando usar cada um
7. Ciclo de vida completo de uma feature: do protótipo à produção
8. Pontos de falha e estratégias de resiliência

## Estrutura sugerida da aula
1. Introdução — diferença entre "funciona no notebook" e "funciona em produção"
2. Conceito — diagrama de arquitetura de referência
3. Exemplo — arquitetura de um chatbot com RAG
4. Prática — desenhar o fluxo de uma feature
5. Fechamento — critérios para uma arquitetura sustentável

## Prática do módulo
**Exercício:** Escolha uma feature de IA simples (ex: "responder perguntas sobre pedidos de um cliente"). Desenhe o fluxo completo: de onde vem a entrada do usuário, como chega ao backend, como o contexto é montado, como o modelo é chamado e como a resposta chega ao usuário. Identifique pelo menos 2 pontos de falha e suas mitigações.

**Critérios de validação:**
- O diagrama inclui frontend, backend, modelo e armazenamento
- As responsabilidades de cada componente estão claras
- O ciclo de contexto (criação, uso, atualização) está representado
- Ao menos 2 pontos de falha são identificados com mitigações

## Critérios mínimos de qualidade
- [ ] Diagrama distingue claramente orquestração de lógica de negócio
- [ ] Fluxo assíncrono está representado quando a latência do modelo é alta
- [ ] Pontos de observabilidade estão marcados no diagrama
- [ ] Estado e memória têm responsáveis claros (qual serviço persiste o quê)
- [ ] O diagrama pode ser explicado em 5 minutos para um novo desenvolvedor

## Relações com outros módulos
- **Todos os módulos de backend (08–16):** Este módulo fornece o mapa; os demais detalham cada componente
- **Módulo 17 (react-ai-frontend-frontend):** Frontend no contexto arquitetural
- **Módulo 14 (observability-otel-datadog-backend):** Observabilidade como componente arquitetural

## Notas de consistência
- Usar termos consistentes: "orquestrador", "serviço de IA", "camada de contexto", "camada de persistência"
- Diagramas devem usar notação simples (caixas e setas) antes de usar ferramentas formais
- Distinguir "estado de sessão" (curto prazo) de "memória" (longo prazo) e "contexto" (prompt atual)
