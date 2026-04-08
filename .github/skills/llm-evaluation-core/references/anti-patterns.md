# Anti-Padrões — Avaliação de LLMs

## AP01: Avaliação Manual Como Único Método
Avaliar qualidade apenas lendo respostas manualmente e dando "aprovado/reprovado" por julgamento pessoal. Avaliação manual não escala, é inconsistente e não detecta regressões automaticamente. Complementar com avaliação automatizada.

## AP02: Dataset de Avaliação Muito Pequeno
Usar 3–5 casos de teste para validar um componente de produção. Um conjunto pequeno não é representativo, e melhorias em 1 caso podem mascarar regressões em outros. Mínimo recomendado: 20–50 casos para componentes simples.

## AP03: Critérios de Avaliação Definidos Após o Resultado
Decidir o critério de sucesso depois de ver os resultados da avaliação. Isso cria viés de confirmação. Defina os critérios antes de executar a avaliação, assim como um teste unitário é escrito antes de rodar o código.

## AP04: Confiar Cegamente em LLM-as-Judge
Usar um LLM para avaliar respostas e aceitar o veredito sem questionar. LLMs têm vieses conhecidos como preferência por respostas longas, viés de posição e auto-viés. Use LLM-as-judge com validação humana periódica.

## AP05: Não Avaliar Casos de Regressão
Manter apenas casos de teste positivos (o que deve funcionar), sem casos que cobrem comportamentos que anteriormente falhavam e foram corrigidos. Casos de regressão são essenciais para garantir que problemas não retornem.

## AP06: Métricas de Avaliação Desconectadas do Negócio
Otimizar métricas técnicas (ex: ROUGE score) sem verificar se elas correlacionam com satisfação do usuário ou a métrica de negócio. Uma resposta pode ter alto ROUGE e ser inútil para o usuário.

## AP07: Avaliação Apenas Offline
Avaliar apenas em ambiente de desenvolvimento, sem monitoramento em produção. Distribuição de dados em produção é diferente do dataset de avaliação. Desvios de qualidade em produção podem não ser detectados sem avaliação online.

## AP08: Mudanças de Prompt Sem Reavaliação
Atualizar um prompt em produção sem re-executar o conjunto de avaliação. Toda mudança de prompt, por menor que seja, pode causar regressões inesperadas. Avaliação deve ser etapa obrigatória no fluxo de mudança.
