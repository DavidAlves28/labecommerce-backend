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


// getAllUsers OK
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(Users)
})

// getAllProducts OK
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(Products)
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        // adicionamos um fluxo de validação do parâmetro 'error'
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

// getAllPurchase OK
app.get('/purchase', (req: Request, res: Response) => {
    res.status(200).send(Purchases)
})

// getProductByName OK
app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        if (q.length < 1) {
            res.status(400)
            throw new Error("'search',deve conter no mínimo um caracter")
        }
        const result: TProduct[] = Products.filter(
            (product) => product.name.toLowerCase().includes(q.toLowerCase()))
        res.status(200).send(result)
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        // adicionamos um fluxo de validação do parâmetro 'error'
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

//createUser OK
app.post('/users', (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password

        const newUser: TUser = {
            id,
            email,
            password,
        }
        //  verifica se id e email  existem no array Users.
        const verficaId = Users.find((user) => newUser.id === user.id)
        const verficaEmail = Users.find((user) => newUser.email === user.email)

        // verifica se existe id já cadastrado!
        
        if (verficaId) {
            res.status(400)
            throw new Error("'id', ja está sendo utilizados , tente novamente!")
        }
        // verifica se existe email já cadastrado!
        else if (verficaEmail) {
            res.status(400)
            throw new Error("'email', ja está sendo utilizados , tente novamente!")
        } 

        //verifica se id começa com 'u'        

        if (id[0] !== "u") {
            res.status(400)
            throw new Error("'id', deve iniciar com 'u'!")
        }

        if (!email.includes('@')) {
            res.status(400)
            throw new Error("'email', deve conter com '@'!")
        }

        else {
            Users.push(newUser);
            res.status(201).send("Usuário criado com sucesso")

        }
     


    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        // adicionamos um fluxo de validação do parâmetro 'error'
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//createProduct OK
app.post('/products', (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category
        const newProduct: TProduct = {
            id,
            name,
            price,
            category
        }

        const verficaId = Products.find((product) => newProduct.id === product.id)
        // verificar se já existe o mesmo id na lista de produtos

     
       
            if ( category  !== "Eletrônicos" && category !== "Acessórios" && category !== "Roupas e calçados" ) {
                res.status(400)
                throw new Error("'category' deve ser 'Eletrônicos' ou 'Acessórios' ou 'Roupas e calçados'")
            }
        

        if (verficaId) {
            res.status(400)
            throw new Error("'id' , ja estão sendo utilizados , tente novamente!")


        }
       
        // a criacao do id do produto deve iniciar a com letra "p"      
        else  if (id[0] !== "p") {
            res.status(400)
            throw new Error("'id', deve iniciar com 'p'!")
        }

        else {
            Products.push(newProduct);
            res.status(201).send("Produto criado com sucesso")
        }

    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        // adicionamos um fluxo de validação do parâmetro 'error'
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//createPurchase OK
app.post('/purchase', (req: Request, res: Response) => {
    try {
        const userId = req.body.userId
        const productId = req.body.productId
        const quantity = req.body.quantity
        const totalPrice = req.body.totalPrice      
        

        const newPurchase: TPurchase = {
            userId,
            productId,
            quantity,
            totalPrice: totalPrice
        }

        // se o id do usuario existe na lista de users 
        const verficaUser = Users.filter((user) => newPurchase.userId === user.id)
        // se o id do produto existe na lista de  produto
        const verficaProduct = Products.find((product) => newPurchase.productId === product.id)     
      
       // userId deve iniciar com a letra 'u' e productId deve iniciar com a letra 'p'
       if (userId[0] !== "u" || productId[0] !== "p" )  {
            res.status(400)
            throw new Error("'userId', deve iniciar com 'u', e/ou 'productId', deve iniciar com 'p'")
        }
        else if (verficaUser && verficaProduct) {
            Purchases.push(newPurchase)
            res.status(201).send("Compra criada com sucesso")
        }
        
        else {
            res.status(400)
            throw new Error("'userId' e/ou 'productId'  , não existe.")
        }

    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500)
        }
        // adicionamos um fluxo de validação do parâmetro 'error'
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

// getProductsById OK

app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = Products.find((product) => product.id === id)

        if ( id[0] !== 'p' ){
            res.status(400)
            throw new Error(" 'id'do produto deve iniciar com 'p' ")
        }
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400)
            throw new Error("produto não existe")
        }


    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        // adicionamos um fluxo de validação do parâmetro 'error'
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//GetUserPurchasesByUserId
app.get('/users/:id/purchases', (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const result = Purchases.filter((purchase) => purchase.userId === id)
        if (   id[0] !== 'u' ){
            res.status(400)
            throw new Error(" 'id'do user deve iniciar com a letra 'u' ")
        }
        
        else  if (result) {
            res.status(200).send(result)
        } else {
            res.status(400)
            throw new Error("produto não existe")
        }

    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        // adicionamos um fluxo de validação do parâmetro 'error'
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// deleteUserById OK
app.delete('/users/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const indexItem = Users.findIndex((user) => user.id === id)



    const verificarUsers = Users.find((user)=>user.id === id)
        // id deve iniciar com a letra 'u'
        if (  id[0] !== 'u' ){
            res.status(400)
            throw new Error(" 'id'do users deve iniciar com a letra 'u' ")
        }
        // o user deve estar na lista de usuario.
        else if (!verificarUsers){
            res.status(400)
            throw new Error("Usuário não existe ")
           
        } else {
            // deletar user
            indexItem >= 0 && Users.splice(indexItem, 1)
            res.status(200).send("Usuário deletado com sucesso!")
        }

  }catch (error){
    console.log(error);

    if (res.statusCode === 200) {
        res.status(500)
    }
    // adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
})



// deleteProductById OK
app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const indexItem = Products.findIndex((user) => user.id === id)
        const verificarProduto = Products.find((product)=>product.id === id)
        // id deve iniciar com a letra 'p'
        if (  id[0] !== 'p' ){
            res.status(400)
            throw new Error(" 'id'do produto deve iniciar com a letra 'p' ")
        }
        // o prduto deve estar na lista de produtos 
        else if (!verificarProduto){
            res.status(400)
            throw new Error("Produto não existe ")
        }
        // deletar produto
        else  {
            indexItem >= 0 && Products.splice(indexItem, 1)
            res.status(200).send("Usuário deletado com sucesso!")
        }
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        // adicionamos um fluxo de validação do parâmetro 'error'
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


// putUserById OK
app.put('/users/:id', (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const newUser: TUser | undefined = Users.find(user => user.id === id)
        
        if (!newUser) {
            res.status(400)
            throw new Error("Usuário não existe")
        }
        
        const newId = req.body.id
        const newEmail = req.body.email
        const newPassword = req.body.password
        
        // verifica se o email ja esta sendo utilizado por outro user
        const verificaEmail =Users.find(user => user.email === newEmail)

        // id do user deve iniciar com a letra 'u'
        if (newId !== undefined) {
            if (newId[0] !== 'u') {
                res.status(400)
                throw new Error("'id' , deve iniciar com a letra 'u'")
            }
        }

        // email não deve existe em outra conta.
        if (newEmail !== undefined) {
            if (verificaEmail) {
                res.status(400)
                throw new Error("Email já está em uso")
            }

        }


        if (newUser  ) {
            newUser.id = newId || newUser.id;
            newUser.email = newEmail || newUser.email;
            newUser.password = newPassword || newUser.password
        }
        
    res.status(200).send("Cadastro atualizado!")

    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        // adicionamos um fluxo de validação do parâmetro 'error'
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// putProductById OK 
app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newProduct: TProduct | undefined = Products.find(product => product.id === id)


        if (!newProduct) {
            res.status(400)
            throw new Error("Usuário não existe")
        }

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newCategory = req.body.category


        // 'id' do usuario deve iniciar com a letra 'p'
        if (newId !== undefined) {
            if (newId[0] !== 'p') {
                res.status(400)
                throw new Error("'id' , deve iniciar com a letra 'p'")
            }
        }
        if ( newCategory  !== "Eletrônicos" && newCategory !== "Acessórios" && newCategory !== "Roupas e calçados" ) {
            res.status(400)
            throw new Error("'category' deve ser 'Eletrônicos' ou 'Acessórios' ou 'Roupas e calçados'")
        }

        if (newProduct) {
            newProduct.id = newId || newProduct.id
            newProduct.name = newName || newProduct.name
            newProduct.price = isNaN(newPrice) ? newProduct.price : newPrice
            newProduct.category = newCategory || newProduct.category

        }

        res.status(200).send("Produto alterado com sucesso!")
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        // adicionamos um fluxo de validação do parâmetro 'error'
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})