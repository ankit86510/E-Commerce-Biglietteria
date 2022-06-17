import { utenteCostanti} from "../azioni/costanti"

const initState = {
    error: null,
    message: '',
    loading: false
}

export default (state = initState, action) => {
    console.log(action);
    switch(action.type){
        case utenteCostanti.UTENTE_REGISTRAZIONE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case utenteCostanti.UTENTE_REGISTRAZIONE_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case utenteCostanti.UTENTE_REGISTRAZIONE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }

    return state;
}