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
            data: {email: email, password: password, fullName: fullName, address: address}
        }
    );
}