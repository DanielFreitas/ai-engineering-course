# Anti-Padrões — Contexto, Memória e Estado Conversacional

## AP01: Acumular Histórico Indefinidamente
Adicionar cada mensagem ao histórico sem nenhuma estratégia de truncamento ou sumarização. Em conversas longas, o contexto excede o limite do modelo ou o custo por turno cresce exponencialmente. Sempre tenha uma estratégia de gerenciamento de contexto.

## AP02: Truncar Removendo o System Prompt
Ao truncar o histórico para caber no limite de tokens, incluir o system prompt no truncamento para "economizar espaço". Sem o system prompt, o modelo perde suas instruções base e produz respostas inconsistentes ou perigosas.

## AP03: Misturar Estado de Sessão com Memória de Longo Prazo
Usar a mesma estrutura de dados para histórico de conversa (temporário) e preferências do usuário (permanente). Quando a sessão expira, preferências são perdidas. Separe explicitamente o que é efêmero do que deve persistir.

## AP04: Contexto de Outros Usuários
Por um bug de gerenciamento de sessão, o histórico de um usuário é injetado no contexto de outro. Isso é um vazamento de dados grave. Sempre valide que o session_id pertence ao usuário autenticado antes de carregar o contexto.

## AP05: Não Medir Custo do Contexto
Ignorar o crescimento do custo em tokens à medida que a conversa avança. Sem medir, é impossível detectar quando a estratégia de gerenciamento de contexto falhou ou quando o custo ultrapassou o planejado.

## AP06: Sumarização Sem Validação
Resumir o histórico de conversa com um modelo e usar o resumo sem verificar se capturou os pontos essenciais. Uma sumarização ruim pode "esquecer" informações críticas para o restante da conversa.

## AP07: Estado em Memória Local em Múltiplas Instâncias
Armazenar o histórico de sessão em memória da aplicação (variável em processo) quando há múltiplas instâncias rodando. Uma requisição do mesmo usuário pode chegar a instâncias diferentes e ver históricos diferentes. Use armazenamento externo (Redis, banco de dados).

## AP08: Recuperar Todo o Histórico em Toda Chamada
Buscar o histórico completo do banco de dados a cada turno, sem paginação ou limite. Em sessões longas, isso se torna lento e desperdiça memória. Recupere apenas os N turnos mais recentes necessários para a estratégia de gerenciamento.
