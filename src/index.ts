import { createProduct, createPurchase, createUser, getAllPurchasesFromUserId, getAllUPurchase, getAllUsers, getProductById, Products,  Purchases,  queryProductsByName,  Users } from "./database";
import { Categories } from "./types/types";
import { getAllProducts } from "./database";



createUser('003',"david3@email.com","123123")
createUser('004',"david4@email.com","1232123")
// console.log(getAllUsers())
createProduct('003','Cadeira Gamer',999.01, Categories.ACCESSORIES)
getAllProducts()

// queryProductsByName("gamer")

createPurchase("001","003",2,999.01)
createPurchase("001","002",12,100.00)
createPurchase("004","002",2,180.01)
createPurchase("003","002",5,180.01)
// getProductById('003')

// console.table(Purchases);
// console.log(getAllPurchasesFromUserId("002"));


