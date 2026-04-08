# Padrões — Fundamentos de Aplicações com IA

## P01: Classificar antes de construir
Antes de decidir usar IA em uma feature, analisar se o problema é determinístico (→ sem IA), estocástico mas simples (→ regras/ML simples) ou complexo e semântico (→ LLM).

## P02: Usar LLM para o que ele faz bem
LLMs são excelentes em: texto → texto, texto → estrutura, semântica, linguagem natural ambígua, raciocínio de linguagem. Não são adequados para: cálculos precisos, dados em tempo real, operações determinísticas críticas.

## P03: Tratar LLM como componente de sistema
O modelo é uma peça de um sistema maior. Ele recebe entrada, produz saída, pode falhar, tem latência, tem custo. Design do sistema deve acomodar todas essas características.

## P04: Definir o padrão de uso antes de escolher o modelo
Os 6 padrões (geração, classificação, extração, transformação, assistente, RAG) têm requisitos diferentes de desempenho, custo e arquitetura. Escolher o padrão antes de escolher o modelo.

## P05: Modelar não determinismo como característica, não como bug
Projetar o sistema considerando que a mesma entrada pode gerar saídas diferentes. Isso afeta: testes, avaliação, experiência do usuário e confiança do sistema.

## P06: Medir custo em tokens desde o início
Toda feature com LLM tem um custo por requisição mensurável em tokens. Estimar antes de construir: prompts × usuários × frequência = custo mensal projetado.

## P07: Separar "o que o modelo faz" de "o que o produto faz"
O modelo gera texto. O produto decide o que fazer com esse texto. Essa separação é fundamental para testabilidade e evolução independente.

## P08: Usar fallbacks desde o design
Toda feature com LLM deve ter resposta padrão para: falha de API, resposta inválida, latência excessiva. Design de fallback é parte do design da feature.
