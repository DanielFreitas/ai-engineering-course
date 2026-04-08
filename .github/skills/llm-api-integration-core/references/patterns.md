# Padrões — Integração com APIs de LLMs

## P01: Mensagem de Sistema Separada
Sempre use o papel `system` para instruções persistentes e `user` para entrada do usuário. Nunca misture instrução de sistema no conteúdo de usuário. Isso melhora a previsibilidade e facilita o versionamento de prompts.

## P02: Validação de Saída Estruturada
Toda resposta em JSON deve ser validada com um schema antes de ser usada. Use Pydantic ou JSON Schema para garantir que todos os campos obrigatórios estão presentes e com os tipos corretos. Nunca confie cegamente no JSON retornado pelo modelo.

## P03: Retentativa com Backoff Exponencial
Implemente retentativas automáticas com espera crescente (ex: 1s, 2s, 4s) para erros transitórios como rate limit (429) e timeout. Defina um número máximo de tentativas e registre cada falha antes de desistir.

## P04: Timeout Explícito
Sempre defina um timeout máximo para chamadas à API. Sem timeout, uma chamada travada pode bloquear a thread indefinidamente. Use valores como 30s para respostas síncronas e adapte para streaming.

## P05: Log de Tokens e Custo
Registre `prompt_tokens`, `completion_tokens` e `total_tokens` de cada chamada. Calcule e logue o custo estimado usando o preço por token do provedor. Isso permite detectar regressões de custo precocemente.

## P06: Streaming para Respostas Longas
Use streaming (SSE) quando a resposta pode levar mais de 2–3 segundos. Isso melhora a experiência do usuário final e permite cancelamento antecipado. Processe chunks de forma incremental.

## P07: Parametrização Defensiva
Defina `max_tokens` sempre para evitar respostas inesperadamente longas e custos altos. Use `temperature` baixa (0.0–0.3) para tarefas de extração e classificação; use temperatura maior apenas quando criatividade é desejada.

## P08: Abstração do Provedor
Encapsule as chamadas de API atrás de uma interface interna. Isso facilita a troca de provedor, mock em testes e comparações A/B. Nunca chame a SDK do provedor diretamente em vários pontos do código.
