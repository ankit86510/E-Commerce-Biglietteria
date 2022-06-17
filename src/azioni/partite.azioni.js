import axios from '../helpers/axios';
import {partiteCostanti} from './costanti';


export const getPartite = () => {


    return async (dispatch) => {

        try {
            dispatch({ type: partiteCostanti.GET_ALL_PARTITE_REQUEST });
            const res = await axios.post(`partita/getPartite`);
            if (res.status === 200) {
              const { partite } = res.data;
              dispatch({
                type: partiteCostanti.GET_ALL_PARTITE_SUCCESS,
                payload: { partite: partite },
              });
            } else {
              dispatch({ type: partiteCostanti.GET_ALL_PARTITE_FAILURE });
            }
          } catch (error) {
            console.log(error);
          }
        
    };
    
}

export const addPartita = (form) => {
    return async (dispatch) => {
        try {
          dispatch({ type: partiteCostanti.ADD_NEW_PARTITE_REQUEST });
          const res = await axios.post(`partita/create`, form);
          if (res.status === 201) {
            dispatch({ 
                type: partiteCostanti.ADD_NEW_PARTITE_SUCCESS,
                payload: { partita: res.data.partita }
            });
            dispatch(getPartite());
          } else {
            dispatch({
                type: partiteCostanti.ADD_NEW_PARTITE_FAILURE,
                payload: {error: res.data.error}
            });
          }
        } catch (error) {
          console.log(error);
        }
    };
    
}

export const deletePartitaById = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axios.delete(`partita/deleteParitaById`, {
          data: { payload },
        });
        dispatch({ type: partiteCostanti.DELETE_PARTITE_BY_ID_REQUEST });
        if (res.status === 202) {
          dispatch({ type: partiteCostanti.DELETE_PARTITE_BY_ID_SUCCESS });
          dispatch(getPartite());
        } else {
          console.log(error)
          const { error } = res.data;
          console.log(error)
          dispatch({
            type: partiteCostanti.DELETE_PARTITE_BY_ID_FAILURE,
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