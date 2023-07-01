import { makeRequest } from "./makeRequest"

export function getAllOrders() {
    return makeRequest(`/orders`, {
        method: 'get'
    })
}

export async function getOrderById(token: string, order_id: string) {
    return makeRequest(`orders/${order_id}`, {
        method: 'get',
        headers: {'authorization': 'Bearer ' + token}
    })
}