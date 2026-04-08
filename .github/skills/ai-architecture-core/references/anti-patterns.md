# Anti-Padrões — Arquitetura de Sistemas de IA

## AP01: IA Acoplada ao Controller
Colocar a lógica de IA (construção de prompt, chamada ao modelo, parsing da resposta) diretamente no controller ou endpoint, misturada com validação de input e lógica de negócio. Isso torna impossível testar, versionar e evoluir a IA de forma independente.

## AP02: Estado Implícito
Não documentar onde cada parte do estado é armazenada. O histórico de conversa está em memória? Em cache? Em banco de dados? Quando consultado? Estado implícito leva a inconsistências, duplicações e dificuldade de debug.

## AP03: "Vai Funcionar em Produção Igual ao Notebook"
Desenvolver toda a lógica de IA em um notebook Jupyter e assumir que funcionará da mesma forma em produção, ignorando latência de rede, concorrência, gerenciamento de estado e tratamento de erros. O gap entre notebook e produção é enorme.

## AP04: Sem Estratégia de Fallback
Construir um sistema onde a feature de IA é um ponto único de falha. Se o modelo não responder, o sistema trava completamente. Toda feature de IA deve ter um comportamento definido para quando a IA não está disponível.

## AP05: Monitoramento Adicionado Depois
Planejar "adicionar observabilidade depois, quando tiver tempo". Sem monitoramento desde o início, a equipe opera às cegas. Problemas em produção levam horas para ser diagnosticados. Observabilidade é requisito, não feature optional.

## AP06: Frontend Chamando Modelo Diretamente
O frontend faz chamadas diretamente à API do modelo (com chave de API exposta no cliente). Isso expõe credenciais, impede controle de custo, torna impossível logar e versionar prompts. O modelo deve ser acessado apenas pelo backend.

## AP07: Uma Arquitetura para Todos os Casos
Usar a mesma arquitetura (ex: sempre síncrono, sempre com RAG, sempre com agente) independentemente das necessidades da feature. Cada feature tem requisitos diferentes de latência, estado e complexidade. Arquitetura deve ser proporcional ao problema.

## AP08: Escalar Sem Entender o Gargalo
Adicionar mais instâncias ou mais recursos computacionais quando o desempenho é insatisfatório, sem primeiro medir onde está o gargalo. Em sistemas de IA, o gargalo quase sempre é a latência do modelo ou o custo de tokens, não a capacidade do servidor.
