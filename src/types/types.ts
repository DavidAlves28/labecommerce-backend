export type TUser ={ 
    id:string,
    email:string,
    password:string
}

export type TProduct = {
     idProduct:string,
     name:string,
     price:number,
     category:string
}
export type TPurchase = { 
    useId:any, //string
    productId:any // string
    quantity:number,
    totalPrice:number
}