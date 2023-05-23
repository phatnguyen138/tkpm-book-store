import { makeRequest } from "./makeRequest";

export function loginUser(email: string, password: string){
    return makeRequest(
        '/auths/login',
        {
            method: 'POST',
            data: {email: email, password: password}
        }
    );
}

export function registerUser(email: string, password: string, fullName: string, address: string){
    return makeRequest(
        '/auths/register',
        {
            method: 'POST',
            data: {email: email, password: password, fullName: fullName, address: address}
        }
    );
}