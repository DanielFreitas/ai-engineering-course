# Padrões — Engenharia de Prompts

## P01: System Prompt como Especificação
Trate o system prompt como uma especificação de comportamento — não como sugestão. Ele deve definir o papel do modelo, o formato de saída esperado, restrições e exemplos. Um bom system prompt reduz variação de resposta.

## P02: Few-Shot com Exemplos Reais
Inclua exemplos few-shot que representem os casos reais do sistema, não casos artificialmente fáceis. Bons exemplos cobrem variações de formato, linguagem e edge cases. A qualidade dos exemplos impacta diretamente a qualidade do output.

## P03: Schema de Saída Explícito no Prompt
Descreva o JSON esperado no próprio prompt — nome dos campos, tipos, restrições (ex: máximo de itens, valores permitidos). Não deixe o modelo "adivinhar" o formato. Quanto mais explícito, mais consistente a saída.

## P04: Versionamento de Prompt como Código
Mantenha prompts em arquivos versionados no repositório (`.txt`, `.md`, `.yaml`). Cada mudança de prompt deve ser uma mudança de código rastreável. Isso permite rollback e comparação entre versões.

## P05: Delimitadores para Separar Conteúdo
Use delimitadores explícitos (ex: `<texto>`, `<instrução>`, `---`) para separar seções do prompt e o conteúdo de entrada do usuário. Isso previne injeção acidental e melhora a clareza.

## P06: Restrições Positivas, Não Negativas
Prefira "Responda apenas com JSON" em vez de "Não responda em texto livre". Instruções positivas são mais previsíveis. Use instruções negativas apenas para complemento de especificidade.

## P07: Templates Parametrizados
Construa prompts como templates com variáveis substituídas em runtime. Isso permite reutilização, teste unitário do template e separação clara entre o que é instrução e o que é dado de entrada.

## P08: Teste de Regressão por Mudança de Prompt
A cada mudança de prompt, execute o conjunto de casos de teste antes de promover para produção. Melhorias em um cenário podem causar regressão em outro. Mude prompts com a mesma disciplina que muda código.
