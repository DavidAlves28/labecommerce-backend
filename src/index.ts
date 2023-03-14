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

//exercicio 1  OK
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
app.post('/users', (req: Request, res: Response)=>{
    const {id,email,password}: TUser = req.body;     
    Users.push({ id,email,password});
    res.status(201).send("Usuário criado com sucesso")
})

//createProduct OK
app.post('/products', (req: Request, res: Response)=>{
    const {id,name,price,category}:TProduct = req.body;
    Products.push({ id,name,price,category});
    res.status(201).send("Usuário criado com sucesso");
})

//createPurchase OK
app.post('/purchase', (req: Request, res: Response)=>{
    const {userId,productId,quantity,totalPrice}:TPurchase = req.body;   
    Purchases.push({ userId,productId,quantity,totalPrice});
    res.status(201).send("Usuário criado com sucesso")
});