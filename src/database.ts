import { TProduct, TPurchase, TUser } from "./types/types";


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
        idProduct: '001',
        name: 'Controle video-game',
        price: 300.00,
        category: 'eletronico'
    },
    {
        idProduct: '002',
        name: 'Caderno azul 500 folhas',
        price: 90.00,
        category: 'escolar'
    }
]


export const Purchases: TPurchase[] = [
    {
        useId:'001',
        productId:'001',
        quantity:3,
        totalPrice: 3 * 300, 
    },
    {
        useId:'002',
        productId: '002',
        quantity: 4,
        totalPrice: 4 * 90
    }
]


//teste
// const usersId = Users.map((use) : string =>{
    //     return use.id})
    // const productsId = Products.map((use)=>{
        //    return use.idProduct    
        // })

// export  function attPurchase ( price:number ,quantity:number ) {
    
//     const  Purchases: TPurchase[] = [
//         {
//             useId:usersId,
//             productId:productsId,            
//             quantity:quantity,
//             totalPrice: quantity * price, 
//         }]

//      return Purchases 
//     }





  
    