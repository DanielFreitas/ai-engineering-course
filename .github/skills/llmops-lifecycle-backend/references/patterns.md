# Padrões — LLMOps e Ciclo de Vida de Modelos

## P01: Versionamento Explícito de Modelos e Prompts

Todo artefato de IA em produção — modelo, prompt, configuração de temperatura, system prompt — deve ter versão explícita com identificador único e registro de mudanças. Versionamento de prompts é tão crítico quanto versionamento de código: uma alteração no system prompt pode impactar drasticamente o comportamento do sistema. O histórico de versões deve ser auditável e permitir comparação de resultados entre versões.

## P02: Rollout Gradual com Feature Flags e Traffic Splitting

Novas versões de modelos ou prompts devem ser introduzidas em produção de forma gradual — começando com 1-5% do tráfego e aumentando progressivamente conforme as métricas de qualidade se estabilizam. Feature flags permitem controlar o rollout sem redeploy e facilitam rollback imediato. O ramp-up deve ser automatizado com gates de qualidade que bloqueiam progressão se métricas críticas degradarem.

## P03: Fallback Automático para Modelos Alternativos

O sistema deve detectar indisponibilidade ou degradação de performance do modelo primário e redirecionar automaticamente para um modelo de fallback (geralmente mais simples, rápido e barato). A estratégia de fallback deve ser hierárquica: modelo preferido → modelo alternativo → resposta de erro informativa. Métricas de uso de fallback devem ser monitoradas para detectar problemas recorrentes.

## P04: Estratégia Multi-Modelo por Caso de Uso

Diferentes casos de uso dentro da mesma plataforma podem se beneficiar de modelos distintos: um modelo leve para tarefas de classificação simples, um modelo poderoso para raciocínio complexo, um modelo especializado para domínios específicos. O roteamento inteligente de requisições para o modelo mais adequado reduz custo sem sacrificar qualidade. A estratégia multi-modelo deve considerar latência, custo e capacidades de cada modelo.

## P05: Testes A/B de Modelos e Prompts em Produção

Comparar o desempenho de duas versões de modelo ou prompt com usuários reais — dividindo o tráfego entre grupos de controle e experimento — fornece dados mais confiáveis do que avaliações offline. O design experimental deve incluir métricas claras de sucesso, duração definida e critérios de parada antecipada. Resultados dos A/B tests devem alimentar decisões de rollout definitivo.

## P06: Rollback Automatizado Baseado em Métricas de Qualidade

O sistema deve monitorar continuamente métricas de qualidade pós-deploy — taxa de erro, latência, scores de avaliação, taxa de rejeição pelo usuário — e acionar rollback automático quando os valores ultrapassam thresholds pré-definidos. O rollback deve ser imediato, sem necessidade de intervenção humana para casos de degradação severa. Equipe deve ser notificada automaticamente quando rollback ocorrer.

## P07: Monitoramento Contínuo de Qualidade Pós-Deploy

A qualidade de um modelo em produção não é estática: deriva de dados, comportamentos do usuário e mudanças no contexto externo. Pipelines de avaliação contínua, amostras de respostas avaliadas periodicamente e rastreamento de métricas de longo prazo são necessários para detectar degradação gradual. Alertas baseados em tendências (não apenas em thresholds absolutos) são mais eficazes para detectar drift.

## P08: Custo como Critério Arquitetural de Primeira Classe

O custo de inferência — tokens de entrada e saída, número de chamadas, modelos utilizados — deve ser monitorado e gerenciado como um requisito arquitetural, não como uma preocupação posterior. Dashboards de custo por feature, por usuário e por versão de modelo permitem decisões informadas sobre trade-offs de qualidade-custo. Budgets de custo por endpoint devem ser definidos e alertas configurados para desvios.
