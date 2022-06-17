import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';
import { authCostanti } from '../azioni/costanti';

const token = window.localStorage.getItem('token');

const axiosIstanza = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ``
    }
});
axiosIstanza.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
})

axiosIstanza.interceptors.response.use((res) => {
    return res;
}, (error) => {
    alert(error.response.data.error);
    console.log(error.response);
    const status = error.response ? error.response.status : 500;
    if(status && status === 500){
        localStorage.clear();
        store.dispatch({ type: authCostanti.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
})

export default axiosIstanza;