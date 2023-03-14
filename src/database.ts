
import { Categories, TProduct, TPurchase, TUser } from "./types/types";




export const Users: TUser[] = [
    {
        id: '001',
        email: 'David@email.com',
        password: '123456'
    },
    {
        id: '002',
        email: 'David2@email.com',
        password: '12345678'
    }
]
export const Products: TProduct[] = [
    {
        id: '001',
        name: 'Controle video-game',
        price: 300.00,
        category: Categories.ELECTRONICS
    },
    {
        id: '002',
        name: 'Caderno azul 500 folhas',
        price: 90.00,
        category: Categories.ACCESSORIES
    }
]


export const Purchases: TPurchase[] = [
    {
        userId: '001',
        productId: '001',
        quantity: 3,
        totalPrice: 3 * 300
    },
    {
        userId: '002',
        productId: '002',
        quantity: 4,
        totalPrice: 4 * 90
    }
]

// funcao para adicionar usuario a lista
export function createUser(id: string, email: string, password: string): void {
    const newUser: TUser = {
        id: id,
        email: email,
        password: password
    }
    newUser ? (Users.push(newUser) && console.log("Cadastro realizado com sucesso!")) : console.log("Erro no cadastro!");

}

// funcao para ver todos os usuarios
export function getAllUsers(): void {
    console.table(Users)
}

// funcao para criar produto 
export function createProduct(id: string, name: string, price: number, category: Categories): void {
    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }
    newProduct ? (Products.push(newProduct) && console.log('Produto realizado com sucesso!')) : console.log('Erro no cadastro do produto!')

}

// Funcao para ver todos os produtos! 
export function getAllProducts(): void {
    console.table(Products)

}

// FUNCAO para buscar produto pelo id 
export function getProductById(idProduct: string): void {
    Products.find((produto) => {
        return produto.id === idProduct ? console.table(produto) : console.log('Produto não encontrado!');

    })
}

// exercicio 3 
// funcao para buscar por nome
export function queryProductsByName(q: string): void {
    Products.filter((produto) => {
        return produto.name.toLowerCase().includes(q) ? console.table(produto) : console.log("produto não encontrado!")

    })
}
// funcao para criar um compra
export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): void {
    const newPurchase: TPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: quantity * totalPrice
    }
    newPurchase ? (Purchases.push(newPurchase) && console.log("Compra realizada com sucesso!")) : console.log("Erro na compra!");

}
// funcao para ver todas as compras 
export function getAllUPurchase(): void {
    console.table(Purchases)
}

// funcao para buscar todos as compras
export function getAllPurchasesFromUserId(userIdToSearch: string): void {

     Purchases.find((compra) => {
        compra.userId === userIdToSearch ? console.table(compra) : console.log('id não encontrado!')
    })
}