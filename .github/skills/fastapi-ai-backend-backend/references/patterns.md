# Padrões — Backend de IA com FastAPI

## P01: Separação em Três Camadas
Estruture o serviço em três camadas: router (recebe e valida a requisição HTTP), service (lógica de negócio e orquestração), client (chamada ao modelo). Cada camada tem uma responsabilidade única e pode ser testada isoladamente.

## P02: Modelos Pydantic para Todos os Contratos
Defina modelos Pydantic para entrada, saída e erros do endpoint. Isso garante validação automática, documentação via OpenAPI e contratos explícitos entre frontend e backend. Nunca retorne dicionários não-tipados.

## P03: Injeção de Dependência para o LLM Client
Use o sistema de dependency injection do FastAPI para fornecer o LLM client ao serviço. Isso facilita a substituição do cliente por um mock em testes e centraliza a configuração. Nunca instancie o cliente dentro de um endpoint.

## P04: Prompts como Artefatos Carregados no Boot
Carregue os arquivos de prompt durante a inicialização da aplicação, não a cada requisição. Um erro de carregamento de prompt deve impedir o serviço de iniciar, não falhar silenciosamente em produção.

## P05: Medição de Tempo de Processamento
Meça e retorne o tempo de processamento em toda resposta de endpoint de IA. Isso permite ao cliente detectar degradações de performance e fornece dados para monitoramento sem instrumentação adicional.

## P06: Streaming via `StreamingResponse`
Para respostas longas de LLM, use `StreamingResponse` do FastAPI com um gerador assíncrono. Isso evita timeout de cliente por respostas longas e melhora a experiência do usuário final.

## P07: Exceções de LLM Mapeadas para HTTP Status
Defina um mapeamento explícito entre erros do LLM e códigos HTTP: `RateLimitError` → 429, `TimeoutError` → 504, `InvalidRequestError` → 400. O cliente deve conseguir distinguir os tipos de erro para agir corretamente.

## P08: Testes com Mock do LLM Client
Escreva testes de endpoint que substituem o LLM client por um mock. Testes de endpoint não devem fazer chamadas reais à API do modelo — são caros, lentos e não-determinísticos. Testes de integração reais ficam em uma suíte separada.
