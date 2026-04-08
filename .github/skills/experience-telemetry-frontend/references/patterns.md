# Padrões — Telemetria de Experiência (Frontend)

## P01: Rastreamento de Eventos de Uso por Ação do Usuário

Cada interação significativa com funcionalidades de IA deve gerar um evento de telemetria com contexto suficiente para análise posterior, incluindo tipo de ação, identificador de sessão, timestamp e estado da interface no momento do evento. Eventos bem estruturados permitem reconstruir a jornada completa do usuário e identificar padrões de uso. O esquema de eventos deve ser acordado entre produto, engenharia e dados antes da implementação.

## P02: Monitoramento de Abandono de Fluxo

Registrar em quais etapas do fluxo de IA o usuário abandona a interação — sem concluir a tarefa ou sem aceitar a resposta — revela pontos de atrito que não aparecem em métricas tradicionais de conversão. Eventos de abandono devem capturar o estado do fluxo no momento da saída, o tempo gasto e, se possível, o último elemento com o qual o usuário interagiu. Esses dados orientam decisões de redesign com base em comportamento real.

## P03: Registro de Aceitação e Rejeição de Respostas

Capturar se o usuário aceitou, editou ou rejeitou a resposta da IA é um dos sinais mais valiosos de qualidade percebida do modelo. Aceitação direta sugere alta utilidade; edição indica resposta parcialmente útil; rejeição ou regeneração indica falha de relevância ou precisão. Agregados desses eventos por tipo de prompt e versão de modelo alimentam ciclos de melhoria contínua.

## P04: Captura de Sinais de Frustração do Usuário

Eventos como cliques repetidos, scrolls rápidos, múltiplas regenerações em sequência, tempo elevado sem interação e saída rápida após exibição de resposta são sinais indiretos de frustração. Instrumentar esses comportamentos permite detectar problemas de experiência de forma proativa, antes que apareçam em pesquisas de satisfação. Os sinais devem ser agregados em índices de frustração por sessão e monitorados em dashboards de produto.

## P05: Correlação entre Experiência e Performance Percebida

Cruzar métricas de latência (TTFT, tempo total de resposta) com métricas de experiência (aceitação, abandono, regeneração) revela o impacto real da performance técnica na satisfação do usuário. Um modelo mais lento pode ter maior taxa de aceitação se a qualidade for superior — esse tipo de insight só emerge com correlação de dados. A telemetria de experiência deve ser enriquecida com atributos de performance no momento da coleta.

## P06: Telemetria Orientada ao Produto com Nomenclatura Semântica

Eventos de telemetria devem usar nomenclatura orientada ao domínio de produto, não ao technical stack. Nomes como `ai_suggestion_accepted` e `conversation_restarted` são mais úteis para stakeholders de produto do que `button_clicked` ou `api_response_received`. Uma taxonomia de eventos acordada e documentada garante que os dados sejam interpretáveis por toda a organização.

## P07: Sessões de Usuário e Sequências de Interação

Agrupar eventos dentro de sessões com identificadores únicos permite analisar sequências de interação e entender o comportamento do usuário ao longo de uma jornada completa. Métricas de sessão como duração, quantidade de turnos de conversa e taxa de conclusão de tarefa fornecem contexto que eventos isolados não oferecem. A gestão de sessão deve considerar inatividade, renovação de token e múltiplos dispositivos.

## P08: Métricas de Engajamento Diferenciadas por Tipo de IA

Funcionalidades distintas de IA — geração de texto, sugestão de código, busca semântica, resumo — requerem métricas de engajamento específicas para cada tipo. Uma busca bem-sucedida é diferente de uma sugestão aceita, que é diferente de um resumo lido até o final. Definir métricas de sucesso por funcionalidade garante que a telemetria reflita o valor real entregue em cada contexto.
