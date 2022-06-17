import { stadiCostanti } from "../azioni/costanti"

const initState = {
    error: null,
    stadi: [],
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case stadiCostanti.GET_ALL_STADIO_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case stadiCostanti.GET_ALL_STADIO_SUCCESS:
            state = {
                ...state,
                loading: false,
                stadi: action.payload.stadi
            }
            break;
        case stadiCostanti.GET_ALL_STADIO_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case stadiCostanti.ADD_NEW_STADIO_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case stadiCostanti.ADD_NEW_STADIO_SUCCESS:
            state = {
                ...state,
                partite: action.payload.partita,
                loading: false,
            }
            break;
        case stadiCostanti.ADD_NEW_STADIO_FAILURE:
            state = {
                ...initState,
            }
            break;
        default:
            break;

    }

    return state;
}