# Definições Compartilhadas

> Definições canônicas de conceitos que aparecem em múltiplos módulos. Estas definições prevalecem sobre qualquer texto gerado nas skills individuais.

## O que é "contexto" neste curso

**Contexto** tem dois significados distintos que devem ser diferenciados explicitamente:

1. **Contexto de inferência** (`context window`): os tokens que o modelo recebe em uma única chamada. Inclui system prompt, histórico, resultados de RAG e ferramentas.

2. **Contexto de aplicação** (`application context`): o estado acumulado de uma sessão ou tarefa, que pode exceder a janela de inferência e precisa ser gerenciado (truncamento, sumarização, persistência).

Quando o módulo falar de "gestão de contexto", refere-se ao contexto de aplicação (2). Quando falar de "janela de contexto", refere-se ao contexto de inferência (1).

---

## O que é "estado" neste curso

**Estado** é qualquer informação que precisa ser preservada entre duas operações ou interações. Pode ser:

- **Conversacional:** histórico de mensagens da sessão ativa
- **De tarefa:** progresso de um job de longa duração
- **De usuário:** preferências, memória longa, perfil
- **De sistema:** configurações, versões, flags de feature

Módulos que tratam de estado devem especificar qual tipo estão abordando.

---

## O que é "memória" neste curso

**Memória** é um subconjunto de estado com semântica específica de recuperação e relevância para a resposta do modelo. Divide-se em:

- **Memória curta (short-term):** histórico ativo da sessão; descartado ao fim da conversa
- **Memória longa (long-term):** informação persistida e recuperada via RAG ou busca direta; sobrevive entre sessões

Não usar "memória" como sinônimo genérico de "banco de dados".

---

## O que é "agente" neste curso

**Agente** é um sistema que usa um LLM para tomar decisões em múltiplos passos, com possibilidade de usar ferramentas e adaptar comportamento com base em resultados intermediários.

Um agente tem:
- Loop de execução (raciocínio → ação → observação → repetir)
- Acesso a pelo menos uma ferramenta
- Critério de parada (objetivo atingido ou falha)

**Não é agente:** uma chamada única a um modelo, mesmo com tool calling, se não há loop.

---

## O que é "orquestração" neste curso

**Orquestração** é a coordenação de múltiplos componentes (modelos, ferramentas, serviços) em um fluxo com ordem, condições e tratamento de erros definidos.

Pode ser:
- **Simples (chain):** A → B → C, sem ramificação
- **Condicional:** lógica de roteamento baseada em saída do modelo ou regra de negócio
- **Agêntica:** o modelo decide a próxima ação com base no estado atual

---

## Stack canônica do curso

Esta é a stack de referência. Skills e módulos devem se alinhar a ela, exceto quando explicitamente documentado em `architecture-decisions.md`.

| Componente | Escolha canônica | Alternativas mencionáveis |
|------------|-----------------|--------------------------|
| Linguagem backend | Python 3.11+ | — |
| Framework backend | FastAPI | — |
| Validação | Pydantic v2 | — |
| LLM primário | OpenAI GPT-4o | Anthropic Claude, Google Gemini |
| Embeddings | OpenAI text-embedding-3-small | — |
| Busca vetorial | pgvector (Postgres) | Pinecone, Weaviate, Qdrant |
| Cache | Redis | — |
| Banco relacional | PostgreSQL | — |
| Banco de documentos | MongoDB | — |
| Observabilidade | OpenTelemetry → Datadog | — |
| Async/mensageria | Google Cloud Pub/Sub (abstrato) | RabbitMQ, Kafka, SQS |
| Frontend | React + TypeScript | — |
| Streaming | Server-Sent Events (SSE) | WebSocket |
| CI/CD | GitHub Actions | — |

---

## Convenções de código

- **Python:** snake_case para variáveis e funções, PascalCase para classes, SCREAMING_SNAKE_CASE para constantes
- **TypeScript:** camelCase para variáveis e funções, PascalCase para tipos e componentes
- **Nomes de arquivos Python:** snake_case (ex: `llm_client.py`)
- **Nomes de arquivos TypeScript:** kebab-case (ex: `use-chat-stream.ts`) ou PascalCase para componentes
- **Variáveis de ambiente:** sempre via `os.environ.get()`, nunca hardcoded
- **API Keys:** nunca no código; sempre em `.env` com `.gitignore` configurado

---

## Relações entre módulos — mapa de dependências

```
01-ai-fundamentals ──────────── base para tudo
02-llm-api-integration ──────── base para 03, 08, 09, 10
03-prompt-engineering ───────── base para 04, 05, 08
04-embeddings-rag ───────────── base para 09, 11
05-llm-evaluation ───────────── informa 15 (LLMOps)
06-ai-safety-governance ─────── informa 16 (segurança operacional)
07-ai-architecture ──────────── síntese do núcleo; base para all trilhas

08-fastapi-ai-backend ───────── base para 09, 10, 11, 12, 13, 14
09-context-memory-state ─────── relacionado a 11 (persistência)
10-tool-calling ─────────────── relacionado a 16 (segurança operacional)
11-persistence-context ──────── relacionado a 09 (memória)
14-observability ────────────── relacionado a 20 (telemetria)
15-llmops ───────────────────── informa 05 (avaliação)
16-operational-security ─────── relacionado a 06 (governança) e 10 (tool calling)

17-react-ai-frontend ────────── relacionado a 08 (contratos de API)
19-frontend-backend-integration ─ relacionado a 12 (async), 08 (API)
20-experience-telemetry ─────── relacionado a 14 (observabilidade)
```
