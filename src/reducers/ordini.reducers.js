import { ordiniCostanti} from "../azioni/costanti"

const initState = {
    error: null,
    ordini: [],
    message: '',
    loading: false
}

export default (state = initState, action) => {
    switch(action.type){
        case ordiniCostanti.GET_ALL_ORDINI_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case ordiniCostanti.GET_ALL_ORDINI_SUCCESS:
            state = {
                ...state,
                loading: false,
                ordini: action.payload.ordini
            }
            break;
        case ordiniCostanti.GET_ALL_ORDINI_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        default:
            break;
    }

    return state;
}