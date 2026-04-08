# Padrões — UX de Qualidade para Funcionalidades de IA

## P01: Apresentação de Incerteza com Indicadores Visuais

Resultados gerados por IA devem ser acompanhados de indicadores visuais que comuniquem o nível de confiança do modelo, como barras de probabilidade, ícones de aviso ou frases como "resposta gerada por IA". Essa transparência evita que o usuário interprete saídas probabilísticas como fatos absolutos. O padrão é especialmente importante em domínios críticos como saúde, finanças e direito.

## P02: Confirmação de Ações Sensíveis

Antes de executar ações irreversíveis ou de alto impacto sugeridas pela IA — como envio de e-mail, exclusão de dados ou transações financeiras — o sistema deve exibir uma etapa de confirmação explícita. O diálogo de confirmação deve resumir claramente o que será feito e quais dados serão afetados. Isso protege o usuário de consequências indesejadas causadas por respostas imprecisas do modelo.

## P03: Feedback Progressivo de Processamento

Durante operações de IA que levam tempo, a interface deve fornecer feedback contínuo sobre o progresso, seja por streaming de tokens, barras de progresso ou mensagens de status descritivas. O silêncio da UI durante operações longas gera ansiedade e leva o usuário a acreditar que o sistema travou. Indicadores visuais progressivos aumentam significativamente a percepção de desempenho.

## P04: Explainability de Resultados de IA

A interface deve oferecer mecanismos para que o usuário entenda por que a IA chegou a determinada conclusão, como citação de fontes, exibição de trechos relevantes ou detalhamento de etapas de raciocínio. Mesmo uma explicação simplificada aumenta a confiança do usuário no sistema. O nível de detalhe deve ser proporcional ao contexto: mais detalhado em ações críticas, mais resumido em sugestões informativas.

## P05: Consistência Visual em Componentes de IA

Todos os elementos de interface que apresentam conteúdo gerado por IA devem seguir um sistema de design consistente, incluindo tipografia, cores, ícones e padrões de interação. A consistência reduz a carga cognitiva e permite que o usuário reconheça imediatamente quando está interagindo com output de IA. Times de produto devem manter um guia de estilo específico para componentes de IA.

## P06: Acessibilidade em Fluxos de IA

Componentes de streaming, animações de carregamento e indicadores de confiança devem ser totalmente acessíveis via leitores de tela, navegação por teclado e configurações de contraste elevado. Conteúdo dinâmico deve usar regiões ARIA live para notificar usuários de tecnologia assistiva sobre atualizações. A acessibilidade não deve ser um requisito opcional: fluxos de IA precisam ser auditados periodicamente com ferramentas como axe ou Lighthouse.

## P07: Limites Explícitos de Interface com Contexto Limitado

Quando a IA não possui contexto suficiente para fornecer uma resposta confiável, a interface deve comunicar essa limitação de forma clara e oferecer alternativas ao usuário, como campos de entrada adicionais ou links para documentação. Mensagens de "não sei" bem elaboradas são superiores a respostas vagas ou inventadas. O design deve prever states de "baixa confiança" como parte do fluxo normal.

## P08: Confiança Progressiva do Usuário

A interface deve introduzir funcionalidades de IA de forma gradual, começando por ações de baixo risco antes de propor automações mais significativas. Isso permite que o usuário desenvolva um modelo mental correto sobre as capacidades e limitações do sistema. Tutoriais in-context, tooltips e onboarding progressivo são ferramentas eficazes para construir confiança sem sobrecarregar o usuário.
