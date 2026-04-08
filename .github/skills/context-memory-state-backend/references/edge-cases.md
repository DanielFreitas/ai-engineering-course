# Casos de Borda — Contexto, Memória e Estado Conversacional

## EC01: Sistema Prompt Maior que o Limite
O system prompt por si só excede `max_tokens`. Isso significa que não há espaço para histórico ou resposta. Valide o tamanho do system prompt na inicialização e falhe com mensagem clara se ultrapassar um threshold razoável.

## EC02: Sessão Expirada Durante Conversa
O usuário retoma uma conversa cujo histórico foi deletado por expiração de sessão. O sistema deve detectar que a sessão não existe e iniciar uma nova graciosamente, sem retornar erro genérico ao usuário.

## EC03: Sumarização Produz Resumo Pior que o Original
O modelo de sumarização produz um resumo que omite informações críticas (ex: o usuário disse "meu prazo é amanhã" mas o resumo diz "o usuário mencionou prazo"). Implemente verificação básica de qualidade do resumo ou use sumarização apenas como último recurso.

## EC04: Múltiplas Abas ou Dispositivos Simultâneos
O mesmo usuário tem uma conversa aberta em dois dispositivos simultaneamente. Ambas as sessões estão modificando o mesmo histórico. Defina estratégia de resolução de conflito para escrita concorrente no histórico.

## EC05: Usuário Referencia Algo "Esquecido" pelo Truncamento
O usuário diz "como eu disse antes, meu nome é João" — mas essa mensagem foi truncada. O modelo não tem mais o contexto e responde de forma inconsistente. Considere injetar resumo de contexto anterior antes das mensagens recentes.

## EC06: Contexto com Caracteres de Alta Densidade de Tokens
Textos com muita pontuação, código ou idiomas de alta densidade (como CJK) podem ter um número de tokens muito maior que o número de caracteres sugere. Conte tokens reais (usando tokenizer) em vez de usar caracteres como proxy.

## EC07: Primeira Mensagem após Longa Pausa
O usuário retoma uma conversa após semanas. O histórico existe, mas o contexto é irrelevante para o novo assunto. Implemente lógica de "nova sessão" baseada em intervalo de tempo, ao mesmo tempo que preserva memória de longo prazo.

## EC08: Injeção de PII via Campo de Mensagem
O usuário inclui CPF, número de cartão ou senha em uma mensagem. Essa informação vai para o histórico persistido e para os logs. Detecte e mascare PII antes de armazenar mensagens do usuário.
