# Desafio da Loomi

Sistema de gerenciamento de um e-commerce

## Tecnologias

As seguintes ferramentas e frameworks foram usados na construção do projeto:

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)

## Link do deploy:

[ecommerce-loomi.onrender.com](https://ecommerce-loomi.onrender.com)

## Testes no Postman:

Caso queira ter acesso a todas as rotas de maneira mais prática, você pode acessar [clicando aqui](https://www.postman.com/warped-robot-193763/workspace/ewally-testes/collection/20979079-3e487873-4028-46f5-befc-d691f8cc3477)
PS: lembre de adicionar o valor da variavel HOST está rodando o link de deploy. Caso queira, mude para localhost

## Modo do desenvolvedor:

Para executar isso no modo dev, você deve usar o ambiente Node.

Então você tem que:

### Clonar esse repositório:

$ git clone git@github.com:venyustech/ecommerce-loomi.git

### Instalar as dependencias:

$ npm install

### Adicionar .env

duplique a rota .env.exemple e renomeie apenas para ".env" - Dentro desse arquivo, mude "NODE_ENV=development_or_test" para "NODE_ENV=development"

### Adicionar .env.test

duplique a rota .env.exemple e renomeie apenas para ".env.test" - Dentro desse arquivo, mude "NODE_ENV=development_or_test" para "NODE_ENV=test"

### Rodar na sua máquina:

$ npm run dev

#### Rodar testes:

$ npm run test

### Rodar na sua máquina com Docker:

$ docker-compose up --build

#### E aproveite :)

###Rotas implementadas:

> Client

##### Create Client - [POST] localhost:3000/client/create

    entrada:
    {
      "fullName": "fulana da silva costa2",
      "contact": "9899898989",
      "address": "rua do juazeiro"
    }

##### Update Client - [GET] localhost:3000/client/update

    entrada:
    {
      "fullName": "fulana da silva costa",
      "contact": "9899898989",
      "address": "rua do juazeiro"
    }

> Admin

##### Find Clients - [GET] http://localhost:3000/admin/user/findAll

##### Update Client by Email - [PUT] http://localhost:3000/admin/update/banana@2.com

    entrada:
    {
      "fullName": "fulana da silva costa",
      "contact": "9899898989",
      "address": "rua do juazeiro"
    }

##### Create Ecommerce - [POST] http://localhost:3000/ecommerce/admin/create

    entrada:
    {
      "name": "loja do seu joao",
      "document": "098907831213",
      "isActive": true,
      "type": "roupas"
    }

##### Create Product - [POST] http://localhost:3000/products/create

    entrada:
    {
      "name": "Produto Exemplo 3",
      "description": "Descrição detalhada do produto exemplo.",
      "price": 5000,
      "stockQuantity": 100,
      "category": "Categoria Exemplo",
      "color": "Azul",
      "ecommerceId": 1
    }

##### Update Product - [PUT] http://localhost:3000/products/update/3

    entrada:
    {
      "name": "Produto Exemplo 3zao",
      "description": "Descrição detalhada do produto exemplo.",
      "price": 19.99,
      "stockQuantity": 100,
      "category": "Categoria Exemplo",
      "color": "Azul",
      "ecommerceId": 1
    }

##### Delete Product - [DELETE] http://localhost:3000/products/delete/3

> Login

##### Sign Up - [POST] http://localhost:3000/user/sign-up

    entrada:
    {
      "email": "banana@666.com",
      "name": "fulana da silva",
      "password": "coco-gelado",
      "role": "Client"
    }

##### Sign In - [POST] http://localhost:3000/user/sign-in

    entrada:
    {
      "email": "banana@21.com",
      "password": "coco-gelado"
    }

> Order

##### Create Order - [POST] http://localhost:3000/order/createOrder

    entrada:
    {
      "email": "banana@21.com",
      "password": "coco-gelado"
    }

##### Add Order Item - [POST] http://localhost:3000/order/addItem

    entrada:
    {
      "orderId": 1,
    "productId": 1,
    "quantity": 2"
    }

##### Remove Order Item by Id - [DELETE] http://localhost:3000/order/removeItem/2

##### Update Item Quantity - [PATCH] http://localhost:3000/order/updateItemQuantity/1

    entrada:
    {
      "newQuantity":4
    }

##### Update Order Status - [PATCH] http://localhost:3000/order/updateStatus/1

    entrada:
    {
      "newStatus": "Failed"
    }

##### Simulate Payment - [POST] http://localhost:3000/order/simulatePayment/1

    entrada:
    {
      "newQuantity":4
    }

> Main

##### Health - [GET] http://localhost:3000/health

##### Find Product - [GET] http://localhost:3000/products/find
