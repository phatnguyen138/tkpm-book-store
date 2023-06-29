import { makeRequest } from "./makeRequest";

export function getAllAuthors() {
    return makeRequest(`/books/authors`,{
        method: 'get'
    })
}

export function addNewAuthor(token: string, name: string) {
    return makeRequest(`/books/authors`,{
        method: 'post',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: {
            "name": name
        }
    })
}

export function deleteAuthorById(token: string, id: string) {
    return makeRequest(`/books/authors/${id}`,{
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
}