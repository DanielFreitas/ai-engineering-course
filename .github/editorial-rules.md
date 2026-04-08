# Regras Editoriais

> Documento de referência para geração consistente de conteúdo em todos os 20 módulos.

## Tom e Voz

- **Direto e técnico** — sem rodeios, sem metáforas forçadas
- **Pragmático** — cada conceito deve ter uso real explicitado
- **Honesto sobre limitações** — LLMs têm limitações reais; o curso não as esconde
- **Voz ativa** — "o modelo gera", não "é gerado pelo modelo"
- Evitar: jargão marketeiro ("revolucionário", "poderoso"), antropomorfismo excessivo, promessas vagas

## Profundidade

- **Nível assumido:** engenheiro com 2+ anos de experiência em desenvolvimento, sem experiência com LLMs
- Conceitos de CS básicos (HTTP, banco de dados, APIs) são assumidos
- Matemática de ML **não** é pré-requisito — quando necessária, explicar em termos práticos
- **Profundidade suficiente para implementar**, não para pesquisar

## Estrutura de cada módulo

Todo módulo deve seguir esta ordem:
1. **Objetivo** — o que o aluno conseguirá fazer (1-2 frases)
2. **Conceito central** — explicação do tema principal com exemplo concreto
3. **Conteúdos** — sub-tópicos na ordem de progressão natural
4. **Prática** — exercício simples, independente, com critério de validação
5. **Checklist / resumo** — pontos-chave para fixação

## Regras de Exemplo

- Todo exemplo de código deve ser **executável** ou claramente indicado como pseudocódigo
- Exemplos Python devem usar tipagem explícita (type hints)
- Exemplos de API devem usar `httpx` ou `requests` (não `curl` como principal)
- Nomes de variáveis em inglês; comentários em português
- Evitar exemplos triviais demais ("Hello World com LLM") — ter contexto realista

## Linguagem e Vocabulário

- Consultar `glossary.md` antes de introduzir qualquer termo técnico
- Termos novos em **negrito** na primeira ocorrência, com definição imediata
- Siglas na primeira ocorrência: "RAG (Retrieval-Augmented Generation)"
- Manter vocabulário consistente entre módulos — não usar sinônimos aleatórios para o mesmo conceito

## Práticas dos Módulos

Toda prática deve ser:
- **Simples** — realizável em menos de 30 minutos
- **Independente** — não depende de módulo anterior ou posterior
- **Verificável** — tem critério claro de "funcionou"
- **Sem mini-projeto** — não é uma aplicação completa; é um exercício focado
- **Auto-contida** — inclui todos os imports, dados e instruções necessárias

## O que NÃO fazer

- Não criar conteúdo que contradiga decisões em `architecture-decisions.md`
- Não introduzir ferramentas fora da stack definida sem justificativa explícita
- Não repetir conteúdo de módulo anterior sem referência cruzada explícita
- Não deixar seção "em construção" sem ao menos o esqueleto preenchido
- Não usar tabs — usar 4 espaços em Python, 2 espaços em TypeScript/JSON

## Referências Cruzadas

- Ao mencionar conceito de outro módulo, usar: `> Ver: [Nome do Módulo](../caminho)`
- Ao ampliar conceito de módulo anterior, usar: `> Ampliação de: [Nome do Módulo](../caminho)`
- Manter consistência com as decisões registradas em `architecture-decisions.md`

## Stack de referência do curso

| Camada | Tecnologia principal |
|--------|---------------------|
| Linguagem backend | Python 3.11+ |
| Framework backend | FastAPI + Pydantic v2 |
| Modelos | OpenAI API (GPT-4o) como referência; agnóstico quando possível |
| Busca vetorial | pgvector (Postgres) como primário; menção a alternativas |
| Cache | Redis |
| Observabilidade | OpenTelemetry + Datadog |
| Async/Pub/Sub | Cloud Pub/Sub ou equivalente (abstraído) |
| Frontend | React + TypeScript |
| Streaming frontend | Server-Sent Events (SSE) como primário |
