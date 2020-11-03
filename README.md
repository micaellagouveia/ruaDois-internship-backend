# Rua Dois - Estágio Backend

### Requisitos
1. CRUD de imobiliárias

   - [X] A imobiliária deve possuir nome e CNPJ.
   - [X] Rotas para listar todas as imobiliárias, criar uma imobiliária, ver uma imobiliária, atualizar uma imobiliária e deletar uma imobiliária.
     - [X] O CNPJ da imobiliária deve ser único no sistema.
     - [X] Todos os atributos podem ser atualizados.
2. CRUD de imóveis
    - [X] O imóvel deve possuir código, tipo de imóvel, número de quartos, um status para indicar se o imóvel está publicado na plataforma, um status para indicar se o imóvel foi alugado e a informação sobre qual imobiliária ele pertence.
    - [X] Rotas para listar todos os imóveis, criar um imóvel, ver um imóvel, atualizar um imóvel e deletar um imóvel.
    - [X] O campo de código deve ser informado pelo usuário e pode ser alterado.
    - [X] O campo de código deve ser único no sistema.
    - [X] Os tipos de imóveis que a API pode aceitar são: apartamento, casa, galpão e sala comercial.
    - [X] Sempre que um imóvel for alugado, ele deve ser automaticamente despublicado no sistema.
    - [X] Antes de cadastrar o imóvel, deve-se verificar se a imobiliária a qual ele pertence existe no sistema.
    - [X] Não podemos alterar a imobiliária a qual o imóvel pertence.
    - [X] A rota de listagem dos imóveis deve poder filtrar os imóveis pelo número mínimo de quartos.

## Como rodar
1. Para subir o container docker, execute o comando:

```sudo docker-compose up```

* Caso aconteça algum erro de módulo não encontrado, execute o comando:

```yarn install```

* Na primeira vez que for subir o container, o banco será criado, porém, caso precise subir novamente, o comando gera um erro de banco já criado. Para isso após subir o container pela primeira vez, é preciso alterar o script start no ```package.json``` para o seguinte comando:

``` "scripts": { "start": "yarn db:wait; nodemon --exec sucrase-node src/server.js" } ```

2. Para rodar as migrations, execute o seguinte comando (o container precisa estar no ar):

```sudo docker exec -it ruadois-api yarn db:migrate```

A aplicação estará disponível em ```localhost:3000```

### Endpoints
Na rota ```/``` da aplicação, estão documentadas todas as endpoints, explicitando todos os parâmetros que devem ser passados.


### Insomnia
Caso faça o teste com o Insomnia, há um arquivo compactado com as rotas já criadas com exemplos disponíveis. Basta importar o arquivo presente no diretório ```./insomnia``` no Insomnia :)

### cpf-cnpj-validator
Dependência responsável em validar o CNPJ. Ela fica responsável em validar o CNPJ e, caso seja válido, formatar da maneira correta. 

Por isso, é necessário passar um CNPJ válido (é possível gerar CNPJ pelo site [https://www.4devs.com.br/gerador_de_cnpj](https://www.4devs.com.br/gerador_de_cnpj)), podendo ser passado com pontuação ou não.

## Testes
Foram feitos testes para testar os retornos das requisições assim como seus status. Para rodar os testes, execute o seguinte comando (o container precisa estar no ar):

```sudo docker exec -it ruadois-api yarn test --coverage```

O script ```pretest``` faz a criação do banco em ambiente de teste. Caso for rodar os testes após criar o banco, deve-se alterar o script para o seguinte comando:

```"pretest": "NODE_ENV=test yarn db:migrate"```

Caso algum teste falhe e queira rodar novamente, você deve executar o seguinte comando para que as migrations em ambiente de testes sejam desfeitas (o container precisa estar no ar):

```sudo docker exec -it ruadois-api yarn posttest```

Logo após executar este comando, execute o comando que roda os testes novamente.