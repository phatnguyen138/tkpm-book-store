export type Product = {
    book_id: string
    title : string,
    authors: string,
    image: string,
    price: number,
    quantity: number,
    genres: string[],
}

export type NewProduct = {
    title : string,
    authors: string,
    image: string,
    price: number,
    genres: string[]
}

export type CartItem = {
    item_id : string,
    selected: boolean,
    quantity: number,
    product: Product
    appliedCouponValue: number
}
