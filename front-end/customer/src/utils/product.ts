import { CartItem } from "../types/Product"

export function getDiscountPrice(price : number, discountRate : number, quantity: number = 1, appliedCoupon: number = 0) : number {
    return Math.ceil(price*(1-discountRate/100)-appliedCoupon)*quantity 
}

export function formatCategoryTitle(title: string) {
    if(title === 'Giá') return 'price'
    if(title === 'Đánh giá') return 'rating'
    if(title === 'Thể loại') return 'genres'
}

export function getCheckoutValue(items: CartItem[]) {
    return items.reduce((prevPrice, item) => {
        return item.selected 
            ? prevPrice + getDiscountPrice(item.product.price, item.product.discountRate, item.quantity, item.appliedCouponValue) 
            : prevPrice
    }, 0)
}