# Anti-Padrões — Segurança e Governança de IA

## AP01: Confiar na Entrada do Usuário
Injetar a entrada do usuário diretamente no prompt sem validação ou sanitização. Qualquer usuário pode tentar manipular o comportamento do modelo com prompt injection. Toda entrada de usuário é não-confiável por definição.

## AP02: Dados Sensíveis no Contexto Desnecessariamente
Incluir CPF, dados financeiros, senhas ou informações de outros usuários no contexto do modelo "por conveniência". Uma vez no prompt, esses dados podem aparecer na resposta ou ser capturados em logs. Injete apenas o mínimo necessário.

## AP03: Ferramentas Sem Validação de Parâmetros
Executar ferramentas com os parâmetros exatamente como o modelo os retornou, sem validar. O modelo pode gerar parâmetros inválidos, maliciosos (via prompt injection) ou fora do escopo permitido. Valide sempre antes de executar.

## AP04: Sem Limite de Custo por Usuário
Não ter nenhum controle de custo por usuário ou por sessão. Um usuário mal-intencionado pode gerar requisições em loop, custando centenas de dólares em minutos. Defina limites de custo operacionais.

## AP05: Logging de Dados Sensíveis
Registrar nos logs o conteúdo completo do prompt (incluindo dados do usuário) ou a resposta completa sem sanitização. Logs são frequentemente menos protegidos que bancos de dados. Sanitize antes de logar.

## AP06: Segurança Como Pós-Cuidado
Implementar segurança apenas depois de receber reclamações ou após um incidente. Segurança precisa ser projetada junto com a funcionalidade, não adicionada depois. O custo de retrofitting é alto e incompleto.

## AP07: Sistema de IA Sem Modo de Desligamento
Não ter mecanismo para desabilitar rapidamente um endpoint ou ferramenta de IA em caso de abuso ou falha. Em incidentes, cada minuto conta. Deve ser possível bloquear o sistema em menos de 5 minutos.

## AP08: Ignorar Indirect Prompt Injection
Considerar apenas prompt injection direta (usuário malicioso) e ignorar a indireta (conteúdo recuperado de documentos ou banco de dados contém instruções maliciosas). Qualquer conteúdo injetado no prompt é um vetor de ataque.
