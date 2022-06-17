import {combineReducers} from 'redux';
import authReducer from './auth.reducers';
import utenteReducers from './utente.reducers';
import stadiReducer from './stadi.reducers';
import partiteReducer from './partite.reducers';
import categorieReducer from './categorie.reducers';
import ordiniReducer from './ordini.reducers';
import clientiReducer from './clienti.reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    utente: utenteReducers,
    categorie: categorieReducer,
    partite: partiteReducer,
    stadi: stadiReducer,
    ordini: ordiniReducer,
    clienti: clientiReducer
});

export default rootReducer