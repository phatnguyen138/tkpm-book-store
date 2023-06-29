import axios, { AxiosResponse } from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
  });
  
  api.interceptors.request.use((config) => {
    console.log('Request:', config);
    return config;
  });
  
  api.interceptors.response.use((response) => {
    console.log('Response:', response.data);
    return response;
  });
  
  export function makeRequest(url: string, options: any) {
    return api(url, options)
      .then((res: AxiosResponse) => res.data)
      .catch((error) => {
        return Promise.reject(error?.response?.status);
      });
  }