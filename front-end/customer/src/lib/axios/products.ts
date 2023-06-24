import { Product } from "../../types/Products";
import { makeRequest } from "./makeRequest";


export function getProductById(id : string) {
    return makeRequest(`/books/${id}`,{
        method: 'get'
    })
}

export function getProductByName(name : string) {
    return makeRequest(`/search/product/name`,{
        method: 'get',
        params: {
            name: name
        }
    })
}

export function getProductByAuthor(author: string) {
    return makeRequest(`/search/product/author`,{
        method: 'get',
        params: {
            name: author
        }    
    })
}

export function getProductList() {    
    return makeRequest('/books', {
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

export function getShopProductListByFilter(filterOptions: Record<string, string | string[]>, token: string) {    
    return makeRequest(`/books`,{
        method: 'get',
        headers: {'authorization': 'Bearer ' + token},
        params :filterOptions
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