# Anti-Padrões — Tool Calling e Orquestração

## AP01: Executar Ferramentas Sem Validar Parâmetros
Chamar a função Python diretamente com os parâmetros gerados pelo modelo, sem validar tipos, ranges ou valores permitidos. O modelo pode gerar parâmetros incorretos, especialmente quando o contexto contém texto malicioso (indirect prompt injection).

## AP02: Sem Limite de Iterações
Permitir que o loop de tool calling continue indefinidamente até o modelo "decidir" parar. Isso pode resultar em custos ilimitados, latências de minutos e comportamentos impredizíveis. Sempre defina um número máximo de iterações.

## AP03: Ferramentas com Efeitos Colaterais Irreversíveis Sem Confirmação
Disponibilizar ferramentas que fazem ações irreversíveis (deletar dados, enviar e-mails, processar pagamentos) sem confirmação humana. O modelo pode chamar essas ferramentas por engano ou por manipulação. Requeira confirmação explícita para ações irreversíveis.

## AP04: Resultados Brutos de API no Contexto
Injetar a resposta completa de uma API externa (JSON com centenas de campos) como resultado de ferramenta. Isso polui o contexto com tokens desnecessários, aumenta custo e pode confundir o modelo. Retorne apenas os campos relevantes para a tarefa.

## AP05: Schema de Ferramenta Sem Descrição
Definir uma ferramenta com apenas nome e parâmetros, sem descrição textual de quando usar e o que faz. O modelo não consegue decidir corretamente entre ferramentas sem descrições claras. Toda ferramenta precisa de descrição detalhada.

## AP06: Ferramentas de Leitura e Escrita Misturadas Sem Separação
Não diferenciar ferramentas de leitura (seguras, idempotentes) de ferramentas de escrita (com efeitos colaterais). Isso impede aplicar políticas de segurança diferentes: ferramentas de leitura podem ter permissões mais amplas; ferramentas de escrita precisam de controles extras.

## AP07: Loop de Tool Calling Sem Feedback de Progresso
Executar múltiplas iterações de tool calling sem atualizar o usuário. O usuário vê a interface "carregando" por minutos sem nenhum feedback. Especialmente problemático em fluxos com 3+ chamadas de ferramenta.

## AP08: Ignorar Erros de Ferramenta
Quando uma ferramenta retorna erro, continuar o loop como se nada tivesse acontecido, ou retornar o erro diretamente ao modelo sem contexto. Erros de ferramenta devem ser formatados claramente para que o modelo decida: tentar outra abordagem, pedir mais informação ou informar ao usuário.
