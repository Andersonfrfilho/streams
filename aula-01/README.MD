Funcionamento do streams

1 - Fazer sob demanda le aos poucos
 - seu video é tranformado em buffer
   - buffer é um array de bytes
   - seu video é lido por bytes
   - esses pedaços são chamados de chunks
   - cada chunk é enviado para o browser
   - chunk conseguimos transformar seus dados manipulalos e enviar para o browser
    - seu video é lido por chunks
  outro exemplos é se temos um pepita de ouro grande
    - se enviar os dados de uma vez só para o browser isso quebraria o sistema por esgotamento de memoria
    - no exemplo da pepita dividimos ela em partes e então podemos limpar, adicionar produtos filtrar
    - no javascript, essas etapas de transformações são os transformsStreams 
    - Readable Stream é a fonte de dados
    - Transform Stream é a etapa de transformação
    - Writeable Stream é o destino de dados (qualquer lugar que ele precisa ir para o processo)
    - esse funil de processos chamamos de pipeline
    - Em outras linguagem chamados ETLs (Extract, Transform, Load)
    - 