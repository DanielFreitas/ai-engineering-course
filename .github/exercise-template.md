# Template de Exercício Prático

> Modelo padrão para a seção de prática de cada módulo. Toda prática deve seguir esta estrutura.

---

## Prática: [Nome do Exercício]

**Módulo:** [número e nome]  
**Tempo estimado:** [15-30 minutos]  
**Nível:** N2 — Aplicado  

### Objetivo

[Uma frase descrevendo o que o aluno vai construir ou demonstrar.]

### O que você vai precisar

- [Dependência 1 — e.g., `openai` instalado, chave de API configurada]
- [Dependência 2]
- [Dados de entrada, se necessários — incluí-los inline no exercício]

### Passo a passo

**1. [Primeiro passo]**

```python
# Código do passo 1
```

**2. [Segundo passo]**

```python
# Código do passo 2
```

**3. [Terceiro passo — normalmente a execução e validação]**

```python
# Código final
```

### Saída esperada

```
# O que deve aparecer no terminal ou retorno da função
```

### Critério de conclusão

- [ ] [Critério 1 — específico e verificável]
- [ ] [Critério 2]
- [ ] [Critério 3 — opcional, para quem quiser aprofundar]

### Variações (opcional)

> Se quiser explorar mais, tente:
> - [Variação 1]
> - [Variação 2]

---

## Regras para quem preenche este template

1. A prática deve ser **auto-contida** — copiar e colar o código deve funcionar
2. Inclua todos os imports necessários
3. Use dados inline (strings, listas) — não dependa de arquivos externos
4. Se precisar de API key, use `os.environ.get("OPENAI_API_KEY")` e documente isso
5. O "passo a passo" deve ter no máximo 5 passos
6. O código total não deve passar de 50 linhas (sem contar comentários)
7. A saída esperada deve ser determinística ou ter variação controlada documentada
