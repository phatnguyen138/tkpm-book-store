import { makeRequest } from "./makeRequest";

export function createReport(token: string, note: string){
    return makeRequest(
        '/users',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                "note": note
            }
        }
    );
}