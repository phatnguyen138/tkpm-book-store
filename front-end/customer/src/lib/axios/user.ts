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
            data: {email: email, password: password, fullname: fullName, address: address}
        }
    );
}

export function getUserInfo(token: string){
    return makeRequest(
        '/users/profile',
        {
            method: 'get',
            headers: {'authorization': 'Bearer ' + token},
        }
    );
}

export function updateUserProfile(token: string, id: string, fullname: string,email: string, avatar: File, address: string, phone: string){
    return makeRequest(
        `/users/update/${id}`,
        {
            method: 'put',
            headers: {'authorization': 'Bearer ' + token},
            data: {
                "fullname": fullname, email: email, avatar: avatar, address: address, phone: phone
            }
        }
    );
}