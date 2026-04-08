# Casos de Borda — Arquitetura Assíncrona com Pub/Sub para IA

## CE01: Mensagem Publicada mas Nunca Consumida por Subscriber Inativo

**Cenário:** O worker de embedding está offline (por falha de deploy ou crash) quando uma rajada de documentos é enviada. As mensagens acumulam na fila por horas. Quando o worker volta, começa a processar a fila acumulada, mas os documentos mais antigos já expiraram o TTL de retenção da fila.

**Comportamento esperado:** O TTL de retenção das mensagens deve ser configurado para ser significativamente maior que o tempo esperado de recuperação do worker (ex: 7 dias, não 1 hora). Alertas de consumer lag devem disparar quando mensagens ficam pendentes por mais de N minutos. A recuperação de worker deve ser monitorada e alertada como incidente quando off por mais de um threshold definido.

**Risco sem tratamento:** Documentos de usuários nunca são indexados silenciosamente — o usuário acredita que o sistema está funcionando pois o upload teve sucesso, mas a busca nunca retorna o conteúdo do documento enviado.

---

## CE02: Processamento Duplicado por Falha de Acknowledgment

**Cenário:** O worker processa uma mensagem com sucesso (gera embeddings, escreve no banco) mas falha ao enviar o acknowledgment para o broker por timeout de rede. O broker reenvia a mensagem, e o worker a processa novamente.

**Comportamento esperado:** O worker deve verificar idempotência antes de processar: consulta a tabela `processed_messages` pelo `message_id`. Se o registro existir, a mensagem é acknowledged sem reprocessamento. A lógica de negócio (upsert em vez de insert) deve ser idempotente por natureza como segunda camada de proteção.

**Risco sem tratamento:** Embeddings duplicados no índice vetorial causam resultados de busca degradados e inflam custos de armazenamento e tokens consumidos.

---

## CE03: Mensagem Corrompida Causa Loop de Retry Exaustivo

**Cenário:** Um documento enviado tem JSON malformado no payload. O worker tenta processar, falha com erro de parsing, faz retry 5 vezes (esgotando o máximo configurado) e a mensagem vai para a DLQ. Porém, o documento real do usuário nunca é processado e nenhuma notificação de falha chega ao usuário.

**Comportamento esperado:** O sistema deve implementar notificação proativa ao usuário quando uma tarefa vai para a DLQ — e-mail, notificação in-app ou status de erro visível no produto. O processo de operações deve ter procedimento de análise periódica da DLQ e reprocessamento após correção. Mensagens malformadas devem ser identificadas como tal para distinguir de erros recuperáveis.

**Risco sem tratamento:** Falhas de processamento são invisíveis para o usuário, que aguarda indefinidamente um resultado que nunca chegará.

---

## CE04: Explosão de Backlog por Pico Inesperado de Volume

**Cenário:** Um evento de marketing gera 50x o volume normal de uploads em 1 hora. A fila de embeddings acumula milhões de mensagens e o consumer lag chega a 6 horas para os documentos enviados no pico.

**Comportamento esperado:** O sistema de auto-scaling dos workers deve reagir ao aumento do consumer lag, escalando horizontalmente dentro dos limites configurados. O máximo de workers deve ser dimensionado para o pico esperado com margem de segurança. Durante períodos de alto lag, o usuário deve ver status "em processamento" com tempo estimado atualizado periodicamente.

**Risco sem tratamento:** Usuários que enviaram documentos durante o pico esperam horas pelo processamento sem qualquer feedback sobre o status, gerando tickets de suporte massivos e abandono do produto.

---

## CE05: Versão de Schema Incompatível entre Producer e Consumer

**Cenário:** O serviço de documentos é atualizado e passa a publicar mensagens no schema v2 (com campo `processing_config` novo como obrigatório). O worker de embedding ainda está na versão antiga e não consegue deserializar as mensagens v2.

**Comportamento esperado:** Mudanças de schema devem seguir compatibilidade backward: novos campos obrigatórios com default value ou campos opcionais. Versão do schema deve estar no envelope da mensagem. Workers devem ser atualizados antes dos producers que publicam a nova versão. Deploy de mudanças de schema deve ser coordenado com verificações de compatibilidade automatizadas no pipeline de CI.

**Risco sem tratamento:** Todas as mensagens publicadas após o deploy do producer ficam paradas na fila com erro de deserialização, requerendo rollback de emergência e reprocessamento manual.

---

## CE06: Worker Processa Mensagem mas Transação de Banco Falha sem Rollback de Estado

**Cenário:** O worker de embedding gera embeddings com sucesso (custando tokens de LLM), tenta inserir no banco vetorial, a transação falha por violação de constraint, mas a mensagem já foi acknowledged. Os embeddings foram gerados e pagos, mas nunca persistidos.

**Comportamento esperado:** A sequência de operações deve ser: 1) processar e persistir → 2) acknowledge. O acknowledge só deve ocorrer após confirmação de persistência bem-sucedida. Se a persistência falhar, a mensagem não deve ser acknowledged e será reenviada pelo broker. O custo de tokens desperdiçados em retries deve ser considerado no design — prefira operações que verificam estado antes de chamar a API do modelo.

**Risco sem tratamento:** Custo de tokens é pago mas os resultados nunca são armazenados, criando discrepância entre custo e valor entregue que é difícil de rastrear.

---

## CE07: Mensagem Gigante Excede Limite de Tamanho do Broker

**Cenário:** Um documento muito grande é chunkado em 10.000 chunks, todos incluídos em uma única mensagem de embedding request. A mensagem tem 15MB de tamanho e excede o limite de 10MB do broker, sendo rejeitada com erro.

**Comportamento esperado:** Mensagens com muitos chunks devem ser divididas em batches de tamanho máximo configurável antes da publicação. O sistema deve validar o tamanho estimado da mensagem antes de publicar e aplicar chunking de mensagem automaticamente. O design do schema deve prever que o campo `chunks` pode ter N mensagens separadas se necessário, todas com o mesmo `document_id` para correlação.

**Risco sem tratamento:** Documentos grandes nunca são processados — os usuários que enviam documentos maiores encontram um limite silencioso não documentado no produto.
