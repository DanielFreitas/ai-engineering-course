# Padrões — Arquitetura de Sistemas de IA

## P01: Orquestrador Separado da Lógica de Negócio
O serviço de orquestração de IA (que monta contexto, chama o modelo, processa resposta) deve ser separado da lógica de negócio do domínio. Isso permite evoluir a IA de forma independente e facilita testes.

## P02: Diagrama de Componentes Antes de Implementar
Antes de implementar uma feature de IA, produza um diagrama simples com os componentes, responsabilidades e fluxo de dados. Isso evita acoplamentos indesejados descobertos apenas durante a implementação.

## P03: Estado Explícito e Dono Definido
Cada parte do estado (histórico de sessão, preferências do usuário, contexto de tarefa) deve ter um dono claro — qual serviço lê, qual serviço escreve, onde é persistido. Estado sem dono se torna inconsistente.

## P04: Observabilidade Como Requisito
Inclua pontos de observabilidade (traces, logs estruturados, métricas) no design arquitetural, não como adição posterior. Cada chamada ao modelo deve ser rastreável, cada erro deve ser capturado.

## P05: Fluxo Assíncrono para Alta Latência
Operações de IA que levam mais de 2–3 segundos devem ser implementadas de forma assíncrona. O usuário não deve aguardar em uma requisição HTTP bloqueante. Use polling, SSE ou WebSocket para feedback progressivo.

## P06: Fallback Arquitetural
Projete o que acontece quando o modelo não está disponível. Fallback pode ser um modelo alternativo, uma resposta padrão, ou desabilitar a feature de IA graciosamente. O sistema nunca deve simplesmente travar.

## P07: Separação entre Camada de Prompt e Lógica
A construção e versionamento de prompts deve ser separada da lógica de serviço. Prompts são artefatos que evoluem independentemente do código. Carregue-os como configuração, não como strings hardcoded.

## P08: Proteção de Dados em Todas as Camadas
No design arquitetural, identifique onde dados sensíveis trafegam (entre frontend e backend, no contexto do modelo, nos logs). Cada camada deve ter tratamento explícito: criptografia, mascaramento ou eliminação.
