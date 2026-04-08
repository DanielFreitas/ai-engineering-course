# Padrões — Segurança e Governança de IA

## P01: Validação de Entrada Antes do Pipeline
Valide toda entrada do usuário antes de ela entrar no pipeline de IA. Verifique comprimento, caracteres permitidos e padrões suspeitos. A entrada nunca deve chegar ao prompt sem sanitização prévia.

## P02: Guardrails como Camadas Independentes
Implemente guardrails de entrada e saída como camadas separadas, independentes do prompt principal. Isso garante que mudar o prompt não contorna os guardrails e que os guardrails podem ser atualizados sem alterar a lógica de IA.

## P03: Contextualização Mínima de Dados Sensíveis
Injete no contexto apenas os dados necessários para a tarefa. Não inclua dados de outros usuários, informações financeiras completas ou PII desnecessária — mesmo que pareça conveniente para o modelo.

## P04: Audit Log Estruturado e Imutável
Registre cada interação com o sistema de IA: quem fez a requisição, qual foi a entrada (sanitizada), qual foi a saída, quando ocorreu e qual ferramenta foi chamada. O log deve ser append-only e não editável.

## P05: Rate Limiting por Usuário e Global
Aplique rate limits tanto por usuário individual quanto de forma global. Rate limit global protege contra abuso coordenado; rate limit por usuário protege contra uso excessivo individual. Os dois são necessários.

## P06: Validação de Saída Antes do Retorno
Antes de retornar a resposta do modelo ao usuário, valide se a saída não contém dados sensíveis indevidos, formatação maliciosa ou conteúdo proibido. A saída do modelo é tão não-confiável quanto qualquer entrada externa.

## P07: Permissões Explícitas para Ferramentas
Cada ferramenta disponível para o modelo deve ter permissões declaradas explicitamente (quem pode usar, em qual contexto, com quais parâmetros). Ferramentas sem permissão declarada não devem estar disponíveis.

## P08: Teste Adversarial Regular
Periodicamente, tente explorar o sistema com entradas adversariais (jailbreaks, prompt injection, entradas malformadas). Esse teste deve fazer parte do ciclo de desenvolvimento, não apenas de auditorias esporádicas.
