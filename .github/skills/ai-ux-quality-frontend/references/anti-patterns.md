# Anti-Padrões — UX de Qualidade para Funcionalidades de IA

## AP01: Apresentação de Resultados sem Indicação de Confiança

Exibir respostas de IA com o mesmo peso visual e semântico de dados factuais verificados induz o usuário a superestimar a precisão do modelo. Sem indicadores de confiança, o usuário não tem como discernir quando a IA está especulando ou quando o resultado tem alta probabilidade de estar correto. Esse anti-padrão é particularmente perigoso em contextos onde erros têm consequências reais.

## AP02: Ações Irreversíveis sem Confirmação

Permitir que a IA execute ações de alto impacto diretamente, sem passar por uma etapa de confirmação explícita, transfere o risco integralmente para o usuário. Um modelo que automaticamente envia e-mails, exclui registros ou realiza compras sem confirmação cria uma experiência de alto risco e baixa confiança. Mesmo que a IA esteja correta na maioria das vezes, a ausência de confirmação torna o sistema inaceitável em produção.

## AP03: Feedback Ausente em Operações Longas

Deixar a UI congelada ou sem resposta enquanto o modelo processa uma requisição leva o usuário a acreditar que ocorreu um erro. A taxa de abandono aumenta drasticamente quando não há feedback visual após 3 segundos de espera. Interfaces que não comunicam progresso comprometem a percepção de qualidade do produto, independentemente da precisão final da resposta.

## AP04: Caixa Preta Total — Nenhuma Explicação

Oferecer resultados de IA sem qualquer mecanismo de explicação ou rastreabilidade reduz a confiança e dificulta a identificação de erros. Usuários que não entendem por que a IA tomou determinada decisão tendem a rejeitar o sistema ou a adotá-lo de forma acrítica — ambos comportamentos problemáticos. A ausência de explainability é especialmente prejudicial quando o sistema é usado por especialistas de domínio.

## AP05: Inconsistência entre Componentes de IA

Usar diferentes padrões visuais e de interação para o mesmo tipo de conteúdo de IA em diferentes partes do produto fragmenta a experiência e aumenta a carga cognitiva. Quando o usuário não consegue identificar de forma consistente o que é saída de IA e o que é dado determinístico, o nível de confiança no sistema como um todo diminui. Inconsistências visuais também dificultam a identificação de erros do modelo.

## AP06: Inacessibilidade de Fluxos de IA

Implementar funcionalidades de IA sem considerar acessibilidade exclui uma parcela significativa dos usuários e viola regulamentações como WCAG 2.1 e a Lei Brasileira de Inclusão. Animações de streaming sem equivalente textual, modais sem foco gerenciado e indicadores de confiança sem descrição para leitores de tela são exemplos comuns desse anti-padrão. Acessibilidade não pode ser tratada como fase posterior ao lançamento.

## AP07: Sobrecarga de Informações de IA

Exibir todos os detalhes técnicos do modelo — probabilidades, tokens, múltiplas alternativas — diretamente na interface principal sobrecarrega o usuário com informações irrelevantes para sua tarefa. A sobrecarga cognitiva reduz a usabilidade e distrai do objetivo real. Detalhes técnicos devem ser acessíveis sob demanda, não expostos por padrão.

## AP08: Falha Silenciosa de IA

Quando o modelo falha ou retorna um resultado de baixa confiança, tratar esse evento silenciosamente — sem notificação, sem fallback, sem orientação — é um anti-padrão grave. O usuário pode não perceber que a resposta está incorreta ou que a funcionalidade não está operando normalmente. Falhas de IA devem ser comunicadas de forma clara, com indicação de próximos passos ou alternativas disponíveis.
