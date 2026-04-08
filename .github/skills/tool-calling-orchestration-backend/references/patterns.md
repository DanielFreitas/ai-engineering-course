# Padrões — Tool Calling e Orquestração

## P01: Schema de Ferramenta Autodescritivo
O schema JSON de cada ferramenta deve ser completo o suficiente para o modelo entender quando e como usá-la sem instruções adicionais no system prompt. Inclua: descrição clara da ferramenta, tipos de todos os parâmetros, exemplos de valores válidos e casos de uso.

## P02: Limite Máximo de Iterações
Defina um número máximo de iterações do loop de tool calling (ex: 5). Sem limite, o modelo pode entrar em loops infinitos chamando ferramentas recursivamente. O limite deve ser configurável por tipo de operação.

## P03: Validação de Parâmetros Antes da Execução
Valide os parâmetros gerados pelo modelo antes de executar qualquer ferramenta, usando o schema JSON da ferramenta. O modelo pode gerar parâmetros fora do range, do tipo errado ou com injeção de prompt. Nunca confie cegamente.

## P04: Log de Cada Chamada de Ferramenta
Registre em log: nome da ferramenta, parâmetros recebidos (sanitizados), resultado retornado, latência e se houve erro. Isso é essencial para debug de comportamentos inesperados do modelo em produção.

## P05: Resultados de Ferramentas Resumidos
Quando o resultado de uma ferramenta é muito grande (ex: uma lista de 100 itens), resuma antes de injetar no contexto. Resultados longos consomem tokens e podem fazer o modelo "perder o fio" da tarefa original.

## P06: Ferramentas com Nomes Verbais e Descritivos
Nomeie ferramentas com verbos que descrevam claramente a ação: `get_order_status`, `search_products`, `calculate_shipping`. Nomes descritivos ajudam o modelo a decidir quando usar cada ferramenta.

## P07: Separação entre Ferramenta e Implementação
A definição do schema da ferramenta (o que o modelo vê) deve ser separada da implementação (o código Python que executa). Isso permite atualizar implementações sem mudar schemas e vice-versa.

## P08: Ferramenta de Fallback para Casos Não Cobertos
Inclua uma ferramenta genérica de "confirmar com humano" ou "escalate" para quando o modelo não consegue concluir a tarefa com as ferramentas disponíveis. Isso evita que o modelo alucine respostas quando bloqueado.
