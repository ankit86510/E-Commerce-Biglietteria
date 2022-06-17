import axios from '../helpers/axios';
import {clientiCostanti} from './costanti';


export const getClienti = () => {


    return async (dispatch) => {

        try {
            dispatch({ type: clientiCostanti.GET_ALL_CLIENTI_REQUEST });
            const res = await axios.post(`/admin/getClienti`);
            if (res.status === 200) {
              const { clienti } = res.clienti;
              dispatch({
                type: clientiCostanti.GET_ALL_CLIENTI_SUCCESS,
                payload: { clienti: clienti},
              });
            } else {
              dispatch({ type: clientiCostanti.GET_ALL_CLIENTI_FAILURE });
            }
          } catch (error) {
            console.log(error);
          }
        
    };
    
}

export const deleteClienteById = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axios.delete(`/admin/deleteClienteById`, {
          data: { payload },
        });
        dispatch({ type: clientiCostanti.DELETE_CLIENTI_BY_ID_REQUEST });
        if (res.status === 202) {
          dispatch({ type: clientiCostanti.DELETE_CLIENTI_BY_ID_SUCCESS });
          dispatch(getClienti());
        } else {
          const { error } = res.data;
          dispatch({
            type: clientiCostanti.DELETE_CLIENTI_BY_ID_FAILURE,
            payload: {
              error,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };