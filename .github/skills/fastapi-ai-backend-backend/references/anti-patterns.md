# Anti-Padrões — Backend de IA com FastAPI

## AP01: Lógica de IA no Router
Colocar construção de prompt, chamada ao modelo e parsing da resposta diretamente no router/endpoint. Isso mistura transporte HTTP com lógica de IA, tornando o código difícil de testar e impossível de reutilizar.

## AP02: LLM Client Instanciado por Requisição
Criar uma nova instância do LLM client a cada requisição, em vez de reutilizar uma instância configurada. Isso desperdiça recursos, ignora pooling de conexões e dificulta configuração centralizada como timeout e retries.

## AP03: Prompt Hardcoded no Service
Escrever o texto do prompt como string literal dentro do código do service. Quando o prompt precisar de ajuste (frequente), é necessário modificar código de negócio, re-deployar e arriscar regressões desnecessárias.

## AP04: Validação de Resposta com try/except Genérico
Usar `try: return json.loads(response) except: return {}` para lidar com respostas inválidas. Isso silencia erros, retorna dados incompletos ao cliente e torna impossível diagnosticar falhas. Valide com schema explícito e propague erros corretamente.

## AP05: Erros de LLM Expostos ao Cliente
Retornar a mensagem de erro do SDK do provedor diretamente ao cliente HTTP. Mensagens como "Invalid API key" ou stack traces internos não devem ser expostas. Mapeie erros internos para mensagens seguras e genéricas.

## AP06: Sem `response_model` no Endpoint
Omitir o parâmetro `response_model` no decorator do endpoint FastAPI. Sem `response_model`, o FastAPI não valida a resposta antes de retornar ao cliente, não documenta o schema na OpenAPI e aceita qualquer dicionário.

## AP07: Timeout Global Único
Usar o mesmo timeout para todos os endpoints, independentemente da complexidade da operação. Uma classificação simples e uma análise multi-etapa precisam de timeouts muito diferentes. Configure por endpoint ou por tipo de operação.

## AP08: Sem Health Check Específico para IA
Ter apenas um health check genérico `/health` que verifica se o servidor está de pé. Em serviços de IA, o servidor pode estar up mas o modelo inacessível. Implemente um `/health/ai` que valida a conectividade com o provedor de LLM.
