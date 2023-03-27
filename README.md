# labecommerce-backend

Documentação : https://documenter.getpostman.com/view/24823167/2s93RNzabf#e3046674-7fc7-477d-bfd3-257d5c9ff7d8

<a id="ancora"></a>

# <b> Menu </b>
- [Instalação](#)
- [Métodos](#)
- [Get](#get)
- [Post](#post)
- [Put](#put)
- [Delete](#delete)

<a id="get"></a>

## Métodos

## `Get`

- `getAllUsers` - retorna todos os usuários cadrastados;
- `getAllProducts` - retorna todos os produtos cadastrados;
- `getAllPurchases` - retorna todas as compras realizadas;
- `getProductByName` - retorna o produto que foi pesquisado pelo nome;
   
- `getProductsById` - retorna o produto pelo se id pesquisado;
- `GetUserPurchasesByUserId ` - retorna todas as compras feitas apenas pelo id do usuário.
<a id="post"></a>

## Metodo Post

## `Post`

### `createUser` - Cria usuário com :
 o id do user deve iniciar com a letra 'u'
```
    id:'u001', // string
    email: 'Fulano@email.com', // string
    password: '123456' // string
```

### `createProduct` - Cria produto com :
- o `id` do produto deve iniciar com a letra 'p'
- `category` deve ser  `Eletrônicos`, ` Roupas e calçados` ,`Acessórios`; 
```
    id: 'p001', // string
    name: 'Controle video-game', // string
    price: 300.00, // number
    category: "Eletrônicos" // string
```
### `createPurchase ` cria uma compra como :  
 - o userId deve iniciar com a letra 'u' e deve estar na lista de `Users`,
 - o productId deve iniciar com a letra 'p' e deve estar na lista de `Products`
``` 
    userId: 'u001', // string
    productId: 'p001', // string
    quantity: 1, // number
    totalPrice: 300 // number
``` 

<a id="Put"></a>

## Metodo Put


## `putUserById`  alteras informações do usuário como: 
- `id` , `email` e `password`. todas do tipo string;
- `email` não deve igual a um já cadastrado;
- `id` deve sempre inicar com a letra 'u'.


## `putProductById`  alteras informações do produto como: 
`id` , `name`, `price` e `category`.
- `id` e `name` do tipo string
- `id` deve sempre inicar com a letra 'p';
- `category` deve ser  `Eletrônicos`, ` Roupas e calçados` ,`Acessórios`; 
- `price` deve ser tipo number;

<a id="Delete"></a>

## Metodo Delete 


## `deleteUserById` Delete usuário pelo seu id informado ;
 - `id` deve iniciar com a letra 'u' e deve estar na lista de `Users` .

 ## `deleteProductById` Delete produto pelo seu id informado ;
 - `id` deve iniciar com a letra 'p' e deve estar na lista de `Products` .

