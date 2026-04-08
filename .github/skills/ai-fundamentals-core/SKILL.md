---
name: ai-fundamentals-core
description: "Use when: generating content for the AI fundamentals module, explaining LLMs for software engineers, covering what AI Engineering is, types of LLM applications, capabilities and limitations, non-determinism, cost/latency tradeoffs, common patterns (generation, classification, extraction, transformation, assistants, RAG), and initial architecture overview."
applyTo: "docs/core/01-ai-fundamentals/**"
---

# Fundamentos de Aplicações com IA

## Objetivo
Dar ao engenheiro uma visão real e honesta de AI Engineering: o que é, o que não é, como LLMs se encaixam em produtos, e quais são os limites práticos que todo sistema com IA enfrenta.

## Escopo

**Entra:**
- Diferença entre "usar IA" e "construir sistemas com IA"
- Tipos de aplicações com LLMs (geração, classificação, extração, transformação, assistentes, RAG)
- Capacidades reais e limitações dos modelos atuais
- Não determinismo e suas implicações de engenharia
- Custos, latência e janela de contexto como restrições de projeto
- Visão inicial da arquitetura de uma aplicação com IA

**Não entra:**
- Treinamento de modelos
- Fine-tuning
- Detalhes de implementação de API (cobertos no módulo 02)
- Engenharia de prompt avançada (módulo 03)
- Arquitetura detalhada de sistema (módulo 07)

## Quando usar
Quando for gerar conteúdo introdutório sobre AI Engineering, definindo o campo e estabelecendo o contexto para todos os módulos seguintes. Este é o módulo mais conceitual do curso.

## Resultado esperado do módulo
O aluno consegue:
- Explicar a diferença entre engenharia de software tradicional e AI Engineering
- Classificar uma ideia de produto em: precisa de IA / não precisa / poderia usar
- Descrever os 6 padrões principais de aplicações com LLM
- Articular 3 limitações reais de LLMs relevantes para engenharia
- Esboçar a arquitetura de alto nível de uma aplicação com IA

## Conteúdos principais
1. O que é AI Engineering (e o que não é)
2. LLMs como componentes de sistema, não como produto
3. Os 6 padrões de aplicação: geração, classificação, extração, transformação, assistentes, RAG
4. Capacidades reais: o que os modelos fazem bem
5. Limitações reais: não determinismo, alucinação, custo, latência, contexto
6. Trade-offs e decisões de projeto
7. Visão arquitetural de alto nível (frontend → backend → modelo)

## Estrutura sugerida da aula
1. **Introdução:** Por que este módulo existe? O que muda quando IA entra no produto?
2. **Conceito:** O que é AI Engineering vs. usar a API do ChatGPT
3. **Exemplo:** Um produto real analisado pela lente dos padrões
4. **Prática:** Analisar 5 ideias de produto e classificá-las
5. **Fechamento:** Checklist de decisão: quando usar IA e quando não usar

## Prática do módulo

**Exercício: Análise de adequação de IA**

Analise as 5 ideias de produto abaixo e para cada uma responda:
- Precisa de IA? Sim / Não / Talvez
- Se sim: qual padrão (geração, classificação, extração, transformação, assistente, RAG)?
- Se não: por que o problema é melhor resolvido sem IA?

Ideias:
1. Sistema que envia email de boas-vindas quando um usuário se cadastra
2. Ferramenta que resume documentos longos de contrato em bullet points
3. Calculadora de juros compostos
4. Chatbot que responde perguntas sobre o manual do produto usando o PDF do manual
5. Sistema que classifica tickets de suporte entre "urgente", "normal" e "baixa prioridade" com base no texto

**Critério de conclusão:** justificativa clara para cada decisão, usando pelo menos um conceito do módulo (limitação, padrão, custo/benefício).

## Critérios mínimos de qualidade
- Nenhuma promessa irreal sobre capacidades de IA
- Toda limitação mencionada deve ter impacto prático explicado
- Os 6 padrões devem ser apresentados com exemplo concreto cada
- A visão arquitetural deve mencionar pelo menos: frontend, backend, modelo, contexto
- Não usar o termo "inteligente" de forma vaga — descrever comportamento específico

## Relações com outros módulos
- **Módulo 02** (API Integration): amplia a visão de "como chamar modelos"
- **Módulo 03** (Prompt Engineering): aprofunda a camada de instrução
- **Módulo 07** (Arquitetura): expande a visão arquitetural introduzida aqui
- **Todos os módulos de backend:** constroem sobre os padrões introduzidos aqui

## Notas de consistência
- Usar "LLM" e não "AI" genericamente quando o assunto for especificamente modelos de linguagem
- "Não determinismo" é uma característica, não um bug — apresentar como restrição de engenharia
- Custos em tokens, não em dólares fixos (preços mudam; a unidade é tokens)
- Não mencionar frameworks específicos (LangChain, etc.) neste módulo — foco conceitual
- Consultar `glossary.md` para definições de: LLM, contexto, alucinação, RAG
