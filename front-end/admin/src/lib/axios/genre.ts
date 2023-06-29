import { makeRequest } from "./makeRequest";

export async function getAllGenre() {
    return makeRequest('/books/genres', {
        method: 'get'
    })
}

export async function getGenreInfo(id: string) {
    return makeRequest(`/books/genres/${id}`, {
        method: 'get'
    })
}

export function addNewGenre(token: string, name: string) {
    return makeRequest(`/books/genres`,{
        method: 'post',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: {
            "name": name
        }
    })
}

export function deleteGenreById(token: string, id: string) {
    return makeRequest(`/books/genres/${id}`,{
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}