# Padrões — React para Aplicações de IA (Frontend)

## P01: Streaming de Respostas com Renderização Incremental

O componente de resposta deve consumir o stream de tokens do backend e renderizar incrementalmente à medida que chegam, sem aguardar a conclusão completa. Um hook customizado como `useStreamingResponse` encapsula a lógica de SSE ou fetch com streaming, expondo `content`, `isStreaming` e `error` para o componente. A renderização incremental transforma a experiência de "esperar um bloco" para "ver o conteúdo sendo criado", reduzindo percepção de latência.

## P02: Gestão de Estados Intermediários com Estado de Máquina

O fluxo de uma interação de IA tem múltiplos estados distintos — `idle`, `submitting`, `streaming`, `done`, `error`, `cancelled` — que devem ser gerenciados como uma máquina de estados, não como múltiplos booleanos independentes. A biblioteca XState ou um reducer simples com transições explícitas evita estados impossíveis como `isLoading && isError`. Estados intermediários bem definidos permitem renderizar a UI correta para cada fase do ciclo de vida.

## P03: Botão de Regeneração com Preservação de Contexto

A funcionalidade de regenerar uma resposta deve criar uma nova chamada ao backend preservando o histórico de contexto até o ponto anterior, sem reiniciar a sessão completa. O componente deve exibir "Regenerando..." enquanto a nova resposta está sendo gerada e substituir a resposta anterior de forma fluida sem salto visual (usando animação de transição). Um histórico de regenerações pode ser mantido para permitir "voltar" a uma versão anterior da resposta.

## P04: Exibição de Fontes e Referências com Citação Inline

Quando o backend retorna sources junto com a resposta (RAG), a UI deve exibí-las de forma acessível — citações numeradas inline no texto, painel colapsável de fontes ou tooltips com preview. As fontes devem ser linkáveis e, quando possível, mostrar o trecho específico relevante. A apresentação de fontes aumenta a confiança do usuário e permite verificação independente de afirmações da IA.

## P05: Componentes Reutilizáveis para Padrões Comuns de Fluxo de IA

A interface deve ter uma biblioteca de componentes especializados para IA: `<MessageBubble>`, `<StreamingText>`, `<SourcePanel>`, `<ConfidenceBadge>`, `<RegenerateButton>`, `<CancelButton>`. Componentização garante consistência visual, facilita manutenção e acelera o desenvolvimento de novas features. O storybook dos componentes deve incluir todas as variantes de estado: loading, streaming, done, error.

## P06: Carregamento Progressivo com Skeleton Screens para Histórico

Ao carregar o histórico de uma conversa longa, O primeiro conteúdo visível deve aparecer em menos de 200ms usando skeleton screens ou virtual scrolling com carregamento lazy. Não bloquear o render inicial enquanto todo o histórico é carregado é essencial para a percepção de performance. O scroll deve posicionar automaticamente na mensagem mais recente após o carregamento inicial.

## P07: Gestão de Estado de Conversa com Persistência Local

O estado da conversa ativa deve ser persistido em localStorage ou IndexedDB como fallback para quedas de rede ou recarregamentos acidentais. Ao recarregar a página, a sessão anterior deve ser recuperável sem perda de contexto visível ao usuário. A sincronização entre estado local e estado do servidor deve usar reconciliação otimista: exibir o estado local imediatamente e corrigir silenciosamente se o estado do servidor divergir.

## P08: Cancelamento de Geração com Feedback Visual Imediato

O botão de cancelamento deve estar sempre visível durante o streaming e acionar feedback visual imediato (mudança de ícone, mudança de cor, mensagem curta) antes mesmo da confirmação do servidor. O estado da UI deve transicionar para "cancelado" otimisticamente, com rollback apenas em caso de erro de cancelamento (que é raro). A resposta parcial gerada até o momento do cancelamento deve ser preservada para que o usuário decida se é suficiente.
