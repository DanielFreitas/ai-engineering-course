# Casos de Borda — LLMOps e Ciclo de Vida de Modelos

## CE01: Modelo Externo Descontinuado sem Aviso Antecipado Suficiente

**Cenário:** O provedor de LLM anuncia a descontinuação de um modelo com 30 dias de aviso — menos do que o necessário para validar e deployar um substituto.

**Comportamento esperado:** O sistema deve ter estratégia de fallback pré-validada para modelos alternativos e o processo de troca de modelo deve ser testável em staging com dados de produção. Monitorar os changelogs dos provedores e configurar alertas de deprecation é parte do processo de LLMOps.

**Risco sem tratamento:** O serviço começa a retornar erros 404 ou comportamentos inesperados após a data de descontinuação, sem plano de contingência pronto.

---

## CE02: Degradação Gradual de Qualidade sem Quebra de Métricas Técnicas

**Cenário:** Uma nova versão de modelo tem latência e taxa de erro técnico idênticos à versão anterior, mas os usuários estão rejeitando as respostas em taxa 20% maior — mudança não capturada por alertas baseados em métricas técnicas.

**Comportamento esperado:** O sistema de monitoramento deve incluir métricas de qualidade percebida (taxa de aceitação, regenerações, edições) além das métricas técnicas. Gates de rollout devem verificar métricas de experiência, não apenas de infraestrutura.

**Risco sem tratamento:** O rollout avança para 100% do tráfego sem que a degradação seja detectada, impactando todos os usuários por semanas.

---

## CE03: A/B Test com Distribuição de Tráfego Enviesada

**Cenário:** O sistema de roteamento de A/B test distribui o tráfego de forma não uniforme — usuários de determinada região ou com determinado comportamento ficam sobrerrepresentados em um dos grupos.

**Comportamento esperado:** O sistema deve implementar randomização estratificada para garantir distribuição estatisticamente equivalente entre grupos. Dashboards de A/B test devem incluir análise de balanceamento de grupos como etapa de validação antes de interpretar resultados.

**Risco sem tratamento:** Decisões de rollout são tomadas com base em dados enviesados, levando à escolha do modelo errado.

---

## CE04: Rollback Automático Aciona Loop de Deploy-Rollback

**Cenário:** Um deploy novo é acionado logo após rollback automático — por pipeline CI/CD automático — e o novo deploy também falha, triggering outro rollback, criando um loop.

**Comportamento esperado:** Após rollback automático, o sistema deve bloquear novos deploys automáticos da mesma versão e exigir intervenção manual com análise da causa raiz. O mecanismo de circuit breaker de deploy deve ser implementado no pipeline de CI/CD.

**Risco sem tratamento:** O sistema alterna entre versões defeituosas indefinidamente, criando instabilidade e consumindo recursos de inferência desnecessariamente.

---

## CE05: Custo Explode após Rollout de Novo Modelo

**Cenário:** Um novo modelo mais preciso é deployado com sucesso em termos de qualidade, mas aumenta o custo por requisição em 3x — impacto não previsto porque o custo não estava nos critérios do gate de rollout.

**Comportamento esperado:** O gate de qualidade deve incluir um threshold de custo máximo por request. Dashboards de custo devem mostrar projeção de custo mensal para o nível de tráfego atual antes do rollout completo.

**Risco sem tratamento:** O custo operacional mensal aumenta significativamente sem que a equipe perceba até receber a fatura do provedor.

---

## CE06: Prompt Atualizado com Comportamento Regressivo em Casos de Borda

**Cenário:** Um novo prompt melhora as métricas médias de qualidade, mas introduz regressões em casos de borda específicos — inputs longos, idiomas minoritários, consultas ambíguas — que não estavam representados no conjunto de avaliação.

**Comportamento esperado:** O processo de avaliação de prompts deve incluir um conjunto de casos de borda conhecidos com resultados esperados definidos. Regressões em casos de borda devem bloquear o rollout mesmo que as métricas gerais melhorem.

**Risco sem tratamento:** Usuários que dependem dos casos de borda afetados reportam regressão de comportamento sem que o time tenha know-how para identificar a causa raiz.

---

## CE07: Versão de Modelo Ativa Diverge entre Regiões

**Cenário:** Por diferenças de timing no pipeline de deploy ou restrições regulatórias regionais, versões diferentes do modelo estão ativas simultaneamente em diferentes regiões, resultando em comportamentos distintos para o mesmo input.

**Comportamento esperado:** O sistema deve rastrear qual versão está ativa em cada região e incluir o identificador de versão em todos os logs e traces. Suporte e engenharia devem ter visibilidade de qual versão atendeu cada request ao investigar problemas.

**Risco sem tratamento:** Inconsistências de comportamento são reportadas por usuários, equipe não consegue reproduzir o problema porque está usando a versão diferente da que o usuário encontrou.
