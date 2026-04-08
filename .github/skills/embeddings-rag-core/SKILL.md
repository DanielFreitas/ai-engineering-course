---
name: embeddings-rag-core
description: "Use when: implementing RAG, retrieval augmented generation, vector search, semantic search, text embeddings, chunking strategy, document indexing, context retrieval, hybrid search, reranking, grounding LLM response, vector database"
applyTo: "docs/core/04-embeddings-rag/**"
---

# Embeddings e RAG

## Objetivo
Ensinar como usar embeddings para busca semântica e como construir um pipeline de Retrieval-Augmented Generation (RAG) funcional, cobrindo chunking, indexação, recuperação e reranking.

## Escopo
**Entra:** Embeddings de texto, similaridade semântica, estratégias de chunking, metadados, grounding, recuperação de contexto, busca vetorial/lexical/híbrida, reranking, falhas comuns em RAG.

**Não entra:** Fine-tuning de modelos de embedding, bancos de dados vetoriais de produção em profundidade (coberto no módulo 11), avaliação de RAG (coberto no módulo 05).

## Quando usar
Use este módulo quando o estudante precisar fornecer ao modelo contexto externo relevante — seja de documentos, base de conhecimento, histórico ou dados proprietários — usando busca semântica.

## Resultado esperado do módulo
O estudante consegue indexar documentos como embeddings, fazer uma busca semântica e usar os resultados como contexto para uma chamada de LLM, produzindo uma resposta fundamentada no documento.

## Conteúdos principais
1. O que são embeddings: representação vetorial de significado
2. Similaridade semântica: cosine similarity e distância euclidiana
3. Estratégias de chunking: por parágrafo, por token, por sentença, overlapping
4. Metadados nos chunks: fonte, data, seção, relevância
5. Grounding: como injetar contexto no prompt do modelo
6. Busca vetorial vs. lexical (BM25) vs. híbrida
7. Reranking: melhorar relevância pós-recuperação
8. Falhas comuns de RAG: chunk errado recuperado, contexto irrelevante, alucinação sobre o documento

## Estrutura sugerida da aula
1. Introdução — limitações do LLM sem contexto externo
2. Conceito — pipeline de RAG: indexação e recuperação
3. Exemplo — indexar um conjunto de documentos e responder perguntas
4. Prática — exercício de indexação e recuperação
5. Fechamento — checklist de qualidade de RAG

## Prática do módulo
**Exercício:** Indexe 5–10 parágrafos de um texto qualquer como embeddings. Faça uma pergunta em linguagem natural e recupere o chunk mais relevante. Use o chunk como contexto para gerar uma resposta com um LLM.

**Critérios de validação:**
- Os chunks são gerados e indexados corretamente
- A busca retorna o chunk mais semanticamente relevante para a pergunta
- O modelo usa o contexto recuperado na resposta (não alucina informação ausente)
- A fonte do contexto é identificável (metadado de origem)

## Critérios mínimos de qualidade
- [ ] Estratégia de chunking documentada e justificada
- [ ] Metadados de origem preservados em cada chunk
- [ ] Contexto recuperado injetado de forma clara no prompt
- [ ] Estratégia de fallback quando nenhum chunk relevante é encontrado
- [ ] Falhas de recuperação logadas para análise posterior

## Relações com outros módulos
- **Módulo 02 (llm-api-integration-core):** O contexto recuperado é enviado via API ao LLM
- **Módulo 03 (prompt-engineering-core):** O template de prompt deve acomodar o contexto injetado
- **Módulo 05 (llm-evaluation-core):** Métricas de relevância e fidelidade avaliam o pipeline RAG
- **Módulo 11 (persistence-context-backend):** Armazenamento de vetores em banco de dados

## Notas de consistência
- Chunks devem ter tamanho entre 200–500 tokens por padrão; documentar o motivo da escolha
- Sempre usar o mesmo modelo de embedding para indexação e para consultas
- Nomear funções como `embed_text()`, `retrieve_chunks()`, `build_context_prompt()`
- Distinguir claramente "retrieval score" (similaridade) de "relevance" (julgamento humano)
