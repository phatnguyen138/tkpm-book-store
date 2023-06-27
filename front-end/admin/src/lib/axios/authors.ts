import { makeRequest } from "./makeRequest";

export function getAllAuthors() {
    return makeRequest(`/books/authors`,{
        method: 'get'
    })
}