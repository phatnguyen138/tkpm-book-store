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