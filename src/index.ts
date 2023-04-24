import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { type } from "os";
import { TProductDB, TPurchaseDB, TUserDB } from "./types/types";
import { TPurchaseProductsDB } from "./types/types";

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
    const q = req.query.q as string | undefined;
    if (q === undefined) {
      const result = await db("users");
      res.status(200).send(result);
    } else {
      const result = await db("users").where("name", "LIKE", `%${q}`);
      res.status(200).send(result);
    }
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
    const q = req.query.q as string | undefined;
    if (q === undefined) {
      const result = await db("products");
      res.status(200).send(result);
    } else {
      const result = await db("products").where("name", "LIKE", `%${q}`);
      res.status(200).send(result);
    }
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
    const q = req.query.q as string | undefined;
    if (q === undefined) {
      const result = await db("purchases");

      res.status(200).send(result);
    } else {
      const result = await db("products").where("name", "LIKE", `%${q}`);
      res.status(200).send(result);
    }
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
    const [result] = await db("products").where("name", "LIKE", `%${q}%`);
    if (!result) {
      res.status(404);
      throw new Error("item não encontrado");
    }
    res.status(200).send(result);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// ----------------createUser OK ---------------------
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // cria id aleatório
    const id = `u${Math.floor(Date.now() * Math.random()).toString(36)}`;

    // verificaões --------------->
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id', deve ser uma string.");
    }
    if (id[0] !== "u") {
      res.status(400);
      throw new Error("'id', deve iniciar com 'u'!");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name', deve ser uma string.");
    }
    if (name.length < 5) {
      res.status(400);
      throw new Error("'name', deve ter no mínimo 5 caracteres.");
    }
    if (typeof email !== "string") {
      res.status(400);
      throw new Error("'email', deve ser uma string.");
    }

    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      throw new Error(
        "'password' deve possui mínimo de oito caracteres, pelo menos uma letra e um número"
      );
    }
    const [userIdExists]: TUserDB[] | undefined[] = await db("users").where({
      id,
    });
    if (userIdExists) {
      res.status(400);
      throw new Error("'id', id já existe.");
    }
    const [userEmailExists]: TUserDB[] | undefined[] = await db("users").where({
      email,
    });
    if (userEmailExists) {
      res.status(400);
      throw new Error("'email', email já existe.");
    }
    const newUser: TUserDB = {
      id,
      name,
      email,
      password,
    };
    //
    await db("users").insert(newUser);
    res
      .status(201)
      .send({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
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
    const { name, price, description, image_url }: TProductDB = req.body;
    const id = `p${Math.floor(Date.now() * Math.random()).toString(36)}`;

    // verificações ------------->
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id', deve ser uma string.");
    }
    if (id[0] !== "p") {
      res.status(400);
      throw new Error("'id', deve iniciar com 'p'!");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name', deve ser uma string.");
    }
    if (name.length < 5) {
      res.status(400);
      throw new Error("'name', deve ter no mínimo 5 caracteres.");
    }
    if (typeof price !== "number") {
      res.status(400);
      throw new Error("'price', deve ser do tipo number.");
    }
    if (typeof description !== "string") {
      res.status(400);
      throw new Error("'description', deve ser uma string.");
    }
    if (typeof image_url !== "string") {
      res.status(400);
      throw new Error("'image_url', deve ser uma string.");
    }

    const [userIdExists]: TProductDB[] | undefined[] = await db(
      "products"
    ).where({ id });
    if (userIdExists) {
      res.status(400);
      throw new Error("'id', id já existe.");
    }
    const newProduct: TProductDB = {
      id,
      name,
      price,
      description,
      image_url,
    };
    await db("products").insert(newProduct);
    res
      .status(201)
      .send({ message: "Produto criado com sucesso", product: newProduct });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//createPurchase OK
app.post(
  "/purchases/users/:userId/products/:productId",
  async (req: Request, res: Response) => {
    try {
      // usersID vai ser usado para criação da 'purchase'
      // que colocará ele automaticamento no campor de 'buyer_id'
      const userId = req.params.userId;
      // productId será usado para criar a comprar
      const productId = req.params.productId;

      // 'purchases.id = id' assim não pe necessário passa id manualmente.
      const id = `c${Math.floor(Date.now() * Math.random()).toString(36)}`;

      // ==========>>>>> Verificações <=================
      if (productId[0] !== "p") {
        res.status(400);
        throw new Error("'productsId', deve iniciar com 'p'!");
      }

      const [product]: TProductDB[] | undefined[] = await db("products").where({
        id: productId,
      });

      if (!product) {
        res.status(404);
        throw new Error("'productId' não encontrado");
      }
      const [user]: TUserDB[] | undefined[] = await db("users").where({
        id: userId,
      });

      if (!user) {
        res.status(404);
        throw new Error("'userId' não encontrado");
      }

      const { total_price, paid, quantity } = req.body;
      const newPurchaseProducts: TPurchaseProductsDB = {
        purchase_id: id,
        product_id: productId,
        quantity: quantity,
      };
      const newPurchase: TPurchaseDB = {
        id,
        buyer_id: userId,
        total_price,
        paid,
      };
      await db("purchases").insert(newPurchase);

      // insere os dados na tabela de relacionamento entre compra e produto
      await db("purchases_products").insert(newPurchaseProducts);

      const result = await db("purchases")
        .select(
          "purchases.id AS purchaseId",
          "purchases.buyer_id",
          "purchases.total_price",
          "purchases.created_at AS createdAt ",
          "users.id AS userId"
        )
        .join("users", "purchases.buyer_id", "=", "userId")
        .where("userId", "=", `${userId}`)
        .first();
      if (!result) {
        res.status(400);
        throw new Error("compra nao encontrado");
      }
      const purchase = await db("purchases_products")
        .select("products.id", "products.name", "products.price")
        .join(
          "purchases",
          "purchases_products.purchase_id",
          "=",
          "purchases.id"
        )
        .join("products", "purchases_products.product_id", "=", "products.id")
        .first()
        .where("purchases.buyer_id", "=", userId);
      res.status(201).send({
        message: "Compra criada com sucesso",
        compra: { ...newPurchase, quantity, products: purchase },
      });
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
  }
);

// getProductsById OK

app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id[0] !== "p") {
      res.status(400);
      throw new Error(" 'id'do produto deve iniciar com 'p' ");
    }

    const [result] = await db("products").where({ id: id });
    if (!result) {
      res.status(404);
      throw new Error("'id' não encontrado");
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// deleteUserById OK
// Para deletar o usuário deve primeiro deletar suas compras ("purchases")
// Deletar no endPoint "deletePurchaseById"
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    // id deve iniciar com a letra 'u'
    if (idToDelete[0] !== "u") {
      res.status(400);
      throw new Error(" 'id'do users deve iniciar com a letra 'u' ");
    }
    const [userExist]: TUserDB[] | undefined[] = await db("users").where({
      id: idToDelete,
    });
    if (!userExist) {
      res.status(404);
      throw new Error("'id' não encontrado");
    }

    await db("users").delete().where({ id: idToDelete });

    res.status(200).send({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// deleteProductById OK
app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // id deve iniciar com a letra 'p'
    if (id[0] !== "p") {
      res.status(400);
      throw new Error(" 'id'do produto deve iniciar com a letra 'p' ");
    }
    const [productExist] = await db("products").where({ id: id });
    if (!productExist) {
      res.status(404);
      throw new Error("'id' não encontrado");
    } else {
      await db("products").delete().where({ id: id });
      res.status(200).send({ message: "Produto deletado com sucesso!" });
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

// deletePurchaseById OK
app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    // id deve iniciar com a letra 'p'
    if (idToDelete[0] !== "c") {
      res.status(400);
      throw new Error(" 'id'da compra  deve iniciar com a letra 'c' ");
    }
    const [purchaseExist] = await db("purchases").where({ id: idToDelete });
    if (!purchaseExist) {
      res.status(404);
      throw new Error("'id' não encontrado");
    } else {
      await db("purchases_products")
        .delete()
        .where({ purchase_id: idToDelete });
      await db("purchases").delete().where({ id: idToDelete });
      res.status(200).send({ message: "Compra deletado com sucesso!" });
    }
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// putUserById OK
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPassword = req.body.password;

    // id do user deve iniciar com a letra 'u'
    if (newId !== undefined) {
      if (newId[0] !== "u") {
        res.status(400);
        throw new Error("'id' , deve iniciar com a letra 'u'");
      }
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id', deve ser uma string.");
      }
    }
    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name', deve ser uma string.");
      }
    }
    if (newEmail !== undefined) {
      if (typeof newEmail !== "string") {
        res.status(400);
        throw new Error("'email', deve ser uma string.");
      }
    }
    if (newPassword !== undefined) {
      if (typeof newPassword !== "string") {
        res.status(400);
        throw new Error("'password', deve ser uma string.");
      }
    }
    const [user]: TUserDB[] | undefined[] = await db("users").where({
      id: idToEdit,
    });
    if (!user) {
      res.status(404);
      throw new Error("'id' não encontrada");
    }
    const newUser: TUserDB = {
      id: newId || user.id,
      name: newName || user.name,
      email: newEmail || user.email,
      password: newPassword || user.password,
    };
    await db("users").update(newUser).where({ id: idToEdit });
    res.status(200).send({ message: "Cadastro atualizado!", user: newUser });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// putProductById OK
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImage = req.body.image_url;

    // 'id' do usuario deve iniciar com a letra 'p'
    if (newId !== undefined) {
      if (newId[0] !== "p") {
        res.status(400);
        throw new Error("'id' , deve iniciar com a letra 'p'");
      }
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id', deve ser uma string.");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name', deve ser uma string.");
      }
    }
    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("'price', deve ser uma number.");
      }
    }
    if (newDescription !== undefined) {
      if (typeof newDescription !== "string") {
        res.status(400);
        throw new Error("'description', deve ser uma string.");
      }
    }
    if (newImage !== undefined) {
      if (typeof newImage !== "string") {
        res.status(400);
        throw new Error("'image_url', deve ser uma string.");
      }
    }

    const [product]: TProductDB[] | undefined[] = await db("products").where({
      id: idToEdit,
    });
    if (!product) {
      res.status(404);
      throw new Error("'id' não encontrada");
    }
    const newProduct: TProductDB = {
      id: newId || product.id,
      name: newName || product.name,
      price: newPrice || product.price,
      description: newDescription || product.description,
      image_url: newImage || product?.image_url,
    };

    await db("products").update(newProduct).where({ id: idToEdit });

    res.status(200).send({ message: "Produto atualizado!", user: newProduct });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
// get purchases/:userId OK
app.get("/purchases/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (userId) {
      const result = await db("purchases")
        .select(
          "purchases.id AS purchaseId",
          "users.name AS buyerName",
          "users.email AS buyerEmail",
          "purchases.buyer_id",
          "purchases.created_at AS createdAt ",
          "users.id AS userId"
        )
        .join("users", "purchases.buyer_id", "=", "userId")
        .where("userId", "=", `${userId}`)
        .first();
      if (!result) {
        res.status(400);
        throw new Error("compra nao encontrado");
      }
      const product = await db("purchases_products")
        .select(
          "products.id",
          "products.name",
          "products.price",
          "products.description",
          "products.image_url AS imageUrl",
          "purchases_products.quantity"
        )
        .join(
          "purchases",
          "purchases_products.purchase_id",
          "=",
          "purchases.id"
        )
        .join("products", "purchases_products.product_id", "=", "products.id")
        .where("purchases.buyer_id", "=", userId);

      res.status(200).send({ ...result, product });
    } else {
      res.status(404);
      throw new Error("'id' não encontrado");
    }
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
