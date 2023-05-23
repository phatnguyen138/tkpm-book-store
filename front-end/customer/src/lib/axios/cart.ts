import { makeRequest } from "./makeRequest";

export async function addCartItem(newItem : any) {
    return makeRequest('/cart/item/add', {
        method: 'post',
        data: newItem
    })
}

export async function updateCartItemQuantity(body : any, option: 'increase' | 'decrease') {    
    return makeRequest('/cart/item/update/quantity', {
        method: 'post',
        params: {
            option: option
        },
        data: body
    })
}

export async function deleteCartItem(data : any) {
    return makeRequest('/cart/item/delete', {
        method: 'post',
        data: data
    })
}