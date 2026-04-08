# Padrões — Segurança Operacional para IA

## P01: Monitoramento de Abuso em Tempo Real com Limites por Usuário

O sistema deve rastrear em tempo real o volume e o padrão de uso de cada usuário/tenant, detectando automaticamente comportamentos indicativos de abuso: volume anormalmente alto de requests, prompts incomumente longos, padrões repetitivos que sugerem scraping ou tentativas de exploração. Alertas de abuso devem acionar tanto throttling automático quanto notificação para o time de segurança. Dashboards de abuso devem ser acessíveis para análise proativa.

## P02: Proteção de Dados Sensíveis no Contexto do Modelo

Dados sensíveis — credenciais, PII, segredos de sistema — nunca devem ser incluídos no prompt enviado ao modelo externo. Uma camada de sanitização deve inspecionar e remover ou mascarar informações sensíveis antes de qualquer chamada a API de LLM externa. Logs das chamadas ao modelo devem ser auditados periodicamente para garantir que a sanitização está funcionando corretamente.

## P03: Controle de Acesso Granular para Funcionalidades de IA

Diferentes funcionalidades de IA — acesso a dados sensíveis, execução de ferramentas, capacidade de chamar sistemas externos — devem ter controles de permissão distintos e explícitos. O modelo de permissões deve seguir o princípio do menor privilégio: o modelo executa apenas ações para as quais o usuário tem autorização explícita. Claims de JWT ou RBAC devem ser verificados a cada operação sensível, não apenas no início da sessão.

## P04: Limites Explícitos de Ação em Agentes e Tool Calling

Agentes de IA que têm acesso a ferramentas externas — APIs, banco de dados, sistemas de arquivos — devem operar com limites explícitos e auditáveis de quais ações podem realizar. Uma lista de permissões de tools por contexto de usuário e sessão deve ser mantida. Cada invocação de tool deve ser logada com o contexto completo: quem solicitou, qual tool, quais parâmetros e o resultado.

## P05: Resposta a Incidentes com Playbooks Específicos para IA

O processo de resposta a incidentes deve incluir playbooks específicos para cenários de IA: prompt injection detectada, exfiltração de dados pelo modelo, comportamento anômalo de agente, vazamento de contexto entre usuários. O tempo de resposta a incidentes de segurança de IA deve ser um SLO definido. A equipe deve realizar exercícios periódicos de simulação de incidentes de segurança de IA.

## P06: Rate Limiting em Múltiplas Camadas para Prevenção de Abuso

O rate limiting deve ser aplicado em camadas: por IP, por usuário autenticado, por tenant e por feature específica de IA. Limites em camadas dificultam o contorno do sistema e permitem resposta proporcional ao nível de abuso. Durante ataques, é necessário ter a capacidade de aplicar rate limiting emergencial sem redeploy da aplicação.

## P07: Sanitização e Validação de Entradas em Todos os Pontos de Injeção

Todas as entradas do usuário que serão inseridas em prompts devem ser sanitizadas para remover instruções potencialmente maliciosas (prompt injection), delimitadores especiais e sequências de escape que possam subverter o comportamento do modelo. A validação deve incluir limites de tamanho, verificação de encoding e detecção de padrões de ataque conhecidos. Um modelo de detecção de prompt injection dedicado pode ser usado como camada adicional.

## P08: Auditoria e Rastreabilidade Completa de Ações de IA

Toda ação executada por um agente de IA em nome de um usuário deve ser registrada em log de auditoria imutável com: identidade do usuário, session ID, ferramenta invocada, parâmetros usados, resultado e timestamp. Logs de auditoria não devem ser alteráveis por operadores comuns e devem ter retenção prolongada para atender requisitos regulatórios. Sistemas de auditoria devem ser independentes dos sistemas de aplicação.
