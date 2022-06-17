import { partiteCostanti} from "../azioni/costanti"

const initState = {
    error: null,
    partite: [],
    loading: false
}

export default (state = initState, action) => {
    switch(action.type){
        case partiteCostanti.GET_ALL_PARTITE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case partiteCostanti.GET_ALL_PARTITE_SUCCESS:
            state = {
                ...state,
                loading: false,
                partite: action.payload.partite
            }
            break;
        case partiteCostanti.GET_ALL_PARTITE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case partiteCostanti.ADD_NEW_PARTITE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case partiteCostanti.ADD_NEW_PARTITE_SUCCESS:
            state = {
                ...state,
                partite: action.payload.partita,
                loading: false,
            }
            break;
        case partiteCostanti.ADD_NEW_PARTITE_FAILURE:
            state = {
                ...initState,
            }
            break;
        case partiteCostanti.DELETE_PARTITE_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case partiteCostanti.DELETE_PARTITE_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break;
        case partiteCostanti.DELETE_PARTITE_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    
    }

    return state;
}