import { makeRequest } from "./makeRequest";

export async function getAllGenre() {
    return makeRequest('/books/genres', {
        method: 'get'
    })
}