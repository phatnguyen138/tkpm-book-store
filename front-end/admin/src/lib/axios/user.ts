import { makeRequest } from "./makeRequest";

export function loginUser(email: string, password: string){
    return makeRequest(
        '/users/signin',
        {
            method: 'POST',
            data: {email: email, password: password}
        }
    );
}

export function registerUser(email: string, password: string, fullName: string, address: string){
    return makeRequest(
        '/users/signup',
        {
            method: 'POST',
            data: {email: email, password: password, fullname: fullName, address: address, "role_id": 1}
        }
    );
}

export function getAllUsers(token: string){
    return makeRequest(
        '/users',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }
    );
}