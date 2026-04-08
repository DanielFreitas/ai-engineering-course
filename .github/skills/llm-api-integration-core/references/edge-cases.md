# Casos de Borda — Integração com APIs de LLMs

## EC01: Resposta Vazia ou Nula
O modelo pode retornar `finish_reason: "stop"` com conteúdo vazio ou `None`. Sempre verifique se `response.choices[0].message.content` existe e não é vazio antes de processar.

## EC02: JSON Parcialmente Válido com Streaming
Em modo streaming, o JSON pode chegar incompleto entre chunks. Sempre acumule o stream completo antes de fazer `json.loads()`, ou use um parser incremental de JSON.

## EC03: `finish_reason: "length"`
Quando `max_tokens` é atingido, a resposta é truncada. Um JSON estruturado truncado resultará em erro de parse. Detecte esse caso e trate-o (repetir com prompt reduzido ou retornar erro controlado).

## EC04: Rate Limit em Pico de Uso
Em produção, múltiplas requisições simultâneas podem atingir limites de RPM (requests per minute) ou TPM (tokens per minute). Implemente filas ou circuit breakers para absorver picos sem falhar em cascata.

## EC05: Modelo Fora do Ar ou Depreciado
Provedores podem deprecar versões de modelo sem aviso imediato. Tenha um modelo de fallback configurado e monitore erros do tipo `model_not_found` em produção.

## EC06: Resposta com Markdown Indesejado
Mesmo com JSON mode ativo, alguns modelos podem envolver o JSON em blocos de código Markdown (` ```json ... ``` `). Implemente extração robusta que trate esse caso específico.

## EC07: System Prompt Muito Longo
System prompts muito extensos consomem tokens de contexto e aumentam o custo de cada chamada. Se o system prompt ultrapassar 500 tokens, revise se todas as instruções são realmente necessárias por chamada.

## EC08: Latência Alta em Modelos Grandes
Modelos maiores (ex: GPT-4o vs GPT-4o-mini) têm latência significativamente maior. Para operações síncronas com SLA de resposta, calibre a escolha do modelo com base em benchmarks de latência, não apenas qualidade.

## EC09: Conteúdo Bloqueado pelo Filtro do Provedor
O provedor pode bloquear a resposta por políticas de conteúdo mesmo para prompts legítimos. Capture `ContentFilterError` separadamente dos outros erros e trate de forma diferenciada (não tentar novamente automaticamente).
