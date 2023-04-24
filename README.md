# labecommerce-backend

Documentação :https://documenter.getpostman.com/view/24823167/2s93RNzabf#f60961ac-491e-49a3-bdf9-5835d05359a7


## Projeto  
`Primeiro projeto de back-end , consiste em praticar conteúdos desenvolvidos nas aulas, á aplicação é baseada na criação de API vinculada a um banco de dados real.`
<a id="ancora"></a>

# <b> Menu </b>

- [Instalação](#install)
- [banco de dados](#banco)
- [Tecnologias utilizadas](#tecnologias)
- [Get](#get)
- [Post](#post)
- [Put](#put)
- [Delete](#delete)

<a id="banco"></a>

## Banco de Dados

![banco](https://user-images.githubusercontent.com/29845719/214396608-ddcfd097-e615-44f9-acbe-f815f9abb83f.png)
https://dbdiagram.io/d/63c6e8e5296d97641d7a4666

#

<a id="tecnologias"></a>

## Tecnologias utilizadas

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Postman

#

<a id="install"></a>

## Instalação

```
npm i
npm run dev
```

<a id="get"></a>

## EndPoints

## GET

- `getAllUsers` - retorna todos os usuários cadrastados;
- `getAllProducts` - retorna todos os produtos cadastrados;
- `getAllPurchases` - retorna todas as compras realizadas;
- `getProductByName` - retorna o produto que foi pesquisado pelo nome;
- `getPuchaseByUserId` - retorna as comperas relacionadas com id informado;
- `getProductsById` - retorna o produto pelo se id pesquisado;

<a id="POST"></a>

#

## POST

- `createUser` - cria um usuário;
- `createProduct` - cria um produto;
- `createPurchase` - cria um compra;

<a id="PUT"></a>

#

## PUT

- `putUserByID` - edita o usuário passado pelo id;
- `putProductByID` - edita o produto passado pelo id;

<a id="DELETE"></a>

## DELETE

#

- `deleteUserByID` - deleta usuário pelo seu id \* o usuário não poder contém nenhuma compra relacionada ao seu id;
- `deleteProductByID` - deleta produto pelo seu id ;
- `deletePurchaseByID` - deleta Compra pelo seu id.
