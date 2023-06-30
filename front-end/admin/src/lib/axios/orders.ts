import { makeRequest } from "./makeRequest"

export function getAllOrders() {
    return makeRequest(`/orders`, {
        method: 'get'
    })
}