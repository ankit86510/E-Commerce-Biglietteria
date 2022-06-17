import {
    categorieCostanti,
    partiteCostanti,
    ordiniCostanti,
    stadiCostanti,
    clientiCostanti
  } from "./costanti";
  import axios from "../helpers/axios";
  
  export const getInitialData = () => {
    return async (dispatch) => {
      const res = await axios.post(`/initialData`);
      if (res.status === 200) {
        const { categories, partite, stadi, ordini, clienti } = res.data;
        dispatch({
          type: categorieCostanti.GET_ALL_CATEGORIE_SUCCESS,
          payload: { categorie: categories },
        });
        dispatch({
          type: partiteCostanti.GET_ALL_PARTITE_SUCCESS,
          payload: { partite },
        });
        dispatch({
            type: stadiCostanti.GET_ALL_STADIO_SUCCESS,
            payload: { stadi },
        });
        dispatch({
          type: ordiniCostanti.GET_ALL_ORDINI_SUCCESS,
          payload: { ordini },
        });
        dispatch({
          type: clientiCostanti.GET_ALL_CLIENTI_SUCCESS,
          payload: { clienti },
        });

      }
      console.log(res);
    };
  };