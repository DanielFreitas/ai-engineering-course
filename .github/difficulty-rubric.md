# Rubrica de Dificuldade

> Critérios para calibrar profundidade e complexidade de forma consistente entre os 20 módulos.

## Níveis de Dificuldade

### N1 — Conceitual
- Explica o "o quê" e "por quê"
- Sem implementação obrigatória
- Analogias e exemplos de alto nível
- **Uso:** introduções, visão geral

### N2 — Aplicado
- Explica o "como" com exemplo funcional
- Código demonstrativo (pode ser simplificado)
- Aluno entende o mecanismo, não apenas o resultado
- **Uso:** maioria dos conteúdos deste curso

### N3 — Implementação real
- Código pronto para adaptar para produção
- Inclui tratamento de erros, edge cases e trade-offs
- Requer conhecimento de N2
- **Uso:** seções de prática avançada, módulos de backend

## Distribuição esperada por módulo

| Módulo | N1 | N2 | N3 |
|--------|----|----|-----|
| Núcleo (1-7) | 30% | 50% | 20% |
| Backend (8-16) | 15% | 40% | 45% |
| Frontend (17-20) | 20% | 50% | 30% |

## Critérios de Calibragem

### O módulo está muito fácil se:
- Não há nenhum exemplo de código real
- Não apresenta trade-offs ou limitações
- Qualquer engenheiro júnior já sabe tudo sem precisar do módulo
- A prática não exige nenhuma decisão técnica

### O módulo está muito difícil se:
- A prática leva mais de 1h para um engenheiro com experiência moderada
- O módulo introduz mais de 3 conceitos novos simultaneamente
- Há dependências implícitas de módulos que ainda não foram vistos
- Requer conhecimento de algoritmos avançados de ML

## Consistência entre trilhas

- Módulos backend (8-16) devem ter profundidade equivalente entre si (± 1 nível)
- Módulos frontend (17-20) devem ser mais leves em código que backend
- O núcleo (1-7) deve ser acessível para qualquer engenheiro, independente de especialização

## Validação da prática

Toda prática possui dificuldade N2 e deve ser verificável por:
1. Resultado visual ou output no terminal
2. Teste simples (assert ou validação manual)
3. Checklist de critérios mínimos

Práticas **NÃO** devem exigir:
- Configuração de infraestrutura complexa
- Conta paga em serviços de nuvem (usar mocks/stubs quando necessário)
- Mais de 50 linhas de código novo
