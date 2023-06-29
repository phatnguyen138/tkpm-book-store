import { Product, NewProduct } from '../../types/Products';
import { makeRequest } from "./makeRequest";


export function getProductById(id: string, token: string) {
    return makeRequest(`/books/${id}`, {
        method: 'get'

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
        headers: { 'authorization': 'Bearer ' + token }
    })
}

export function getProductListByFilter(filterOptions: any[]) {
    return makeRequest(`/product/filter`, {
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

export function createNewProduct(product: NewProduct, token: string) {
    return makeRequest(`/books`, {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        data: {
            "title": product.title, "image": product.image, "price": product.price, "authors": product.authors, "genres": product.genres, "quantity": product.quantity, "discount": "0"
        }
    })
}

export function updateProductById(product: NewProduct, token: string, id: string) {
    return makeRequest(`/books/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        data: {
            "title": product.title, "image": product.image, "price": product.price, "authors": product.authors, "genres": product.genres, "quantity": product.quantity, "discount": "0"
        }
    })
}

export function deleteBookById(id: string, token: string) {
    return makeRequest(`/books/${id}`, {
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
}
