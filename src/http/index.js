import axios from "axios";


const $host = axios.create({
    baseURL: 'http://localhost:8000'
});

const $authHost = axios.create({
    baseURL: 'http://localhost:8000'
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('access')}`
    return config
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}