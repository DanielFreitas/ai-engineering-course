# Anti-padrões — Fundamentos de Aplicações com IA

## AP01: "Vamos colocar IA em tudo"
Adicionar IA onde uma regra simples ou algoritmo determinístico resolve melhor. Aumenta custo, latência e complexidade sem benefício real.

## AP02: Tratar o modelo como oráculo infalível
Apresentar saídas de LLM sem validação, revisão ou mecanismo de correção. LLMs erram, inventam fatos e são inconsistentes.

## AP03: Ignorar latência e custo no design inicial
Projetar sem considerar que cada chamada de modelo tem custo em tokens e latência de 1-10 segundos. Descobrir isso em produção é custoso.

## AP04: Misturar lógica de negócio com chamada de modelo
Colocar `openai.chat()` diretamente na rota da API, sem camada de serviço. Impossibilita testes, troca de modelo e versionamento de prompts.

## AP05: Assumir que o modelo "entende" o sistema
Projetar como se o modelo tivesse contexto persistente entre chamadas. Cada chamada é independente — o estado deve ser passado explicitamente.

## AP06: Não considerar edge cases de linguagem natural
Entrar em produção sem pensar em: entradas multilíngues, textos muito curtos/longos, caracteres especiais, perguntas fora do escopo. Usuários reais fazem isso.

## AP07: Confundir "parece bom" com "está correto"
Avaliar a qualidade do sistema apenas por impressão subjetiva ("ficou legal na demo"). Sem casos de teste, não há como medir regressão ou melhoria.

## AP08: Usar LLM para dados estruturados simples
Usar um modelo de linguagem para extrair dados de formulários com campos fixos ou transformar JSON bem definido. Regex, schemas e parsers são mais rápidos, baratos e confiáveis.
