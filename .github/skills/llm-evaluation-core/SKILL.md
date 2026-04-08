---
name: llm-evaluation-core
description: "Use when: evaluating LLM output, creating test cases for AI, measuring relevance, measuring fidelity, prompt regression testing, LLM as judge, comparing prompt versions, building evaluation dataset, quality metrics for AI, AI benchmarking"
applyTo: "docs/core/05-llm-evaluation/**"
---

# Avaliação de LLMs

## Objetivo
Ensinar como avaliar sistematicamente outputs de LLMs — criando casos de teste, medindo relevância e fidelidade, realizando regressão de prompts e usando LLM-as-judge com cautela.

## Escopo
**Entra:** Critérios de avaliação ("parece bom" vs. "bom o suficiente"), casos de teste, avaliação por componente, avaliação end-to-end, métricas de relevância e fidelidade, regressão de prompt, LLM-as-judge com limitações, avaliação contínua.

**Não entra:** Fine-tuning e avaliação de modelos treinados, benchmarks de pesquisa, métricas BLEU/ROUGE em profundidade.

## Quando usar
Use este módulo quando o estudante precisar garantir que um componente de IA funciona de forma confiável, detectar regressões após mudanças de prompt e medir qualidade de forma reproduzível.

## Resultado esperado do módulo
O estudante consegue criar um conjunto de casos de teste para um componente de IA, medir relevância e fidelidade, comparar duas versões de prompt e identificar regressões automaticamente.

## Conteúdos principais
1. Por que avaliação é diferente em IA: não-determinismo, critérios subjetivos
2. "Parece bom" vs. "bom o suficiente": definindo critérios objetivos
3. Construção de casos de teste: entrada, saída esperada, critério de aprovação
4. Avaliação por componente: prompt, retrieval, pipeline completo
5. Avaliação end-to-end: fluxo completo do usuário
6. Métricas de relevância e fidelidade para RAG
7. LLM-as-judge: quando usar, limitações e vieses
8. Regressão de prompt: detectar deterioração após mudanças
9. Avaliação contínua em produção

## Estrutura sugerida da aula
1. Introdução — o custo de não avaliar
2. Conceito — tipos de avaliação e quando usar cada um
3. Exemplo — conjunto de testes para um componente de extração
4. Prática — criar e executar 5 casos de teste
5. Fechamento — quando a avaliação está boa o suficiente

## Prática do módulo
**Exercício:** Para um prompt de extração ou classificação criado no módulo 03, crie 5 casos de teste com entrada, saída esperada e critério de aprovação. Execute os casos e compare os resultados entre duas versões do prompt (original e uma versão melhorada).

**Critérios de validação:**
- 5 casos de teste documentados com entrada, saída esperada e critério claro
- Ambas as versões do prompt são executadas nos mesmos casos
- Os resultados são comparados de forma quantitativa (ex: X de 5 passou)
- Ao menos um caso de teste cobre uma entrada difícil ou ambígua

## Critérios mínimos de qualidade
- [ ] Casos de teste cobrem cenários típicos E casos extremos
- [ ] Critérios de aprovação são objetivos (não "parece certo")
- [ ] Resultado da avaliação é reproduzível (sem aleatoriedade não controlada)
- [ ] Existe pelo menos uma métrica de fidelidade para componentes RAG
- [ ] Avaliação pode ser executada automaticamente (ex: script Python)

## Relações com outros módulos
- **Módulo 03 (prompt-engineering-core):** Prompts versionados são o objeto da avaliação
- **Módulo 04 (embeddings-rag-core):** RAG é avaliado com métricas de relevância/fidelidade
- **Módulo 15 (llmops-lifecycle-backend):** Avaliação contínua como parte do ciclo de LLMOps

## Notas de consistência
- Nomear casos de teste como `test_[funcao]_[cenario]` (ex: `test_extract_price_decimal`)
- Documentar a metodologia de avaliação junto com os resultados
- LLM-as-judge deve usar temperatura 0.0 e justificativa obrigatória
- Distinguir claramente "avaliação offline" (experimento) de "avaliação online" (produção)
