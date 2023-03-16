import { createProduct, createPurchase, createUser, getAllPurchasesFromUserId, getAllUPurchase, getAllUsers, getProductById, Products, Purchases, queryProductsByName, Users } from "./database";
import { Categories, TProduct, TPurchase, TUser } from "./types/types";
import { getAllProducts } from "./database";
import express, { Request, Response } from 'express'
import cors from 'cors'


// API EXPRESS 1 
const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
})

//getTeste  OK
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// getAllUsers OK
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(Users)
})

// getAllProducts OK
app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(Products)
})

// getAllPurchase OK
app.get('/purchase', (req: Request, res: Response) => {
    res.status(200).send(Purchases)
})

// getProductByName OK
app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result: TProduct[] = Products.filter(
        (product) => product.name.toLowerCase().includes(q.toLowerCase()))
    res.status(200).send(result)

})

//createUser OK
app.post('/users', (req: Request, res: Response) => {
    const { id, email, password }: TUser = req.body;
    Users.push({ id, email, password });
    res.status(201).send("Usuário criado com sucesso")
})

//createProduct OK
app.post('/products', (req: Request, res: Response) => {
    const { id, name, price, category }: TProduct = req.body;
    Products.push({ id, name, price, category });
    res.status(201).send("Usuário criado com sucesso");
})

//createPurchase OK
app.post('/purchase', (req: Request, res: Response) => {
    const { userId, productId, quantity, totalPrice }: TPurchase = req.body;
    Purchases.push({ userId, productId, quantity, totalPrice });
    res.status(201).send("Usuário criado com sucesso")
});

// getProductsById OK
app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const result = Products.find((product) => product.id === id)
    res.status(200).send(result)
})

//GetUserPurchasesByUserId
app.get('/purchase/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const result = Purchases.find((purchase) => purchase.userId === id)
    res.status(200).send(result)
})

// deleteUserById OK
app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexItem = Users.findIndex((user) => user.id === id)
    indexItem >= 0 && Users.splice(indexItem, 1)
    res.status(200).send("Usuário deletado com sucesso!")
})

// deleteProductById OK
app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexItem = Products.findIndex((user) => user.id === id)
    indexItem >= 0 && Products.splice(indexItem, 1)
    res.status(200).send("Usuário deletado com sucesso!")
})

// putUserById OK
app.put('/users/:id', (req: Request, res: Response) => {

    const id = req.params.id
    const newUser: TUser | undefined = Users.find(user => user.id === id)

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    if (newUser) {
        newUser.id = newId || newUser.id;
        newUser.email = newEmail || newUser.email;
        newUser.password = newPassword || newUser.password
    }
    res.status(200).send("Alterações feitas com sucesso!")
})

// putProductById OK 
app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const newProduct: TProduct | undefined = Products.find(product => product.id === id)

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number
    const newCategory = req.body.category as Categories | undefined

    if (newProduct) {
        newProduct.id = newId || newProduct.id
        newProduct.name = newName || newProduct.name
        newProduct.price = isNaN(newPrice) ? newProduct.price : newPrice
        newProduct.category = newCategory || newProduct.category

    }
    res.status(200).send("Produto alterado com sucesso!")
})