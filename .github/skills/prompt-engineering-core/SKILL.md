---
name: prompt-engineering-core
description: "Use when: writing system prompt, prompt engineering, few-shot examples, prompt template, structured prompt, improving model output, reducing hallucination, versioning prompts, output schema definition, prompt predictability, prompt regression"
applyTo: "docs/core/03-prompt-engineering/**"
---

# Engenharia de Prompts

## Objetivo
Ensinar engenharia de prompts como prática de engenharia de software — com foco em previsibilidade, testabilidade, versionamento e redução de ambiguidade.

## Escopo
**Entra:** System prompt e user prompt, few-shot examples, templates de prompt, schemas de saída, validação de respostas, redução de ambiguidade, prompts versionados, quando melhorar prompt vs. mudar arquitetura.

**Não entra:** Fine-tuning, embeddings, orquestração de agentes, chamadas de API (coberto no módulo 02).

## Quando usar
Use este módulo quando o estudante precisar estruturar um prompt para tarefas específicas — extração, classificação, geração controlada — com saída previsível e validável.

## Resultado esperado do módulo
O estudante consegue criar um prompt estruturado com system/user, usar few-shot examples, definir um schema de saída claro, validar a resposta e versionar o prompt como artefato de software.

## Conteúdos principais
1. Sistema de mensagens: diferença prática entre `system` e `user`
2. Few-shot examples: quando usar e como construir bons exemplos
3. Templates de prompt: parametrização e reutilização
4. Schemas de saída: JSON, campos obrigatórios, instruções claras
5. Redução de ambiguidade: especificidade, restrições, exemplos do que não fazer
6. Validação de resposta: por que o prompt deve facilitar a validação
7. Versionamento de prompts: tratar prompt como código
8. Quando refatorar o prompt vs. mudar arquitetura

## Estrutura sugerida da aula
1. Introdução — prompt como especificação de comportamento
2. Conceito — anatomia de um prompt eficaz
3. Exemplo — extração de entidades com saída estruturada
4. Prática — exercício de criação e validação
5. Fechamento — checklist de qualidade de prompts

## Prática do módulo
**Exercício:** Crie um prompt de sistema que extraia as seguintes informações de um texto de produto: `nome_produto` (string), `preco` (number), `disponivel` (boolean) e `caracteristicas` (lista de strings, máximo 5 itens). Teste com ao menos 3 textos diferentes.

**Critérios de validação:**
- O prompt usa o papel `system` para instruções e `user` para o texto
- A resposta é sempre um JSON válido com os 4 campos esperados
- O prompt inclui pelo menos 1 exemplo (few-shot) de entrada e saída
- Os 3 textos de teste retornam respostas consistentes e corretas

## Critérios mínimos de qualidade
- [ ] System prompt define claramente o comportamento esperado
- [ ] Output schema está explícito no prompt (campos, tipos, restrições)
- [ ] Há pelo menos um exemplo few-shot para tarefas de extração
- [ ] O prompt faz parte de um arquivo versionável (ex: `.txt`, `.md`, `.yaml`)
- [ ] Existe um conjunto de testes para validar o prompt

## Relações com outros módulos
- **Módulo 02 (llm-api-integration-core):** O prompt é enviado via API
- **Módulo 05 (llm-evaluation-core):** Os prompts são avaliados sistematicamente
- **Módulo 08 (fastapi-ai-backend-backend):** Prompts são carregados como artefatos no backend

## Notas de consistência
- Separar system prompt e user prompt sempre, nunca misturar
- Nomear arquivos de prompt como `prompt_[funcao]_v[versao].txt`
- Usar delimitadores explícitos para separar seções dentro do prompt (ex: `<texto>`, `<instrucoes>`)
- Evitar instruções negativas longas; prefira exemplos positivos do comportamento desejado
