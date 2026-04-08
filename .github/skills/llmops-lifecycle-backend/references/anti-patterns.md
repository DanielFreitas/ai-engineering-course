# Anti-Padrões — LLMOps e Ciclo de Vida de Modelos

## AP01: Deploy Direto em Produção sem Versionamento

Substituir o modelo ou prompt em produção sem criar uma versão identificável do artefato anterior torna o rollback impossível e a auditoria inviável. Quando o comportamento do sistema muda sem versionamento, não há como determinar se a mudança foi causada pelo modelo, pelo prompt, pela configuração ou por outra variável. Todo deploy deve incrementar a versão e registrar o que mudou.

## AP02: Modelo Único sem Estratégia de Fallback

Depender de um único modelo ou provedor sem plano de contingência cria um ponto único de falha crítico. Interrupções de APIs de LLM acontecem, limites de rate são atingidos em picos de tráfego e modelos são descontinuados sem aviso suficiente. A ausência de fallback transforma toda indisponibilidade do modelo em indisponibilidade total do produto.

## AP03: Rollout Completo Imediato sem Validação em Produção

Implantar uma nova versão de modelo para 100% dos usuários imediatamente, sem período de validação em amostra menor do tráfego, é uma prática de alto risco. Degradações de qualidade que não aparecem em ambientes de teste podem se manifestar com a diversidade de inputs de produção. Um rollout de 100% sem staging elimina a possibilidade de conter o impacto de problemas antes que afetem todos os usuários.

## AP04: Ignorar Custo de Inferência na Escolha de Modelos

Selecionar o modelo mais poderoso disponível para todos os casos de uso sem análise de custo-benefício resulta em despesas de infraestrutura desnecessárias. Tarefas simples de classificação ou extração de dados resolvidas por modelos de menor custo não precisam do modelo mais caro. A ausência de otimização de custo pode tornar o produto economicamente inviável à medida que escala.

## AP05: Ausência de Monitoramento de Qualidade Pós-Deploy

Tratar o deploy de um modelo como evento de "fire and forget" — sem monitoramento contínuo de métricas de qualidade — é a principal causa de degradação silenciosa não detectada. Modelos derivam ao longo do tempo: inputs mudam, contextos evoluem e o que funcionava bem no lançamento pode se deteriorar gradualmente. Sem monitoramento, problemas só são identificados quando usuários reclamam publicamente.

## AP06: Prompts de Produção sem Controle de Versão

Gerenciar prompts de sistema como strings hardcoded no código ou em arquivos sem versionamento torna impossível rastrear qual prompt estava ativo em determinado momento e correlacionar mudanças de comportamento com mudanças de prompt. Prompts devem ser tratados como artefatos de primeira classe — armazenados, versionados e deployados com o mesmo rigor que código.

## AP07: Rollback Exclusivamente Manual sob Pressão de Incidente

Dependar de processo manual de rollback durante incidentes — com engenheiro acordando de madrugada para reverter um deploy — aumenta o MTTR e o risco de erro humano sob pressão. Em sistemas de produção críticos, rollback deve ser automatizado para casos de degradação severa. Processos manuais são complementares, não substitutos, da automação.
