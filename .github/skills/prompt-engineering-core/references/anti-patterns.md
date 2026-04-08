# Anti-Padrões — Engenharia de Prompts

## AP01: Prompt Monolítico Sem Estrutura
Colocar todas as instruções em um único bloco de texto sem delimitadores ou organização. Prompts não estruturados são difíceis de manter, versionar e depurar. Separe instruções, exemplos e entrada de forma clara.

## AP02: Instruções Ambíguas
Usar termos vagos como "seja conciso", "responda adequadamente" ou "use seu julgamento". O modelo interpreta ambiguidade de formas imprevisíveis. Toda instrução deve ter critério objetivo (ex: "máximo de 3 frases", "retorne apenas JSON").

## AP03: Prompt Hardcoded no Código de Negócio
Escrever o texto do prompt diretamente no código Python/JavaScript, misturado com lógica de negócio. Quando o prompt precisar mudar (frequentemente), há risco de regressão e não há história de mudança rastreável.

## AP04: Exemplos Few-Shot de Baixa Qualidade
Usar exemplos triviais ou construídos às pressas que não representam a distribuição real de entrada. Exemplos ruins ensinam o modelo a lidar com casos que não existem na prática, desperdiçando espaço de contexto.

## AP05: Ignorar Validação de Saída
Presumir que se o prompt pede JSON, a resposta sempre será JSON válido. Prompts mudam, modelos mudam, dados de entrada variam. Sempre valide a saída antes de usá-la.

## AP06: Prompt Excessivamente Longo
Criar system prompts com centenas de instruções "por precaução". Prompts longos aumentam custo, podem diluir atenção do modelo e são difíceis de manter. Cada instrução deve ter justificativa clara.

## AP07: Misturar Instruções de Sistema no User Message
Incluir instruções de comportamento na mensagem do usuário em vez do system prompt. Isso viola a separação de responsabilidades, dificulta versionamento e pode ser explorado por prompt injection.

## AP08: Sem Controle de Versão de Prompt
Alterar prompts em produção sem documentar a mudança, sem comparar com a versão anterior e sem executar casos de teste. Isso torna impossível identificar a causa de degradações de qualidade.
