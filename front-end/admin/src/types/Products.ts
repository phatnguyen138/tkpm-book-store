export type Product = {
    book_id: string
    title : string,
    authors: string,
    image: string,
    price: number,
    quantity: number,
    genres: string,
}

export type NewProduct = {
    title : string,
    authors: string,
    image: File | null,
    price: number,
    genres: string,
    quantity: number
}

type OrderInfo = {
    note: string,
    location: string
}

export type CartItem = {
    id : string,
    selected: boolean,
    quantity: number,
    product: Product
    appliedCouponValue: number
    orderInfo: OrderInfo
}
