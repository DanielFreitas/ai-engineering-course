---
name: llm-api-integration-core
description: "Use when: integrating LLM API, calling OpenAI API, calling language model, handling tokens, managing context window, streaming response, structured output from model, comparing LLM providers, handling API errors, retry logic for LLM, calculating cost per token"
applyTo: "docs/core/02-llm-api-integration/**"
---

# Integração com APIs de LLMs

## Objetivo
Ensinar como integrar modelos de linguagem via API de forma funcional, controlada e observável — cobrindo mensagens, contexto, tokens, custo, latência, parâmetros de geração, saídas estruturadas, streaming, retentativas e tratamento de erros.

## Escopo
**Entra:** Chamadas à API de provedores como OpenAI, Anthropic e Google; configuração de parâmetros como `temperature`, `max_tokens`, `top_p`; uso de mensagens estruturadas (system, user, assistant); streaming via SSE; saídas estruturadas com JSON schema; tratamento de erros e retentativas; comparação de provedores.

**Não entra:** Fine-tuning de modelos, treinamento, embeddings (coberto no módulo 04), orquestração com agentes (cobertos nos módulos 07/10).

## Quando usar
Use este módulo quando o estudante precisar integrar um modelo de linguagem como componente de software — chamando a API corretamente, gerenciando tokens/custos, e produzindo respostas confiáveis e previsíveis.

## Resultado esperado do módulo
O estudante consegue fazer uma chamada real a uma API de LLM, configurar parâmetros adequadamente, obter uma resposta estruturada em JSON, tratar erros e retentativas, e calcular o custo estimado de uma operação.

## Conteúdos principais
1. Anatomia de uma chamada de API: `messages`, `model`, `temperature`, `max_tokens`
2. Papéis de mensagem: `system`, `user`, `assistant`
3. Tokens: contagem, janela de contexto, custo por token
4. Parâmetros de geração: `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`
5. Saídas estruturadas: JSON mode e function calling básico
6. Streaming com Server-Sent Events (SSE)
7. Retentativas com backoff exponencial e timeout
8. Tratamento de erros: rate limit, timeout, invalid request
9. Comparação de provedores: OpenAI, Anthropic, Google Gemini

## Estrutura sugerida da aula
1. Introdução — o modelo como componente de software
2. Conceito — como funciona uma chamada de API e o papel dos tokens
3. Exemplo — chamada completa com parâmetros e resposta estruturada
4. Prática — exercício guiado com validação
5. Fechamento — checklist de qualidade e armadilhas comuns

## Prática do módulo
**Exercício:** Faça uma chamada à API de um LLM que receba um texto curto e retorne um JSON com os campos `sentimento` (positivo/negativo/neutro), `confianca` (0.0–1.0) e `resumo` (máximo 50 palavras).

**Critérios de validação:**
- A resposta é um JSON válido com os três campos esperados
- O campo `confianca` é um número entre 0 e 1
- O código implementa pelo menos uma retentativa em caso de erro
- O custo estimado da chamada é calculado (tokens × preço por token)

## Critérios mínimos de qualidade
- [ ] Parâmetros de geração justificados (por que esse `temperature`?)
- [ ] Tratamento explícito de pelo menos 3 tipos de erro (rate limit, timeout, invalid)
- [ ] Saída estruturada validada antes de retornar ao chamador
- [ ] Streaming implementado quando a resposta pode ser longa
- [ ] Custo e latência logados para cada chamada

## Relações com outros módulos
- **Módulo 01 (ai-fundamentals-core):** Base conceitual sobre LLMs necessária antes deste módulo
- **Módulo 03 (prompt-engineering-core):** Construção dos prompts que serão enviados via API
- **Módulo 05 (llm-evaluation-core):** Avaliação das respostas obtidas via API
- **Módulo 08 (fastapi-ai-backend-backend):** Encapsulamento das chamadas de API em serviço backend

## Notas de consistência
- Usar sempre `client.chat.completions.create()` (OpenAI SDK v1+), nunca a API legada
- Nomear variáveis de custo como `estimated_cost_usd` para clareza
- Sempre logar `prompt_tokens`, `completion_tokens` e `total_tokens`
- Preferir `response_format={"type": "json_object"}` para saídas estruturadas simples
- Documentar o modelo exato usado (ex: `gpt-4o-mini-2024-07-18`) para reprodutibilidade
