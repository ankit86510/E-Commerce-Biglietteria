import axios from '../helpers/axios';
import {ordiniCostanti} from './costanti';
import {getInitialData} from '../azioni/initialData.azioni';


export const getOrdini = () => {

    return async (dispatch) => {

        try {
            dispatch({ type: ordiniCostanti.GET_ALL_ORDINI_REQUEST });
            const res = await axios.get(`/admin/getOrdini`);
            if (res.status === 200) {
              const { ordini } = res.data;
              dispatch({
                type: ordiniCostanti.GET_ALL_ORDINI_SUCCESS,
                payload: { ordini: ordini},
              });
            } else {
              dispatch({ type: ordiniCostanti.GET_ALL_ORDINI_FAILURE });
            }
          } catch (error) {
            console.log(error);
          }
        
    };
    
}


// export const deleteOrdinePartitaById = (payload) => {
//     let IdPartite = payload.IdPartite

//   return async (dispatch) => {
//     try {
//         const res = await axios.delete(`/partita/update`, {
//           data: { payload },
//         });
//         if (res.status === 202) {
//           const res = await axios.delete(`/admin/deleteOrdineById`, {
//             data: { payload },
//           });
//           dispatch({ type: ordiniCostanti.DELETE_ORDINI_BY_ID_REQUEST });
//           if (res.status === 202) {
//             dispatch({ type: ordiniCostanti.DELETE_ORDINI_BY_ID_SUCCESS });
//             dispatch(getInitialData());  
//           } else {
//             const { error } = res.data;
//             dispatch({
//               type: ordiniCostanti.DELETE_ORDINI_BY_ID_FAILURE,
//               payload: {
//                 error,
//               },
//             });
//           }
//         } else {
//           const { error } = res.data;
//           dispatch({
//             type: ordiniCostanti.DELETE_ORDINI_BY_ID_FAILURE,
//             payload: {
//               error,
//             },
//           });
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
// };