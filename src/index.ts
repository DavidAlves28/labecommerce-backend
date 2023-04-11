import { Categories, TProduct, TPurchase, TUser } from "./types/types";

import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

// API EXPRESS 1
const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

// getAllUsers OK
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM users;`);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// getAllProducts OK
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM products;`);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// getAllPurchase OK
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM purchases;`);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// getProductByName OK
app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    if (q.length < 1) {
      res.status(400);
      throw new Error("'search',deve conter no mínimo um caracter");
    }
    const result = await db.raw(
      `SELECT * FROM products 
        WHERE name LIKE "%${q}%";`
    );
    // const result: TProduct[] = Products.filter((product) =>
    //   product.name.toLowerCase().includes(q.toLowerCase())
    // );
    res.status(200).send(result);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    // adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//createUser OK
app.post("/users", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;

    //verifica se id começa com 'u'

    if (id[0] !== "u") {
      res.status(400);
      throw new Error("'id', deve iniciar com 'u'!");
    }

    if (!email.includes("@")) {
      res.status(400);
      throw new Error("'email', deve conter com '@'!");
    }
    await db.raw(`
    INSERT INTO users(id,email,password) 
    VALUES  
    ("${id}","${email}","${password}")
    `);

    res.status(201).send({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    // adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//createProduct OK
app.post("/products", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;

    // verificar se já existe o mesmo id na lista de produtos

    if (
      category !== "Eletrônicos" &&
      category !== "Acessórios" &&
      category !== "Roupas e calçados"
    ) {
      res.status(400);
      throw new Error(
        "'category' deve ser 'Eletrônicos' ou 'Acessórios' ou 'Roupas e calçados'"
      );
    }

    // a criacao do id do produto deve iniciar a com letra "p"
    else if (id[0] !== "p") {
      res.status(400);
      throw new Error("'id', deve iniciar com 'p'!");
    }
    await db.raw(`
    INSERT INTO products(id,name,price,category) 
    VALUES  
    ("${id}",
    "${name}",
    "${price}",
    "${category}")
    `);
    res.status(201).send({ message: "Produto criado com sucesso" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    // adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//createPurchase OK
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const paid = req.body.paid;
    const buyer_id = req.body.buyer_id;

    // userId deve iniciar com a letra 'u' e productId deve iniciar com a letra 'p'
    if (id[0] !== "c" || buyer_id[0] !== "u") {
      res.status(400);
      throw new Error(
        "'id', deve iniciar com 'c', e/ou 'buyer_id', deve iniciar com 'u'"
      );
    }
    await db.raw(`
    INSERT INTO purchases(id,paid,buyer_id) 
    VALUES  
    ("${id}",
    "${paid}",
    "${buyer_id}");
    `);
    res.status(201).send({ message: "Purchase criado com sucesso" });

    //       res.status(400);
    //    throw new Error("'userId' e/ou 'productId'  , não existe.");
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    // adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// getProductsById OK

app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id[0] !== "p") {
      res.status(400);
      throw new Error(" 'id'do produto deve iniciar com 'p' ");
    }
    const result = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}";
    `);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    // adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//GetUserPurchasesByUserId
app.get("/users/:buyer_id/purchases",async (req: Request, res: Response) => {
  try {
    const buyer_id = req.params.buyer_id;

    if (buyer_id[0] !== "u") {
      res.status(400);
      throw new Error(" 'buyer_id'do user deve iniciar com a letra 'u' ");
    } 

    const result = await db.raw(`
    SELECT * FROM purchases
    WHERE buyer_id = "${buyer_id}";
`);
res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    // adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// deleteUserById OK
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // id deve iniciar com a letra 'u'
    if (id[0] !== "u") {
      res.status(400);
      throw new Error(" 'id'do users deve iniciar com a letra 'u' ");
    }
    // o user deve estar na lista de usuario.
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    // adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// deleteProductById OK
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // id deve iniciar com a letra 'p'
    if (id[0] !== "p") {
      res.status(400);
      throw new Error(" 'id'do produto deve iniciar com a letra 'p' ");
    }
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    // adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// putUserById OK
app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;

    // verifica se o email ja esta sendo utilizado por outro user

    // id do user deve iniciar com a letra 'u'
    if (newId !== undefined) {
      if (newId[0] !== "u") {
        res.status(400);
        throw new Error("'id' , deve iniciar com a letra 'u'");
      }
    }

    res.status(200).send("Cadastro atualizado!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    // adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// putProductById OK
app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;

    // 'id' do usuario deve iniciar com a letra 'p'
    if (newId !== undefined) {
      if (newId[0] !== "p") {
        res.status(400);
        throw new Error("'id' , deve iniciar com a letra 'p'");
      }
    }
    if (
      newCategory !== "Eletrônicos" &&
      newCategory !== "Acessórios" &&
      newCategory !== "Roupas e calçados"
    ) {
      res.status(400);
      throw new Error(
        "'category' deve ser 'Eletrônicos' ou 'Acessórios' ou 'Roupas e calçados'"
      );
    }

    res.status(200).send("Produto alterado com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    // adicionamos um fluxo de validação do parâmetro 'error'
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
