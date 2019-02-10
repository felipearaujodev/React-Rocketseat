import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.16:3000',//para conectar simulando no mobile
    //baseURL: 'http://localhost:3000',//para conectar simulando no IOS
    //baseURL: 'http://10.0.3.2:3000',//para conectar Genymotin ou android simulador

});

export default api;
