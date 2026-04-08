---
name: llmops-lifecycle-backend
description: "Use when: LLMOps, versioning AI model, gradual rollout AI feature, fallback for LLM, A/B test prompts, rollback AI deployment, monitoring AI in production, multi-model strategy, cost as architecture criterion, canary deployment AI"
applyTo: "docs/backend/15-llmops-lifecycle/**"
---

# LLMOps e Ciclo de Vida de IA

## Objetivo
Ensinar práticas de LLMOps para gerenciar o ciclo de vida de features de IA em produção — versionamento, rollout gradual, fallback, multi-model, A/B testing, rollback e monitoramento contínuo.

## Escopo
**Entra:** Versionamento de prompts e modelos, rollout gradual, fallback, estratégias multi-model, A/B testing, rollback, monitoramento contínuo, custo como critério arquitetural.

**Não entra:** MLOps para modelos treinados, CI/CD de infraestrutura, fine-tuning.

## Quando usar
Use este módulo quando o estudante precisar gerenciar mudanças em produção para sistemas de IA — trocando modelos, atualizando prompts ou lançando novas capacidades com segurança.

## Resultado esperado do módulo
O estudante consegue definir um plano de rollout e rollback para uma feature de IA, implementar uma estratégia de fallback simples e medir o impacto de uma mudança antes de promover para 100% dos usuários.

## Conteúdos principais
1. Por que LLMOps é diferente de DevOps tradicional
2. Versionamento de prompts e modelos: cada mudança é rastreável
3. Rollout gradual: feature flags, canary, porcentagem de tráfego
4. Fallback: quando o modelo principal falha, o que acontece?
5. Estratégias multi-model: primário + fallback + avaliador
6. A/B testing com LLMs: métricas e duração mínima
7. Rollback: critérios e procedimento
8. Monitoramento contínuo: o que observar após um deploy

## Estrutura sugerida da aula
1. Introdução — o que pode dar errado ao trocar um modelo
2. Conceito — ciclo de vida de uma feature de IA
3. Exemplo — plano de rollout de uma troca de modelo
4. Prática — definir plano de rollout e fallback
5. Fechamento — custo como critério arquitetural

## Prática do módulo
**Exercício:** Para uma feature de IA existente (real ou simulada), defina um plano de rollout que inclua: critérios de promoção (de 10% para 100%), métricas de sucesso, critérios de rollback e procedimento de fallback para o modelo anterior. Documente o plano em um formato estruturado.

**Critérios de validação:**
- Plano inclui critérios quantitativos de promoção (ex: "error rate < 1%")
- Critérios de rollback são objetivos e automatizáveis
- Fallback está mapeado para um modelo ou versão específica
- Métricas de custo (tokens/requisição) fazem parte do plano

## Critérios mínimos de qualidade
- [ ] Toda mudança de prompt ou modelo tem versão documentada
- [ ] Feature flags controlam qual versão serve cada segmento de tráfego
- [ ] Rollback pode ser executado em menos de 5 minutos
- [ ] Métricas de sucesso são definidas antes do rollout (não depois)
- [ ] Custo por requisição é monitorado como métrica de primeiro nível

## Relações com outros módulos
- **Módulo 05 (llm-evaluation-core):** Avaliação contínua como parte do ciclo
- **Módulo 14 (observability-otel-datadog-backend):** Métricas que guiam decisões de LLMOps
- **Módulo 16 (operational-security-backend):** Segurança operacional durante rollouts

## Notas de consistência
- Versões de prompt: `v1.0.0`, `v1.1.0` — seguir semver
- Feature flags: nomear como `[feature]_model_version` ou `[feature]_prompt_version`
- Critérios de rollback documentados no mesmo artefato que os critérios de promoção
- "Fallback" sempre aponta para uma versão testada e conhecida, nunca para "nada"
