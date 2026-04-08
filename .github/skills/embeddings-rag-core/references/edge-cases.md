# Casos de Borda — Embeddings e RAG

## EC01: Consulta Sem Contexto Relevante
Nenhum chunk recuperado supera o threshold de similaridade. O sistema deve responder que não há informação suficiente, não tentar responder com base no conhecimento interno do modelo (o que produziria alucinação).

## EC02: Documento Muito Longo para um Único Chunk
Documentos maiores que o tamanho máximo de chunk precisam ser divididos. A estratégia de divisão (por caractere, token, parágrafo) impacta a qualidade do retrieval. Chunks gerados pela divisão devem ter overlap para preservar contexto entre fronteiras.

## EC03: Perguntas Multi-Partes
Uma pergunta como "Qual o preço e a disponibilidade do produto X?" pode precisar de chunks diferentes para cada parte. Verifique se o retrieval retorna contexto para todas as sub-perguntas, não apenas para a mais prominent.

## EC04: Documentos Desatualizados no Índice
O índice pode conter versões antigas de documentos que foram atualizados. Implemente estratégia de reindexação incremental e inclua timestamps nos metadados para que o modelo possa identificar informação potencialmente desatualizada.

## EC05: Idiomas Mistos
Documentos em múltiplos idiomas no mesmo índice podem causar recuperação inconsistente. Modelos de embedding multilíngues funcionam melhor, mas podem ter scores de similaridade diferentes por idioma. Teste comportamento para cada idioma suportado.

## EC06: Consultas Muito Curtas ou Vagas
Perguntas de uma palavra (ex: "preço?") têm vetores de embedding de baixa especificidade. O retrieval pode retornar resultados irrelevantes. Implemente enriquecimento de consulta (query expansion) para perguntas muito curtas.

## EC07: Chunks com Conteúdo Muito Similar
Múltiplos chunks com conteúdo quase idêntico (ex: FAQ duplicado) podem dominar os top-K resultados. Implemente deduplicação pós-retrieval ou diversificação de resultados para cobrir diferentes aspectos da consulta.

## EC08: Tamanho do Contexto Excedido
O total de tokens dos chunks recuperados mais o prompt pode exceder a janela de contexto do modelo. Implemente verificação de tamanho antes de montar o prompt e descarte os chunks de menor score quando necessário.
