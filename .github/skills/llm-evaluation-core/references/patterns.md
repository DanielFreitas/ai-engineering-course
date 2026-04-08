# Padrões — Avaliação de LLMs

## P01: Casos de Teste com Critério Objetivo
Cada caso de teste deve ter: entrada, saída esperada e critério de aprovação explícito e objetivo (ex: "campo `preco` é um float positivo", não "parece correto"). Critérios vagos tornam a avaliação subjetiva e não reproduzível.

## P02: Cobertura de Casos Extremos
O conjunto de testes deve cobrir explicitamente casos extremos: entrada vazia, entrada ambígua, entrada em idioma inesperado, valores limite. Casos típicos validam a funcionalidade; casos extremos detectam fragilidades.

## P03: Avaliação Isolada por Componente
Avalie cada componente do pipeline separadamente (ex: qualidade do retrieval, qualidade do prompt, qualidade end-to-end). Isso facilita identificar onde está o problema quando a avaliação end-to-end falha.

## P04: Temperatura Zero para Avaliação Reproduzível
Execute avaliações com `temperature=0.0` para garantir resultados reproduzíveis. Avaliações com alta temperatura podem passar ou falhar de forma aleatória, tornando impossível detectar regressões reais.

## P05: LLM-as-Judge com Justificativa Obrigatória
Quando usar um LLM para avaliar respostas, exija que ele forneça justificativa antes do veredito (chain-of-thought). Isso reduz vieses e torna as avaliações auditáveis. Nunca use LLM-as-judge como única fonte de verdade.

## P06: Baseline Documentado
Antes de qualquer mudança em prompt ou modelo, registre os resultados atuais como baseline. Toda mudança deve comparar contra o baseline. Sem baseline, é impossível saber se uma mudança melhorou ou piorou.

## P07: Dataset de Avaliação Versionado
Mantenha o dataset de avaliação como artefato versionado no repositório. Adicionar ou remover casos de teste é uma mudança de código com revisão. Isso evita "aparelhar" o modelo para o dataset de avaliação.

## P08: Métricas Separadas para Componentes RAG
Em pipelines RAG, meça relevância (o chunk certo foi recuperado?) e fidelidade (a resposta é baseada no contexto?) separadamente. Falhar em um componente não significa falhar no outro.
