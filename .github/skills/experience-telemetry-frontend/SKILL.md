---
name: experience-telemetry-frontend
description: "Use when: tracking AI usage, measuring AI response acceptance, user abandonment tracking, frustration signals, product telemetry for AI, AI response feedback, measuring AI quality from user perspective, analytics for AI feature, implicit feedback"
applyTo: "docs/frontend/20-experience-telemetry/**"
---

# Telemetria de Experiência para IA

## Objetivo
Ensinar como medir a experiência do usuário com features de IA — capturando eventos de uso, abandono, aceitação/rejeição de respostas e sinais de frustração para correlacionar experiência com performance percebida.

## Escopo
**Entra:** Eventos de uso, abandono, aceitação/rejeição de resposta, sinais de frustração, correlação entre experiência e performance percebida, telemetria do ponto de vista de produto.

**Não entra:** Análise estatística avançada de dados, A/B testing em profundidade (módulo 15), telemetria de infraestrutura (módulo 14), LGPD e privacidade de dados em profundidade.

## Quando usar
Use este módulo quando o estudante precisar definir o que medir em uma feature de IA para entender se está ajudando os usuários — indo além das métricas técnicas (latência, tokens) para métricas de produto (uso real, satisfação, abandono).

## Resultado esperado do módulo
O estudante consegue definir um conjunto mínimo de eventos de telemetria para uma feature de IA, explicar o que cada evento mede em termos de experiência do usuário e propor como correlacionar esses eventos com métricas de qualidade do modelo.

## Conteúdos principais
1. Por que métricas técnicas não contam a história completa
2. Tipos de eventos: uso, engajamento, abandono, feedback explícito
3. Eventos essenciais para IA: resposta aceita/rejeitada, regeneração, abandono
4. Sinais de frustração: múltiplas regenerações, abandono após resposta, feedback negativo
5. Correlação: experiência do usuário × qualidade do modelo
6. Instrumentação no frontend: quando e como disparar eventos
7. Análise: do evento à decisão de produto
8. Privacidade: o que coletar com consentimento

## Estrutura sugerida da aula
1. Introdução — o modelo pode ser bom e a feature ruim
2. Conceito — hierarquia de métricas: técnica → produto → negócio
3. Exemplo — plano de eventos para um chatbot de suporte
4. Prática — definir eventos para uma feature específica
5. Fechamento — como usar telemetria para melhorar o produto

## Prática do módulo
**Exercício:** Para uma feature de IA de sua escolha (ex: geração de resumo, resposta de chatbot, sugestão de texto), defina um conjunto de 5–8 eventos de telemetria que medem se a feature está ajudando ou frustrando o usuário. Para cada evento, especifique: nome, propriedades, quando disparar e o que mede.

**Critérios de validação:**
- 5–8 eventos definidos com nome, propriedades e trigger claros
- Pelo menos um evento mede aceitação explícita (ex: "usou a resposta")
- Pelo menos um evento mede frustração (ex: "regenerou 3+ vezes")
- Os eventos permitem calcular uma taxa de aceitação geral da feature

## Critérios mínimos de qualidade
- [ ] Eventos têm nomes consistentes (ex: `ai_response_accepted`, `ai_response_regenerated`)
- [ ] Propriedades dos eventos incluem session_id para correlação
- [ ] Eventos de abandono são capturados (não apenas ações positivas)
- [ ] A coleta de eventos respeita consentimento do usuário
- [ ] Existe um plano simples de análise: "com esses eventos, consigo responder X"

## Relações com outros módulos
- **Módulo 17 (react-ai-frontend-frontend):** Componentes onde os eventos são disparados
- **Módulo 18 (ai-ux-quality-frontend):** Melhorias de UX guiadas por telemetria
- **Módulo 15 (llmops-lifecycle-backend):** Dados de experiência informam decisões de LLMOps

## Notas de consistência
- Nomes de eventos: snake_case, prefixo `ai_` para eventos relacionados à IA
- Propriedades obrigatórias: `session_id`, `user_id` (anonimizado), `timestamp`, `feature_name`
- Distinguir feedback explícito (usuário clicou em 👍) de comportamento implícito (não regenerou)
- Telemetria de experiência e telemetria técnica devem compartilhar `trace_id` para correlação
