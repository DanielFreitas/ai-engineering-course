---
name: operational-security-backend
description: "Use when: AI endpoint security, abuse monitoring AI, protecting AI context, access control for AI tools, rate limiting AI, security controls for LLM endpoint, preventing misuse AI, incident response AI, audit log AI"
applyTo: "docs/backend/16-operational-security/**"
---

# Segurança Operacional de IA

## Objetivo
Ensinar como proteger endpoints de IA em produção — monitorando abuso, protegendo contexto, controlando acesso a ferramentas, definindo limites operacionais e respondendo a incidentes.

## Escopo
**Entra:** Monitoramento de abuso, proteção de contexto, controle de acesso, riscos operacionais de tool calling, limites de ação, resposta a incidentes, prevenção de uso indevido.

**Não entra:** Segurança de infraestrutura (firewall, VPC), autenticação/autorização de usuários em profundidade, conformidade regulatória.

## Quando usar
Use este módulo quando o estudante precisar definir os controles de segurança operacional antes de colocar um endpoint de IA em produção — especialmente quando o endpoint tem acesso a ferramentas ou dados sensíveis.

## Resultado esperado do módulo
O estudante consegue listar e implementar os controles mínimos de segurança para um endpoint de IA com acesso a ferramentas internas — incluindo rate limiting, validação de entrada, audit log e critérios de bloqueio.

## Conteúdos principais
1. Modelo de ameaça para endpoints de IA: atores, vetores, impactos
2. Monitoramento de abuso: padrões de uso anômalo
3. Proteção de contexto: o que não pode ser exposto ao modelo
4. Controle de acesso a ferramentas: permissões por papel e por contexto
5. Limites operacionais: rate limit, custo máximo por usuário, ações irreversíveis
6. Audit log: registrar quem fez o quê e com qual resultado
7. Resposta a incidentes: como agir quando algo dá errado
8. Prevenção de uso indevido: exfiltração, automação, abuso de escala

## Estrutura sugerida da aula
1. Introdução — por que IA em produção tem riscos únicos
2. Conceito — modelo de ameaça simplificado
3. Exemplo — análise de um endpoint de IA com acesso a ferramenta
4. Prática — listar e implementar controles mínimos
5. Fechamento — checklist de segurança operacional

## Prática do módulo
**Exercício:** Para um endpoint de IA que acessa uma ferramenta interna (ex: consultar dados de cliente), liste os controles de segurança mínimos necessários. Para cada controle, especifique: o que protege, como implementar e como validar que está funcionando. Implemente pelo menos 2 controles no código.

**Critérios de validação:**
- Lista contém pelo menos 5 controles distintos
- Cada controle tem implementação ou referência de implementação
- O audit log registra: usuário, ferramenta chamada, parâmetros e resultado
- Rate limiting está implementado para o endpoint

## Critérios mínimos de qualidade
- [ ] Rate limiting no endpoint (por usuário e por IP)
- [ ] Entrada validada antes de entrar no pipeline de IA
- [ ] Ferramentas têm permissões declaradas e verificadas
- [ ] Audit log em formato estruturado e imutável
- [ ] Procedimento de bloqueio de usuário em menos de 5 minutos

## Relações com outros módulos
- **Módulo 06 (ai-safety-governance-core):** Princípios de segurança aplicados operacionalmente
- **Módulo 10 (tool-calling-orchestration-backend):** Segurança específica de tools
- **Módulo 14 (observability-otel-datadog-backend):** Monitoramento como base para detecção

## Notas de consistência
- Audit log não deve conter dados sensíveis do usuário ou do prompt
- Rate limits por usuário e globais são controles distintos
- "Ação irreversível" deve sempre requerer confirmação ou log especial
- Usar termos: "modelo de ameaça", "superfície de ataque", "controle compensatório"
