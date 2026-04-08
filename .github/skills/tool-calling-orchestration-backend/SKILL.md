---
name: tool-calling-orchestration-backend
description: "Use when: function calling, tool calling, giving tools to LLM, model using external functions, orchestrating AI with tools, tool schema design, controlled agent, LLM workflow, multi-step reasoning with tools, agentic loop"
applyTo: "docs/backend/10-tool-calling-orchestration/**"
---

# Tool Calling e Orquestração

## Objetivo
Ensinar como implementar function/tool calling com LLMs — projetando schemas de ferramentas, integrando serviços internos, orquestrando workflows e tratando erros em fluxos multi-etapa.

## Escopo
**Entra:** Function calling, tool calling, design de schemas de ferramentas, integração com serviços internos, workflows, agentes controlados, tratamento de erros em ferramentas, quando usar manualmente vs. framework.

**Não entra:** Agentes autônomos complexos, frameworks de agentes (LangChain/LlamaIndex) em profundidade, RAG como ferramenta (módulo 04).

## Quando usar
Use este módulo quando o estudante precisar deixar o modelo invocar funções externas — como consultar um banco de dados, chamar uma API interna ou executar ações do sistema — de forma controlada e segura.

## Resultado esperado do módulo
O estudante consegue criar uma ferramenta simples (função Python), registrá-la no formato adequado para o LLM, executar um ciclo de tool calling e tratar erros nas chamadas de ferramenta.

## Conteúdos principais
1. O que é tool calling: modelo decide quando e como usar funções
2. Anatomia de um schema de ferramenta (JSON Schema)
3. O ciclo de tool calling: request → tool call → result → response
4. Design de ferramentas: granularidade, nomes, parâmetros claros
5. Integração com serviços internos: adapters e validação
6. Orquestração: chamadas sequenciais, paralelas e condicionais
7. Tratamento de erros: quando a ferramenta falha
8. Quando usar tool calling manual vs. framework de agentes

## Estrutura sugerida da aula
1. Introdução — o que o modelo não consegue fazer sozinho
2. Conceito — ciclo de tool calling e schemas
3. Exemplo — ferramenta de consulta de status de pedido
4. Prática — criar e conectar uma ferramenta ao modelo
5. Fechamento — limites de tool calling em produção

## Prática do módulo
**Exercício:** Crie uma ferramenta `get_order_status(order_id: str) -> dict` que simula a consulta de status de um pedido. Registre-a como ferramenta disponível para o modelo. Faça uma pergunta como "Qual o status do pedido #12345?" e valide que o modelo chama a ferramenta corretamente e usa o resultado na resposta.

**Critérios de validação:**
- O schema da ferramenta descreve os parâmetros corretamente
- O modelo chama a ferramenta com os parâmetros corretos
- O resultado da ferramenta é injetado de volta no contexto
- O modelo usa o resultado para formular a resposta final

## Critérios mínimos de qualidade
- [ ] Schemas de ferramentas têm descrições claras de todos os parâmetros
- [ ] Resultados de ferramentas são validados antes de serem enviados ao modelo
- [ ] Erros de ferramenta são tratados e comunicados ao modelo
- [ ] Há um limite máximo de iterações de tool calling por request
- [ ] Chamadas de ferramenta são logadas com parâmetros e resultados

## Relações com outros módulos
- **Módulo 06 (ai-safety-governance-core):** Segurança em tool calling
- **Módulo 08 (fastapi-ai-backend-backend):** Ferramentas integradas ao serviço FastAPI
- **Módulo 09 (context-memory-state-backend):** Resultados de ferramentas no contexto

## Notas de consistência
- Nomear ferramentas com verbos: `get_`, `create_`, `search_`, `calculate_`
- Parâmetros de ferramenta devem ser tipados e documentados
- O loop de tool calling deve ter um número máximo de iterações para evitar loops infinitos
- Logar sempre: nome da ferramenta, parâmetros recebidos, resultado retornado
