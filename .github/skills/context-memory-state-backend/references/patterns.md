# Padrões — Contexto, Memória e Estado Conversacional

## P01: Sempre Preservar o System Prompt
Ao truncar o histórico de conversa, nunca remova a mensagem de sistema (`system`). O system prompt define o comportamento do modelo e deve estar presente em toda chamada. Outras mensagens podem ser truncadas; o system prompt, não.

## P02: Contar Tokens Antes de Enviar
Calcule o número de tokens do contexto montado antes de fazer a chamada ao modelo. Se exceder o limite, aplique a estratégia de truncamento antes de enviar. Não descubra o limite apenas quando a API retornar erro.

## P03: Estratégia de Truncamento Documentada
Documente a estratégia de truncamento escolhida (sliding window, resumir, dropar mais antigas) e o motivo. Estratégias diferentes têm trade-offs de coerência vs. custo. O comportamento deve ser previsível e auditável.

## P04: Memória de Longo Prazo Separada do Histórico
Separe o histórico de conversa (mensagens trocadas) da memória de longo prazo (fatos sobre o usuário, preferências). O histórico é temporal e pode ser descartado; a memória de longo prazo é persistente e prioritária no contexto.

## P05: Identificador de Sessão por Conversa
Cada conversa deve ter um identificador único de sessão. Isso permite recuperar o histórico correto, correlacionar logs e implementar múltiplas conversas simultâneas para o mesmo usuário.

## P06: Sumarização como Compressão de Contexto
Quando o histórico fica longo, use sumarização para comprimir mensagens antigas: um modelo menor resume os primeiros N turnos em um parágrafo. O resumo substitui as mensagens originais, reduzindo tokens sem perder o fio condutor.

## P07: Teste de Coerência Conversacional
Após implementar qualquer estratégia de gerenciamento de contexto, teste se o modelo continua coerente em uma conversa longa (20+ turnos). Simule conversas de teste automaticamente para detectar quebras de coerência.

## P08: Custo por Turno Monitorado
Meça o custo em tokens de cada turno da conversa ao longo do tempo. Um crescimento linear indica que o truncamento não está funcionando. Um crescimento súbito pode indicar contexto acidental sendo injetado.
