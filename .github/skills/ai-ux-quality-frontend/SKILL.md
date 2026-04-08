---
name: ai-ux-quality-frontend
description: "Use when: AI UX design, user trust in AI, uncertainty communication, explainability UI, sensitive action confirmation, AI response clarity, accessibility for AI, user experience AI feature, UI for non-deterministic output"
applyTo: "docs/frontend/18-ai-ux-quality/**"
---

# Qualidade de UX para IA

## Objetivo
Ensinar princípios práticos de qualidade de UX para features de IA — comunicação de incerteza, confirmação de ações sensíveis, clareza, consistência, explicabilidade, confiança do usuário e acessibilidade.

## Escopo
**Entra:** Comunicação de incerteza, confirmação de ação sensível, clareza de resposta, consistência, explicabilidade, confiança, acessibilidade, limites da interface com IA.

**Não entra:** Design visual e sistemas de design, implementação de acessibilidade avançada (ARIA), pesquisa de UX quantitativa, testes de usabilidade formais.

## Quando usar
Use este módulo quando o estudante precisar avaliar ou melhorar a qualidade da experiência de uma interface de IA — focando em como o usuário percebe, entende e confia nos resultados.

## Resultado esperado do módulo
O estudante consegue revisar uma interface de IA e identificar problemas de clareza, confiança e acessibilidade — propondo melhorias concretas e justificadas para cada problema encontrado.

## Conteúdos principais
1. Por que UX de IA é diferente: outputs não-determinísticos, incerteza inerente
2. Comunicação de incerteza: quando e como mostrar confiança/incerteza
3. Confirmação de ações sensíveis: o modelo sugeriu, o usuário decide
4. Clareza da resposta: linguagem, formatação, comprimento adequado
5. Consistência: o usuário deve saber o que esperar
6. Explicabilidade: quando e como mostrar "por quê"
7. Confiança do usuário: como construir e manter
8. Acessibilidade básica: contraste, foco, compatibilidade com leitor de tela
9. Limites da interface: o que a UI não deve deixar o modelo decidir sozinho

## Estrutura sugerida da aula
1. Introdução — por que a UI de IA pode frustrar mesmo quando o modelo é bom
2. Conceito — princípios de UX para IA
3. Exemplo — análise de uma interface existente
4. Prática — revisar e propor melhorias
5. Fechamento — checklist de qualidade de UX

## Prática do módulo
**Exercício:** Escolha uma interface de IA existente (pode ser screenshot de um produto real ou um mockup). Identifique pelo menos 3 problemas de qualidade de UX — um de clareza, um de confiança e um de acessibilidade. Para cada problema, descreva o impacto no usuário e proponha uma melhoria concreta.

**Critérios de validação:**
- 3 problemas distintos identificados (um por categoria: clareza, confiança, acessibilidade)
- Cada problema tem impacto descrito em termos do usuário (não técnico)
- Cada melhoria é concreta e implementável
- As melhorias não comprometem a funcionalidade existente

## Critérios mínimos de qualidade
- [ ] Incerteza é comunicada de forma que o usuário entende
- [ ] Ações irreversíveis têm confirmação explícita
- [ ] Linguagem da resposta é adequada para o público-alvo
- [ ] Contraste e tamanho de fonte atendem WCAG AA mínimo
- [ ] O usuário sabe o que fazer quando a IA não consegue ajudar

## Relações com outros módulos
- **Módulo 17 (react-ai-frontend-frontend):** A implementação dos componentes avaliados
- **Módulo 20 (experience-telemetry-frontend):** Medir se as melhorias de UX tiveram impacto
- **Módulo 06 (ai-safety-governance-core):** Segurança do usuário como critério de UX

## Notas de consistência
- Usar termos: "estado de incerteza", "ação sensível", "explicabilidade", "affordance"
- UX de IA não é sobre fazer o modelo "parecer humano", mas sobre ser previsível e confiável
- Melhorias de acessibilidade devem ser verificáveis com ferramentas (ex: Lighthouse, axe)
