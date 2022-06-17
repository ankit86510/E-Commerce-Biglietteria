import axios from '../helpers/axios';
import {utenteCostanti} from './costanti';


export const registrazione = (utente) => {


    return async (dispatch) => {

        dispatch({ type: utenteCostanti.UTENTE_REGISTRAZIONE_REQUEST });
        const res = await axios.post(`admin/Registrazione`, {
            ...utente
        });

        if(res.status === 201){
            const { message } = res.data;
            dispatch({
                type: utenteCostanti.UTENTE_REGISTRAZIONE_SUCCESS,
                payload: {
                    message
                }
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: utenteCostanti.UTENTE_REGISTRAZIONE_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}
