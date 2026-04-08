---
name: redis-performance-backend
description: "Use when: caching LLM response, Redis for AI, semantic cache, context cache, reducing LLM cost with cache, response reuse, cache invalidation for AI, performance optimization AI backend, TTL for AI responses"
applyTo: "docs/backend/13-redis-performance/**"
---

# Redis e Performance com Cache

## Objetivo
Ensinar como usar Redis para otimizar performance e reduzir custo em sistemas de IA — cobrindo cache tradicional, cache de resposta, cache de contexto, cache semântico e estratégias de invalidação.

## Escopo
**Entra:** Cache tradicional, cache de resposta de LLM, cache de contexto, cache semântico, invalidação, reutilização de resultados, impacto em custo e performance.

**Não entra:** Redis como fila de mensagens (módulo 12), armazenamento permanente de vetores, configuração de cluster Redis.

## Quando usar
Use este módulo quando o estudante precisar reduzir latência ou custo em operações repetidas de IA — identificando quais resultados são seguros para reutilizar e por quanto tempo.

## Resultado esperado do módulo
O estudante consegue adicionar cache a uma chamada de LLM ou retrieval — definindo TTL, chave de cache e estratégia de invalidação — e medir o impacto em latência e custo.

## Conteúdos principais
1. Por que cache em sistemas de IA: custo e latência
2. Cache tradicional com Redis: `GET`/`SET`/`TTL` básico
3. Cache de resposta de LLM: quando é seguro reutilizar
4. Cache de contexto: armazenar embeddings calculados
5. Cache semântico: reutilizar respostas para perguntas semanticamente similares
6. Chaves de cache: como construir chaves determinísticas
7. Invalidação: TTL, invalidação ativa, cache bust por versão de prompt
8. Impacto em custo: medir antes e depois

## Estrutura sugerida da aula
1. Introdução — operações de IA são caras e frequentemente repetidas
2. Conceito — tipos de cache e quando cada um se aplica
3. Exemplo — cache de resposta para perguntas frequentes
4. Prática — adicionar cache a uma chamada existente
5. Fechamento — riscos do cache em sistemas de IA

## Prática do módulo
**Exercício:** Adicione cache Redis a uma chamada de LLM repetida (ex: classificação de texto). Use o hash do prompt como chave de cache com TTL de 1 hora. Meça e compare latência e custo com e sem cache para 10 chamadas idênticas.

**Critérios de validação:**
- A segunda chamada com o mesmo prompt retorna do cache (sem chamar a API)
- A chave de cache é determinística para a mesma entrada
- O TTL está configurado de forma apropriada para o caso de uso
- A latência da chamada cacheada é significativamente menor

## Critérios mínimos de qualidade
- [ ] Chaves de cache incluem versão do prompt para invalidação controlada
- [ ] TTL é definido com base na natureza dos dados (não hardcoded como "1 dia")
- [ ] Cache miss e hit são diferenciados nos logs e métricas
- [ ] Cache não é usado para outputs que devem ser únicos por usuário sem incluir user_id
- [ ] Estratégia de invalidação em atualização de prompt está documentada

## Relações com outros módulos
- **Módulo 02 (llm-api-integration-core):** Chamadas que podem ser cacheadas
- **Módulo 04 (embeddings-rag-core):** Cache de embeddings calculados
- **Módulo 08 (fastapi-ai-backend-backend):** Cache integrado ao serviço
- **Módulo 14 (observability-otel-datadog-backend):** Métricas de hit/miss rate

## Notas de consistência
- Chaves de cache: `llm:response:[hash_do_prompt]`, `embed:[hash_do_texto]`
- Sempre logar se o resultado veio do cache ou foi calculado
- Não fazer cache de respostas que variam por usuário sem incluir user_id na chave
- Documentar qual TTL foi escolhido e por quê
