# Projeto Nature365
 Consiste em uma aplicação para as pessoas salvarem seus locais naturais prediletos ou mesmo salvar o local para uma futura visita, adicionando informações como nome do local, descrição, localidade e cep, e a própria aplicação se encarregará de retornar um link do Google Maps para orientação do usuário até o local desejado. 

## 💻 Tecnologias usadas
* Back-end: JavaScript, Node.js, Express
* Ferramentas: Visual Studio Code, GitHub, Trello, Postman e PgAdmin4.

## ☁️ Banco de dados    
 Para essa aplicação, foi usado o banco de dados [PostgreSql](https://www.postgresql.org/), sendo necessário a instalação do PostgreSql e do [pgAdmin4](https://www.pgadmin.org/download/) na máquina.

## Rodar o repositório:

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

```bash
# Clone o repositório
$ git clone <https://github.com/josuesantos7/ProjetoNature365.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd PROJETO NATURE365

# configure o arquivo .env
$ cp .env_example .env

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev
# ou
$ node src/index.js

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

## 📖 Documentação da API com Swagger
 Para a documentação desta API foi utilizado o Swagger, que é um conjunto de ferramentas criada pela SmartBear para ajudar desenvolvedores na documenatação de APIs. 

 ### Para acessar a interface gráfica do Swagger
 Com o servidor rodando - acesse <http://localhost:3000/docs>


### Features

- [x] Adicionando-migrations-models
- [x] Adicionando-rotas
- [x] Adicionando-Documentações
- [ ] Adicionando-Controllers