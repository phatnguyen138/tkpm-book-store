import { makeRequest } from "./makeRequest";

export function getAllGenres() {
    return makeRequest(`/books/genres`,{
        method: 'get'
    })
}