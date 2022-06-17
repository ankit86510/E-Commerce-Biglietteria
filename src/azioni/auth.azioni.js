import axios from '../helpers/axios';
import {authCostanti} from './costanti';


export const login = (utente) => {


    return async (dispatch) => {

        dispatch({ type: authCostanti.LOGIN_REQUEST });
        const res = await axios.post(`/admin/Login`, {
            ...utente
        });

        if(res.status === 201){
            const { token, utente } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('utente', JSON.stringify(utente));
            dispatch({
                type: authCostanti.LOGIN_SUCCESS,
                payload: {
                    token, utente
                }
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: authCostanti.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}


export const isUtenteLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if(token){
            const utente = JSON.parse(localStorage.getItem('utente'));
            dispatch({
                type: authCostanti.LOGIN_SUCCESS,
                payload: {
                    token, utente
                }
            });
        }else{
            dispatch({
                type: authCostanti.LOGIN_FAILURE,
                payload: { error: 'Login fallito' }
            });
        }
    }
}

export const Logout = () => {
    return async (dispatch) => {
        // localStorage.clear();
        // dispatch({ type: authCostanti.LOGOUT_SUCCESS });
        dispatch({ type: authCostanti.LOGOUT_REQUEST });
        const res = await axios.post(`/admin/Logout`);

        if(res.status === 201){
            localStorage.clear();
            dispatch({ type: authCostanti.LOGOUT_SUCCESS });
        }else{
            dispatch({
                type: authCostanti.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }

        
    }
}