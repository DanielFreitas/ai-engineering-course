# Glossário Compartilhado

> Este arquivo é mantido pelo orquestrador e deve ser consultado por todas as skills antes de finalizar seu conteúdo. Vocabulário definido aqui não pode ser contrariado em nenhum módulo.

## Status: em construção — será estabilizado após o checkpoint do núcleo

---

## Termos Canônicos

### A

**Agente (Agent)**
Sistema baseado em LLM que executa tarefas em múltiplos passos, podendo usar ferramentas, tomar decisões e adaptar seu comportamento com base em resultados intermediários. Distingue-se de fluxos simples pela presença de loop de raciocínio e ação.

**Alucinação (Hallucination)**
Geração de conteúdo pelo modelo que é factualmente incorreto, inventado ou impossível de verificar. Não é um erro de software — é uma característica probabilística dos LLMs.

### C

**Chunking**
Processo de divisão de documentos longos em fragmentos menores para indexação vetorial. A estratégia de chunking (tamanho, overlap, semântico vs. fixo) impacta diretamente a qualidade do RAG.

**Contexto (Context / Context Window)**
Janela de tokens que o modelo pode "ver" em uma única inferência. Inclui o system prompt, histórico de mensagens, resultados de ferramentas e o conteúdo recuperado por RAG.

**Contrato de API (API Contract)**
Definição formal e versionada de entrada e saída de um endpoint, incluindo tipos, validações e comportamento esperado em casos de erro.

### E

**Embedding**
Representação vetorial densa de um texto, imagem ou outro dado, capturando significado semântico. Usada para busca por similaridade, clustering e recuperação de contexto.

### F

**Fallback**
Comportamento alternativo acionado quando o fluxo principal falha ou não atende a um critério mínimo de qualidade. Em LLMOps, pode significar usar um modelo mais barato, uma resposta pré-definida ou uma versão anterior do sistema.

**Few-shot prompting**
Técnica de prompting que inclui exemplos no contexto para guiar o comportamento do modelo sem ajuste de pesos (fine-tuning).

**Function calling / Tool calling**
Capacidade do modelo de gerar uma chamada estruturada a uma função ou ferramenta externa, em vez de texto livre. O modelo não executa a função — ele declara a intenção; o sistema host executa.

### G

**Grounding**
Ancoragem da resposta do modelo a uma fonte de informação verificável (documento, banco de dados, API). Reduz alucinações ao forçar o modelo a usar contexto fornecido.

**Guardrail**
Mecanismo de segurança que valida entrada ou saída do modelo. Pode ser baseado em regras, outro modelo classificador, ou lista de bloqueio.

### L

**Latência de inferência**
Tempo entre o envio de uma requisição ao modelo e o recebimento da primeira resposta (ou token, em streaming). Métrica crítica para UX.

**LLM (Large Language Model)**
Modelo de linguagem de grande escala treinado em vastos corpora de texto. No contexto deste curso, o termo se refere a modelos usados via API (OpenAI, Anthropic, Google, etc.).

**LLMOps**
Práticas operacionais específicas para sistemas com LLMs: versionamento de prompts, monitoramento de qualidade, rollout, A/B testing e ciclo de vida de modelos.

### M

**Memória (Memory)**
Estado preservado entre interações. Pode ser de curto prazo (histórico da conversa ativa) ou longo prazo (informações persistidas em banco de dados e recuperadas por RAG ou busca direta).

### N

**Não determinismo**
Propriedade dos LLMs de gerar respostas diferentes para a mesma entrada, mesmo com os mesmos parâmetros. Temperatura = 0 reduz mas não elimina essa variabilidade.

### O

**Observabilidade**
Capacidade de entender o estado interno de um sistema a partir de seus outputs externos (logs, traces, métricas). Em sistemas com IA, inclui rastrear prompts, latências, custos e qualidade de resposta.

### P

**Pipeline**
Sequência de etapas de processamento, tipicamente com transformações de dados. Em AI Engineering, pipelines podem incluir chamadas de modelo, busca vetorial, pós-processamento e validação.

**Prompt**
Entrada fornecida ao modelo. Divide-se em: `system prompt` (instrução global de comportamento) e `user prompt` (entrada específica da interação).

**Prompt injection**
Ataque em que um usuário insere instrução maliciosa no prompt de usuário buscando sobrescrever o system prompt ou obter comportamento não autorizado.

### R

**RAG (Retrieval-Augmented Generation)**
Padrão arquitetural que combina recuperação de informação (busca vetorial ou lexical) com geração de texto. O modelo recebe o resultado da busca como contexto antes de gerar a resposta.

**Reranking**
Etapa pós-recuperação que reordena os resultados de busca usando um modelo mais preciso (mas mais lento) antes de passá-los ao LLM.

**Retry com backoff exponencial**
Estratégia de tentativas repetidas com intervalo crescente entre falhas temporárias de API. Padrão para lidar com rate limit e timeouts.

### S

**Span**
Unidade de trabalho rastreável em OpenTelemetry. Em sistemas com LLM, um span pode representar uma chamada de modelo, uma busca vetorial ou uma execução de ferramenta.

**Streaming**
Técnica de entrega incremental de tokens à medida que são gerados, em vez de aguardar a resposta completa. Reduz percepção de latência no frontend.

**Structured output**
Saída do modelo em formato estruturado (JSON, etc.), forçada por schema de validação ou instrução explícita no prompt. Aumenta previsibilidade e facilita integração.

### T

**Token**
Unidade básica de entrada/saída dos LLMs. Aproximadamente 0.75 palavras em inglês, variando por idioma e tokenizador. Custo e latência são medidos em tokens.

**Tool calling** → ver *Function calling*

**Trace**
Representação completa de uma requisição distribuída, composta por múltiplos spans. Em sistemas com IA, um trace pode atravessar frontend → backend → modelo → ferramenta.

### V

**Vetor (Vector)**
→ ver *Embedding*

**Versionamento de prompt**
Prática de tratar prompts como artefatos de código: com controle de versão, testes de regressão e processo de deploy.

---

## Decisões de Nomenclatura

| Termo a evitar | Usar em vez disso |
|----------------|-------------------|
| "IA generativa" (genérico) | LLM, modelo, sistema com IA |
| "treinamento" (quando é inferência) | inferência, chamada de modelo |
| "inteligente" (antropomorfismo vago) | descrever o comportamento específico |
| "modelo pensa" | "modelo gera", "modelo produz" |
| "chatbot" (quando é mais complexo) | assistente, agente, sistema conversacional |
