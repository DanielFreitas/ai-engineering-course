# Casos de Borda — Avaliação de LLMs

## EC01: Respostas Corretas com Formato Diferente
O modelo pode produzir uma resposta semanticamente correta mas com formato diferente do esperado (ex: "Positivo" vs "positivo" vs "POSITIVO"). A avaliação deve ser robusta a variações de capitalização e espaçamento quando o conteúdo é correto.

## EC02: LLM-as-Judge Discordando do Ground Truth
O modelo avaliador discorda da resposta esperada no dataset, mesmo quando a resposta do modelo avaliado está claramente correta. Isso indica problema no ground truth. Revise casos com discordância ao invés de confiar cegamente no juiz.

## EC03: Empate entre Versões de Prompt
Após comparar duas versões de prompt, os resultados são estatisticamente equivalentes. Nesse caso, prefira a versão mais simples, mais barata ou mais fácil de manter — não a "mais nova".

## EC04: Degradação de Modelo pelo Provedor
O modelo avaliado foi atualizado pelo provedor sem aviso (ex: `gpt-4o` recebeu uma atualização de patch). A avaliação pode revelar degradações que não foram causadas por mudanças no código. Sempre registre a versão exata do modelo nos resultados.

## EC05: Dataset com Viés de Curadoria
O dataset de avaliação foi construído com casos fáceis, de um único criador ou de um único domínio. A avaliação passa com 100%, mas o sistema falha em produção. Garanta diversidade de fontes e níveis de dificuldade no dataset.

## EC06: Avaliação de Componente Boa, End-to-End Ruim
O retrieval retorna chunks relevantes e o prompt extrai corretamente, mas a resposta final é insatisfatória. O problema está na integração entre componentes (ex: contexto injetado de forma que o modelo não consegue usar). A avaliação por componente não substitui a avaliação end-to-end.

## EC07: Variação por Temperatura
Com `temperature > 0`, a mesma entrada pode produzir resultados diferentes. Se a avaliação for executada com temperatura alta, os resultados variam entre execuções, tornando difícil determinar se uma mudança de prompt causou melhora real.

## EC08: Métricas Melhoram, Experiência do Usuário Piora
As métricas de avaliação offline melhoram, mas usuários reportam experiência pior. Isso indica que as métricas não capturam o que importa para o usuário. Correlacione métricas de avaliação com dados reais de uso periodicamente.
