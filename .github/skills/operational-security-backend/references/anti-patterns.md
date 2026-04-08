# Anti-Padrões — Segurança Operacional para IA

## AP01: Ausência de Rate Limiting em Endpoints de IA

Expor APIs de IA sem rate limiting cria vulnerabilidade crítica de abuso: um usuário malicioso pode consumir todo o orçamento de tokens, degradar o serviço para outros usuários ou realizar ataques de enumeração de informações via chamadas massivas. Endpoints de IA têm custo direto por request, tornando a ausência de rate limiting também um risco financeiro significativo. Todo endpoint de IA em produção deve ter rate limiting configurado antes do lançamento.

## AP02: Contexto Sensível Exposto Diretamente no Prompt

Incluir dados sensíveis de negócio — esquemas de banco de dados, chaves de API, dados de outros usuários, informações proprietárias — diretamente no prompt enviado a APIs de LLM externas significa que esses dados passam pelos servidores do provedor e podem ser usados para treinamento futuro. Dados sensíveis devem ser mantidos fora do prompt ou o provedor deve ter contrato de confidencialidade e opt-out de treinamento configurado.

## AP03: Tool Calling sem Validação de Permissões por Operação

Permitir que um agente de IA chame ferramentas sem verificar se o usuário atual tem permissão para cada operação específica — assumindo que a autenticação inicial garante todas as permissões — é uma violação grave do princípio do menor privilégio. Um usuário com acesso de leitura pode induzir o agente a executar operações de escrita se as permissões não forem verificadas a cada chamada de tool. A autenticação de sessão e a autorização de operação são verificações distintas e independentes.

## AP04: Ausência de Logs de Auditoria para Ações de Agentes

Não registrar o histórico de ações executadas por agentes de IA impossibilita investigação forense após incidentes, viola regulamentações de conformidade (SOX, LGPD, PCI-DSS em contextos financeiros) e remove a capacidade de identificar o scope de um eventual comprometimento. Logs de auditoria são especialmente críticos para ações de alto impacto: modificações de dados, envio de comunicações, execução de transações.

## AP05: Confiança Implícita em Toda Entrada do Usuário

Tratar qualquer texto fornecido pelo usuário como confiável e seguro para inclusão em prompts sem validação é o ponto de entrada mais comum para ataques de prompt injection. Um usuário malicioso pode fornecer instruções disfarsadas como dados legítimos que subvertem as instruções do sistema. Inputs do usuário devem ser tratados como não confiáveis e validados da mesma forma que qualquer outro dado externo.

## AP06: Segredos e Configurações Sensíveis em System Prompts

Incluir chaves de API, credenciais, URLs internas ou detalhes de arquitetura no system prompt enviado a modelos externos expõe essas informações ao provedor de LLM. System prompts podem ser extraídos por usuários sofisticados via técnicas de prompt injection ou por comportamentos não intencionais do modelo. Informações sensíveis de configuração devem ser injetadas programaticamente no momento da execução, não hardcoded no prompt.

## AP07: Escalada de Privilégios via Instruções em Conteúdo Processado

Quando um agente processa documentos, páginas web ou dados externos, o conteúdo desses artefatos pode conter instruções maliciosas projetadas para manipular o comportamento do agente — o chamado "indirect prompt injection". Sem sanitização do conteúdo processado, o agente pode ser instruído a executar ações com os privilégios do usuário atual por um documento aparentemente inofensivo. O sistema deve tratar conteúdo externo com o mesmo nível de desconfiança que inputs diretos do usuário.
