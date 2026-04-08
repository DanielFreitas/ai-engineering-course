# Padrões — Embeddings e RAG

## P01: Metadados Ricos nos Chunks
Armazene junto com cada chunk: fonte (arquivo/URL), posição no documento, data de criação e qualquer metadado de negócio relevante. Metadados permitem filtrar resultados, rastrear proveniência e construir citações na resposta.

## P02: Estratégia de Chunking Justificada
Documente por que a estratégia de chunking foi escolhida (por parágrafo, por token, sliding window). Chunking inadequado é a causa mais comum de recuperação ruim. Teste com perguntas reais antes de escolher a estratégia.

## P03: Mesmo Modelo para Indexação e Consulta
Sempre use o mesmo modelo de embedding para gerar os vetores dos documentos e para gerar o vetor da consulta. Modelos diferentes produzem espaços vetoriais incompatíveis, tornando a similaridade sem sentido.

## P04: Fallback para "Sem Contexto Relevante"
Implemente uma lógica explícita para quando o retrieval não encontra nenhum chunk com similaridade acima de um threshold. Nesse caso, o modelo deve informar ao usuário que não tem informação suficiente, não alucinar.

## P05: Injeção de Contexto com Delimitadores
Injete os chunks recuperados no prompt usando delimitadores claros (ex: `<contexto>`, `<fonte>`). Isso separa visualmente o contexto das instruções e facilita que o modelo identifique o que é dado externo.

## P06: Limite de Chunks por Chamada
Defina um número máximo de chunks a injetar por chamada (ex: 3–5). Mais chunks significa mais tokens e custo. Prefira qualidade (reranking) sobre quantidade. Sempre caiba no contexto do modelo.

## P07: Busca Híbrida para Melhor Cobertura
Combine busca vetorial (semântica) com busca lexical (BM25/keyword) para cobrir tanto perguntas conceituais quanto perguntas com termos específicos. A combinação geralmente supera qualquer abordagem isolada.

## P08: Reranking Pós-Retrieval
Após recuperar os K chunks candidatos com busca vetorial, aplique um modelo de reranking para reordenar por relevância real. O custo adicional do reranking é compensado pela melhora na qualidade da resposta.
