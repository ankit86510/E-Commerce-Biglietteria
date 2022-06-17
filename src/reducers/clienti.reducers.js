import { clientiCostanti } from "../azioni/costanti"

const initState = {
    error: null,
    clienti: [],
    message: '',
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case clientiCostanti.GET_ALL_CLIENTI_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case clientiCostanti.GET_ALL_CLIENTI_SUCCESS:
            state = {
                ...state,
                loading: false,
                clienti: action.payload.clienti
            }
            break;
        case clientiCostanti.GET_ALL_CLIENTI_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            break;

    }

    return state;
}