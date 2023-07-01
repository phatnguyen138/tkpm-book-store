import { makeRequest } from "./makeRequest";

export async function createOrder(token: string) {
    return makeRequest('/orders', {
        method: 'post',
        headers: {'authorization': 'Bearer ' + token},
    })
}

export async function deleteOrder(token: string) {
    return makeRequest('/orders', {
        method: 'delete',
        headers: {'authorization': 'Bearer ' + token},
    })
}

export async function createOrderItem(token: string, book_id: number, quantity: number) {
    return makeRequest('/orders/items', {
        method: 'post',
        headers: {'authorization': 'Bearer ' + token},
        data: {
            "book_id": book_id, quantity: quantity
        }
    })
}

export async function checkoutOrder(token: string, order_id: string, address: string, phone: string) {
    return makeRequest(`orders/${order_id}/checkout`, {
        method: 'post',
        headers: {'authorization': 'Bearer ' + token},
        data: {
            "address_shipping": address,
            "phone_shipping": phone
        }
    })
}

export async function deleteOrderItems(token: string, order_id: string) {
    return makeRequest(`orders/${order_id}/items`, {
        method: 'delete',
        headers: {'authorization': 'Bearer ' + token}
    })
}