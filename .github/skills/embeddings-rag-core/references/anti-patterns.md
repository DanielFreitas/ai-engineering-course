# Anti-Padrões — Embeddings e RAG

## AP01: Chunks Muito Grandes ou Muito Pequenos
Usar chunks de tamanho não calibrado (ex: o documento inteiro como um chunk, ou frases isoladas). Chunks grandes diluem a relevância semântica; chunks muito pequenos perdem contexto. Calibre com base no tipo de conteúdo e consultas esperadas.

## AP02: Ignorar Metadados de Proveniência
Não armazenar a fonte de cada chunk. Sem metadados, é impossível rastrear de onde veio a informação, construir citações ou filtrar por data/fonte. Metadados são tão importantes quanto o conteúdo.

## AP03: Modelos de Embedding Diferentes para Indexação e Consulta
Usar um modelo para gerar embeddings dos documentos e outro para gerar o embedding da consulta. Isso resulta em espaços vetoriais incompatíveis e similaridades sem significado. Sempre use o mesmo modelo.

## AP04: Confiar no Retrieval Sem Validar Relevância
Injetar os chunks recuperados no prompt sem verificar se são realmente relevantes para a pergunta. Chunks irrelevantes no contexto podem confundir o modelo e levar a alucinações baseadas em contexto errado.

## AP05: Sem Threshold de Similaridade
Retornar resultados de retrieval independentemente do score de similaridade. Um score baixo significa que o documento não é relevante. Defina um threshold mínimo e trate o caso de "nenhum resultado relevante".

## AP06: Injetar Contexto Sem Delimitadores
Concatenar os chunks diretamente no prompt sem separadores claros. O modelo pode confundir contexto com instrução. Use delimitadores explícitos para marcar o início e fim do contexto injetado.

## AP07: Reindexar Documentos Desnecessariamente
Regenerar embeddings para todos os documentos a cada mudança de sistema. Embeddings de documentos que não mudaram são estáveis. Reindexe apenas o que mudou para economizar custo e tempo.

## AP08: RAG como Solução para Tudo
Usar RAG mesmo para perguntas que o modelo já sabe responder bem sem contexto externo, ou para dados que mudam em tempo real (o índice estará desatualizado). RAG introduz complexidade e latência; use apenas quando há conhecimento externo real a injetar.
