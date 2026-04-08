---
name: fastapi-ai-backend-backend
description: "Use when: building FastAPI backend for AI, creating AI service with FastAPI, Pydantic validation for AI, separating business logic from LLM calls, API design with AI endpoints, prompt versioning in backend, retry in FastAPI, AI endpoint structure"
applyTo: "docs/backend/08-fastapi-ai-backend/**"
---

# Backend de IA com FastAPI

## Objetivo
Ensinar como estruturar um serviço backend com IA usando FastAPI — com contratos de entrada/saída, separação entre lógica de negócio e chamadas ao modelo, tratamento de erros, versionamento de prompts e design de API.

## Escopo
**Entra:** Estrutura de serviço FastAPI com IA, Pydantic para contratos, separação de camadas, retentativas/timeout/tratamento de exceções, versionamento de prompts, design de endpoint com IA.

**Não entra:** Deploy e infraestrutura, autenticação e autorização em profundidade, bancos de dados (módulo 11), filas (módulo 12).

## Quando usar
Use este módulo quando o estudante precisar criar um endpoint HTTP que integra IA como componente — recebendo entrada do usuário, preparando o contexto, chamando o modelo e retornando uma resposta validada.

## Resultado esperado do módulo
O estudante consegue criar um endpoint FastAPI funcional que recebe texto, chama um LLM, valida a resposta com Pydantic e retorna um resultado bem estruturado — com tratamento de erros adequado.

## Conteúdos principais
1. Estrutura de projeto FastAPI para serviços de IA
2. Pydantic: modelos de entrada, saída e configuração
3. Separação de camadas: router → service → LLM client
4. Tratamento de erros: HTTPException, erros do LLM, validação
5. Retentativas e timeout no serviço
6. Versionamento de prompts: prompts como artefatos carregados no boot
7. Design de endpoint: síncrono vs. streaming
8. Testes de endpoint com IA mockada

## Estrutura sugerida da aula
1. Introdução — o que diferencia um backend de IA de um backend tradicional
2. Conceito — separação de camadas e contratos
3. Exemplo — endpoint completo de análise de texto
4. Prática — criar um endpoint funcional
5. Fechamento — checklist de qualidade de backend de IA

## Prática do módulo
**Exercício:** Crie um endpoint `POST /analyze` que receba `{"text": "..."}`, chame um LLM para classificar o sentimento, e retorne `{"sentiment": "...", "confidence": 0.0–1.0, "processing_time_ms": int}`. Implemente tratamento de erro para falhas do LLM.

**Critérios de validação:**
- O endpoint usa Pydantic para validar entrada e saída
- A chamada ao LLM está em uma camada separada (service ou client)
- O endpoint retorna HTTP 200 com resposta válida ou HTTP 500/503 em erro
- O tempo de processamento é medido e retornado

## Critérios mínimos de qualidade
- [ ] Modelos Pydantic definem contratos explícitos de entrada e saída
- [ ] LLM client é injetado (não instanciado dentro do endpoint)
- [ ] Erros de LLM retornam HTTP status codes apropriados
- [ ] Prompts são carregados de arquivos, não hardcoded em código
- [ ] Endpoint tem testes com LLM mockado

## Relações com outros módulos
- **Módulo 02 (llm-api-integration-core):** O LLM client encapsulado no serviço
- **Módulo 03 (prompt-engineering-core):** Prompts versionados carregados no serviço
- **Módulo 09 (context-memory-state-backend):** Estado de sessão integrado ao serviço
- **Módulo 14 (observability-otel-datadog-backend):** Instrumentação do endpoint

## Notas de consistência
- Estrutura de pastas: `routers/`, `services/`, `clients/`, `models/`, `prompts/`
- Sempre usar `response_model` no decorator do endpoint
- Erros de LLM nunca devem vazar detalhes internos na resposta HTTP
- Nomear serviços como `[dominio]_service.py` (ex: `analysis_service.py`)
