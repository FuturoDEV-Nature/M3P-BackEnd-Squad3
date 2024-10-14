## Projeto final - Módulo 03 - FloripaMaisTec - FuturoDEV/Nature - **Squad 3**

## Descrição do Projeto 📌
API Rest para integração de dados no projeto final do módulo 3 do curso Analista de Desenvolvimento Web do Sesi/Senai.

# API Rest **Natureza365** - *Plataforma de Preservação da Natureza* 🌳


## Apresentação 🌿
Bem-vindo ao **Natureza365**, que foi desenvolvida com o objetivo de incentivar a preservação ambiental por meio de uma plataforma colaborativa, onde os usuários podem cadastrar locais de preservação da natureza e explorar os já existentes. A aplicação facilita o compartilhamento de informações sobre áreas naturais, trilhas, parques ecológicos, reservas ambientais, praias e outros locais de interesse e permite que os usuários contribuam para a conscientização e preservação desses locais.


## Problema que Resolve 💡
O **Natureza365** resolve o problema de gerenciamento e organização de informações sobre locais da natureza, permitindo que os usuários cadastrem, visualizem, editem e excluam dados de forma eficiente e centralizada.


## Funcionalidades 💻
- Adicionar usuários e locais
- Login e autenticação
- Visualizar listas de locais
- Excluir e editar itens cadastrados


## Tela Dashboard 🙋
Imagem da aplicação rodando em conjunto com o projeto do Front-End:
- <https://github.com/FuturoDEV-Nature/M3P-FrontEnd-Squad3>

![image](./src/imgs/dashboard.png)


## Tecnologias utilizadas 💻 
- **Back-End**: JavaScript, Node.js, Express, Sequelize, Seeders, Axios, Jsonwebtoken, Swagger
- **Ferramentas**: Visual Studio Code, GitHub, Trello, Postman e PgAdmin4.


## Banco de dados ☁️
 Para esta aplicação, usamos o banco de dados PostgreSql, sendo necessária a instalação do [PostgreSql](https://www.postgresql.org/) e do [pgAdmin4](https://www.pgadmin.org/download/) na máquina.


## Rodar o repositório ⚙️

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Para trabalhar com o código, indicamos o [VSCode](https://code.visualstudio.com/)

### Clone o repositório
`git clone <https://github.com/FuturoDEV-Nature/M3P-BackEnd-Squad3>`

### Acesse a pasta do projeto no terminal/cmd
 `cd M3P-BackEnd-Squad3`

### configure o arquivo .env
No diretório principal, crie um arquivo .env e cole dentro dele o texto que você extrairá do arquivo .env_example. Em seguida altere seu login e senha do postgres no arquivo .env e salve-o.
 `cp .env_example .env`

### Instale as dependências
 `npm install`

### Rode as migrations
 `sequelize db:migrate`
ou
 `npx sequelize db:migrate`


### Rode os seeders na seguinte ordem:
- 1º. `npx sequelize-cli db:seed --seed 01_Usuarios.seeder.js`
- 2º. `npx sequelize-cli db:seed --seed 02_Locais.seeder.js`


### Execute a aplicação em modo de desenvolvimento
 `npm run start:dev`
 ou
 `node src/index.js`


### O servidor inciará na porta:3000 - acesse <http://localhost:3000>


## Documentação da API com Swagger 📖
 Para a documentação desta API utilizamos o [Swagger](https://swagger.io/), que é um conjunto de ferramentas criada pela SmartBear para ajudar desenvolvedores na documentação de API's.


### Para Acessar a Interface Gráfica do Swagger
 Com o servidor rodando - acesse <http://localhost:3000/docs>


## Para Acessar a Plataforma **Natureza365** 🌳
Para conferir a plataforma com os seus recursos completos, siga os passos abaixo após rodar este repositório:
1. Clone o repositório do Front-End:
- <https://github.com/FuturoDEV-Nature/M3P-FrontEnd-Squad3>
 ou

 `git clone <https://github.com/FuturoDEV-Nature/M3P-FrontEnd-Squad3>`

2. Siga as Instruções do Repositório do Front-End:
- Acesse o diretório do repositório clonado e siga as instruções no README para rodar a aplicação.




## 👊 Contribuições 💡 
Trata-se de uma primeira versão do plataforma e muitas melhorias ainda podem ser impletamentadas, como o uso de controllers, criptografia de senha a partir da biblioteca bcrypt e a adição de imagens nos locais cadastrados.

Fiquem à vontade para sugerir ideias e nos ajudar a deixar o **Natureza365** mais completo e funcional!

Desde já, agradecemos!



## Orientador do projeto 🖇️
Profº Bruno Costa


 
## Desenvolvedores do Squad 03 ✒️ 
- ### Rodrigo Ribeiro
- - [@RodRibDev](https://www.github.com/RodRibDev) 📫 rodrigo_r_ribeiro@estudante.sesisenai.org.br
- ### Josué Santos
- - [@josuesantos7](https://www.github.com/josuesantos7)  📫  josuesantossantosvf@gmail.com
- ### Leiliane Costa
- - [@leilianelcs](https://www.github.com/leilianelcs)  📫  leilianelcs@gmail.com