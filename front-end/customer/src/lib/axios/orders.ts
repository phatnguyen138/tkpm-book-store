import { makeRequest } from "./makeRequest";

export async function saveOrder(data: any) {
    return makeRequest('/order/create', {
        method: 'post',
        data: data
    })
}

export async function getAllOrder(userId : string) {
    return makeRequest('/order/all', {
        method: 'get',
        params: {
            userId: userId
        }
    })
}
export async function getOrderDetail(orderId : string) {
    return makeRequest(`/order/${orderId}`, {
        method: 'get',

    })
}