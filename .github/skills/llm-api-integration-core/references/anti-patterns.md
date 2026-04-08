# Anti-Padrões — Integração com APIs de LLMs

## AP01: Confiança Cega no JSON do Modelo
Usar `json.loads(response)` sem validação de schema. O modelo pode retornar JSON malformado, campos ausentes ou tipos errados. Sempre valide a estrutura antes de usar os dados.

## AP02: Sem Tratamento de Erros
Fazer chamadas de API sem capturar exceções específicas (rate limit, timeout, invalid request). Uma exceção não tratada pode derrubar o serviço inteiro ou vazar detalhes internos ao usuário.

## AP03: Contexto Infinito
Enviar todo o histórico de conversa sem truncamento. À medida que a conversa cresce, o custo aumenta e o modelo pode ultrapassar o limite da janela de contexto. Sempre aplique uma estratégia de gerenciamento de contexto.

## AP04: Temperatura Fixa para Tudo
Usar `temperature=0.7` (padrão) para todas as tarefas, incluindo extração e classificação. Tarefas determinísticas precisam de temperatura baixa (0.0–0.2). Temperatura alta em tarefas estruturadas aumenta falhas de formato.

## AP05: Sem Timeout
Chamar a API sem definir um timeout máximo. Em produção, isso pode causar threads presas, esgotamento de conexões e falhas em cascata. Todo cliente HTTP deve ter timeout explícito.

## AP06: Chave de API no Código
Incluir a chave de API diretamente no código-fonte ou em arquivos de configuração versionados. Sempre use variáveis de ambiente ou um gerenciador de segredos.

## AP07: Modelo Hardcoded em Vários Lugares
Escrever o nome do modelo diretamente no código em múltiplos lugares (`"gpt-4o"`). Quando o modelo mudar, todas as referências precisam ser atualizadas manualmente. Use uma constante central ou configuração.

## AP08: Ignorar Metadados de Uso
Descartar o objeto `usage` da resposta. Sem monitoramento de tokens, é impossível detectar regressões de custo, prompts inflados ou uso anômalo.
