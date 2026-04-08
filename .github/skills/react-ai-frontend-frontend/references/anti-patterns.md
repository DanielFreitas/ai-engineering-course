# Anti-Padrões — React para Aplicações de IA (Frontend)

## AP01: Bloquear a UI Durante a Geração de Resposta

Renderizar toda a resposta de uma vez apenas quando o stream for concluído — sem exibir tokens progressivamente — faz com que o usuário encare uma tela em branco ou um spinner por toda a duração da geração. Para respostas longas, isso pode significar 10-30 segundos sem qualquer feedback de conteúdo. O streaming incremental não é apenas uma feature de UX: é a diferença entre um produto que parece responsivo e um que parece lento.

## AP02: Múltiplos Estados Booleanos para Controle de Loading

Gerenciar o estado de loading com múltiplos booleans independentes — `isLoading`, `isStreaming`, `isCancelling`, `isError` — cria combinações de estados inválidas que são difíceis de prever e testar. Quando `isLoading` e `isError` são `true` simultaneamente, qual é o estado real? Um reducer com estados mutuamente exclusivos e transições explícitas é mais seguro e mais fácil de manter. Máquinas de estado eliminam uma classe inteira de bugs de UI.

## AP03: Ausência de Botão de Cancelamento Durante Streaming

Não oferecer ao usuário a capacidade de interromper uma geração em andamento — especialmente para respostas longas — é uma falha de UX grave. O usuário pode perceber imediatamente que a resposta está indo na direção errada e querer reformular a pergunta. Sem cancelamento, é forçado a aguardar a conclusão completa ou recarregar a página, perdendo o contexto da sessão. O botão de cancelar deve estar sempre visível e acessível durante o streaming.

## AP04: Renderizar Markdown/Código apenas no Final do Stream

Aguardar o fim do stream para converter o conteúdo de Markdown ou destacar sintaxe de código resulta em uma transição abrupta de texto plano para conteúdo formatado. Isso é visualmente perturbador e "quebra" a experiência de streaming fluido. Bibliotecas como `react-markdown` com rendering incremental ou debounce de formatação permitem aplicar formatação progressivamente enquanto o conteúdo ainda está sendo gerado.

## AP05: Componentes Monolíticos que Misturam Lógica de IA e Apresentação

Um componente `<ChatPage>` que gerencia estado de sessão, faz fetch ao backend, formata mensagens, renderiza o histórico e controla o input em um único arquivo cria um monólito difícil de testar, reutilizar e manter. A separação de responsabilidades é especialmente importante em UIs de IA pela complexidade de estados envolvidos. hooks para lógica de dados, componentes puros para apresentação e containers para orquestração é o padrão correto.

## AP06: Estado Global da Conversa sem Isolamento por Sessão

Usar um único store global sem namespace por session_id significa que múltiplas conversas abertas simultaneamente — em abas diferentes ou em um layout de split view — compartilham e corrompem o estado uma da outra. Cada sessão de conversa deve ter seu próprio espaço isolado no estado global. Zustand com slices por sessão ou React Context com provider por instância são abordagens corretas para este problema.

## AP07: Tratamento de Erro Ausente ou Genérico na UI

Exibir "Algo deu errado" sem contexto específico quando uma operação de IA falha — sem indicar o tipo de erro, sem sugerir ação de recuperação e sem oferece retry — é uma experiência ruim que aumenta a frustração e os tickets de suporte. Erros de IA têm categorias distintas com tratamentos diferentes: rate limit (aguardar e tentar novamente), contexto muito longo (resumir conversa), modelo indisponível (aguardar ou usar alternativo). A UI deve comunicar essas distinções de forma clara e acionável.
