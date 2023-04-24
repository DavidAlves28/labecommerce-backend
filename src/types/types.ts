

export type TUserDB ={ 
    id:string,
    name:string,
    email:string,
    password:string,
    createdAt?: string
}

export type TProductDB = {
     id:string,
     name:string,
     price:number,
     description:string,
     image_url?: string
}
export type TPurchaseDB = { 
    id:string,
    buyer_id:string,
    total_price:number,
    createdAt?:string,
    paid:number
}
export type TPurchaseProductsDB = {
    purchase_id: string,
    product_id:string,
    quantity:number
}

