import { Product } from "../../types/Products";
import { makeRequest } from "./makeRequest";


export function getProductById(id : string) {
    return makeRequest(`/product/${id}`,{
        method: 'get'
    })
}

export function getProductList() {    
    return makeRequest('/product', {
        method: 'get',
    })
}

export function getShopProductList(token: string) {
    return makeRequest(`/seller/product`, {
        method: 'get',
        headers: {'authorization': 'Bearer ' + token}
    })
}

export function getProductListByFilter(filterOptions: any[]) {    
    return makeRequest(`/product/filter`,{
        method: 'get',
        params: {
            options: filterOptions
        }
    })
}

export function updateProductStat(product: Product) {
    return makeRequest(`/seller/product/update`, {
        method: 'post',
        data: product
    })
}

export function createNewProduct(product: any) {
    return makeRequest(`/seller/product/create`, {
        method: 'post',
        data: product
    })
}