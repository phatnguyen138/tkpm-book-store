import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    withCredentials: true,
})

// api.interceptors.request.use((config) => {
//     console.log('Request:', config);
//     return config;
//   });

export function makeRequest(url : string, options : any) {
    return api(url, options)
        .then(res => res.data)
        .catch(error => {            
            return Promise.reject(error?.response?.status)
        })
}