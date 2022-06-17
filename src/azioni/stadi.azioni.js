import axios from '../helpers/axios';
import {stadiCostanti} from './costanti';


export const getStadi = () => {


    return async (dispatch) => {

        try {
            dispatch({ type: stadiCostanti.GET_ALL_STADIO_REQUEST });
            const res = await axios.post(`/stadio/getStadi`);
            if (res.status === 200) {
              const { stadi } = res.data;
              dispatch({
                type: stadiCostanti.GET_ALL_STADIO_SUCCESS,
                payload: { stadi: stadi},
              });
            } else {
              dispatch({ type: stadiCostanti.GET_ALL_STADIO_FAILURE });
            }
          } catch (error) {
            console.log(error);
          }
        
    };
    
}

export const addStadio = (form) => {
    return async (dispatch) => {
        try {
          dispatch({ type: stadiCostanti.ADD_NEW_STADIO_REQUEST });
          const res = await axios.post(`/stadio/create`, form);
          if (res.status === 201) {
            dispatch({
                 type: stadiCostanti.ADD_NEW_STADIO_SUCCESS,
                 payload: { stadio: res.data.stadio }
                });
            dispatch(getStadi());
          } else {
            dispatch({
                type: stadiCostanti.ADD_NEW_STADIO_FAILURE,
                payload: {error: res.data.error}
            });
          }
        } catch (error) {
          console.log(error);
        }
    };
}

export const deleteStadioById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`stadio/deleteStadioById`, {
        data: { payload },
      });
      dispatch({ type: stadiCostanti.DELETE_STADIO_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: stadiCostanti.DELETE_STADIO_BY_ID_SUCCESS });
        dispatch(getStadi());
      } else {
        const { error } = res.data;
        dispatch({
          type: stadiCostanti.DELETE_STADIO_BY_ID_FAILURE,
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