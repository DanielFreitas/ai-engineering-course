# Anti-Padrões — Telemetria de Experiência (Frontend)

## AP01: Telemetria Técnica sem Contexto de Produto

Instrumentar apenas eventos de baixo nível — cliques em botões, chamadas de API, erros de rede — sem mapear para ações significativas de produto resulta em dados que engenheiros conseguem ler, mas que não respondem às perguntas de negócio. Saber que `POST /api/generate` foi chamado 10.000 vezes não revela se os usuários estão satisfeitos com as respostas. Telemetria útil precisa de semântica de produto, não apenas de instrumentação técnica.

## AP02: Eventos Granulares Demais sem Agregação Significativa

Coletar centenas de eventos por sessão sem uma estratégia de agregação e análise cria ruído que mascara os sinais importantes. O volume excessivo de dados brutos dificulta a construção de dashboards acionáveis e aumenta custos de armazenamento e processamento. A regra prática é: se o evento não pode ser associado a uma decisão de produto ou melhoria concreta, seu valor é questionável.

## AP03: Ausência de Rastreamento de Abandono

Medir apenas conversões bem-sucedidas sem rastrear onde os usuários desistem da interação cria um viés de sobrevivência nos dados analíticos. As etapas de maior abandono são precisamente onde estão os maiores ganhos potenciais de melhoria de experiência. Sem eventos de abandono, times de produto tomam decisões baseadas em uma visão incompleta do funil de interação.

## AP04: Coleta de Dados sem Consideração de Privacidade

Enviar conteúdo de prompts, respostas do modelo ou dados pessoais do usuário para sistemas de análise sem anonimização, consentimento explícito ou base legal adequada é uma violação da LGPD e de outras regulamentações de privacidade. Telemetria deve capturar metadados comportamentais, não conteúdo sensível. O DPO da organização deve validar o esquema de telemetria antes de ir para produção.

## AP05: Métricas de Vaidade em vez de Indicadores de Qualidade

Focar exclusivamente em volume de uso (número de prompts enviados, tempo na página, DAU) sem correlacionar com indicadores de qualidade de experiência pode mascarar problemas sérios de satisfação. Um produto com alto volume de uso e alta taxa de abandono ou rejeição está em pior situação do que parece. Métricas de vaidade levam times a celebrar crescimento de uso ao mesmo tempo em que a experiência se deteriora.

## AP06: Telemetria sem Correlação de Sessão

Coletar eventos sem agrupá-los por sessão de usuário impossibilita análises de sequência, funil e cohort. Sem o contexto da sessão, não é possível saber se múltiplas interações pertencem à mesma tentativa de completar uma tarefa ou são jornadas independentes. A ausência de session ID também dificulta a investigação de problemas reportados por usuários específicos.

## AP07: Ignorar Sinais Comportamentais de Frustração

Não instrumentar comportamentos indicativos de frustração — como múltiplos cliques no botão de regenerar, edições extensas de respostas aceitas ou saída imediata após receber resposta — resulta na perda de um canal rico de feedback sobre qualidade do produto. Pesquisas de satisfação são esparsas e enviesadas; sinais comportamentais são contínuos e mais honestos. Ignorá-los é uma oportunidade perdida de detecção precoce de problemas.
