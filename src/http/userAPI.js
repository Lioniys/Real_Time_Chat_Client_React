import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";


export const registration = async (email, password, name) => {
    const response = await $host.post('api/v1/auth/register', {email, password, name});
    return response.data.id;
}

export const login = async (email, password) => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
    const response = await $host.post('api/v1/auth/login', params);
    localStorage.setItem('access', response.data.access_token);

    return jwtDecode(response.data.access_token).sub;
}

export const check = async () => {
    const response = await $authHost.get('api/v1/auth/verify');
    return response.status === 200;
}