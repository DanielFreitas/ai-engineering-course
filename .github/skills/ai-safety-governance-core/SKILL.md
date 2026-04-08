---
name: ai-safety-governance-core
description: "Use when: prompt injection, AI safety, input validation, output validation, guardrails, data leakage prevention, access control for AI, tool calling security, AI governance, misuse prevention, content filtering"
applyTo: "docs/core/06-ai-safety-governance/**"
---

# Segurança e Governança de IA

## Objetivo
Ensinar os princípios práticos de segurança em sistemas de IA — identificando riscos de injeção de prompt, vazamento de dados, uso indevido de ferramentas e estabelecendo governança mínima operacional.

## Escopo
**Entra:** Prompt injection, vazamento de dados, guardrails, validação de entrada e saída, uso seguro de contexto, riscos de tool calling, controle de acesso, governança mínima operacional.

**Não entra:** Segurança de infraestrutura em profundidade, conformidade regulatória (LGPD/GDPR), bias e fairness em modelos.

## Quando usar
Use este módulo quando o estudante precisar analisar riscos de segurança em um fluxo de IA, implementar controles mínimos e estabelecer práticas de governança antes de colocar um sistema em produção.

## Resultado esperado do módulo
O estudante consegue identificar os principais vetores de risco em um fluxo de IA, implementar guardrails básicos de entrada e saída e definir um conjunto mínimo de controles de governança.

## Conteúdos principais
1. Prompt injection: tipos (direto e indireto) e como mitigar
2. Vazamento de dados: informações sensíveis no contexto
3. Guardrails de entrada: bloqueio e sanitização
4. Guardrails de saída: validação antes de retornar ao usuário
5. Uso seguro de contexto: o que pode e o que não pode entrar no prompt
6. Riscos de tool calling: permissões, validação de parâmetros, reversibilidade
7. Controle de acesso: quem pode fazer o quê com o sistema de IA
8. Governança mínima: logging, audit trail, limites operacionais

## Estrutura sugerida da aula
1. Introdução — por que IA tem vetores de risco únicos
2. Conceito — tipos de ataques e falhas em sistemas de IA
3. Exemplo — análise de um fluxo vulnerável
4. Prática — identificar e mitigar riscos em um fluxo real
5. Fechamento — checklist de segurança mínima

## Prática do módulo
**Exercício:** Analise um fluxo de IA simples (ex: um chatbot que responde perguntas sobre produtos usando RAG) e identifique pelo menos 3 riscos de segurança ou confiabilidade. Para cada risco, descreva o vetor de ataque, o impacto potencial e uma mitigação concreta.

**Critérios de validação:**
- 3 riscos distintos identificados (não apenas variações do mesmo)
- Cada risco tem vetor de ataque, impacto e mitigação documentados
- Ao menos um risco cobre prompt injection
- Ao menos uma mitigação é implementável com código (não apenas processo)

## Critérios mínimos de qualidade
- [ ] Prompts de usuário são sanitizados antes de serem injetados no contexto
- [ ] Dados sensíveis não aparecem em logs ou respostas de erro
- [ ] Tool calling tem validação de parâmetros antes da execução
- [ ] Existe um limite de taxa (rate limit) para evitar abuso
- [ ] Audit log registra quem usou o sistema e o que foi gerado

## Relações com outros módulos
- **Módulo 02 (llm-api-integration-core):** Chaves de API e configuração segura do cliente
- **Módulo 10 (tool-calling-orchestration-backend):** Riscos específicos de ferramentas
- **Módulo 16 (operational-security-backend):** Segurança operacional em produção

## Notas de consistência
- Prompt injection sempre deve ser tratada como entrada não confiável
- Guardrails devem ser camadas independentes do prompt principal
- Logging de segurança deve registrar eventos sem dados sensíveis
- Usar termos: "vetor de ataque", "superfície de ataque", "mitigação", "guardrail"
