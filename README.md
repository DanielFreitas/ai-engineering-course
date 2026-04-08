# AI Engineering Course

> **Do fundamento à operação** — LLMs, backend e frontend com IA em produção.

Curso prático em português com 20 módulos progressivos cobrindo toda a stack necessária para construir e operar sistemas de IA reais: da integração com LLMs ao LLMOps, passando por FastAPI, pgvector, Redis, OpenTelemetry e React.

🌐 **[danielfreitas.github.io/ai-engineering-course](https://danielfreitas.github.io/ai-engineering-course/)**

---

## Trilhas

| # | Trilha | Módulos |
|---|--------|---------|
| 🧠 | **Núcleo** | 01 AI Fundamentals · 02 LLM API Integration · 03 Prompt Engineering · 04 Embeddings & RAG · 05 LLM Evaluation · 06 AI Safety & Governance · 07 AI Architecture |
| ⚙️ | **Backend** | 08 FastAPI AI Backend · 09 Context & Memory · 10 Tool Calling · 11 Persistence · 12 Pub/Sub Async · 13 Redis Performance · 14 OTel + Datadog · 15 LLMOps · 16 Operational Security |
| 🖥️ | **Frontend** | 17 React AI Frontend · 18 AI UX Quality · 19 Frontend Integration · 20 Experience Telemetry |

## Stack

`Python 3.11+` `FastAPI` `Pydantic v2` `OpenAI GPT-4o` `pgvector` `Redis` `OpenTelemetry` `Datadog` `GCP Pub/Sub` `React` `TypeScript` `SSE`

---

## Desenvolvimento local

**Pré-requisito:** Node.js 20+

```bash
npm install
npm start        # http://localhost:3000 com hot reload
```

```bash
npm run build    # build de produção → ./build
npm run serve    # preview do build local
npm run typecheck
```

## CI/CD

| Evento | Workflow | Ação |
|--------|----------|------|
| Push em `master` | `deploy.yml` | Build + deploy no GitHub Pages |
| Pull request para `master` | `ci.yml` | Typecheck + build (validação) |

Os workflows ficam em [`.github/workflows/`](.github/workflows/).

## Estrutura

```
docs/
  core/        # módulos 01-07
  backend/     # módulos 08-16
  frontend/    # módulos 17-20
src/
  pages/       # homepage
  css/         # tema global
.github/
  skills/      # contratos de qualidade por módulo
  workflows/   # GitHub Actions
```

## Licença

MIT
