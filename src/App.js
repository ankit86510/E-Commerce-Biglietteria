import React, { useEffect} from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Homepage from './container/Home';
import Login from './container/Login';
import Registrazione from './container/Registrazione';
import PrivateRoute from './componenti/HOC/PrivateRoute';
import {useDispatch, useSelector} from 'react-redux';
import {getPartite, getStadi, isUtenteLoggedIn} from './azioni';
import Clienti from './container/Clienti';
import Partite from './container/Partite';
import Stadi from './container/Stadi';
import Categorie from './container/Categorie';
import Ordini from './container/Ordini';
import { getInitialData } from './azioni/initialData.azioni';



function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(()=> {
    if(!auth.authenticate) {
      dispatch(isUtenteLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
   
  }, [auth.authenticate]);

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<PrivateRoute> <Homepage /> </PrivateRoute>} />
        <Route path="/Clienti" element={<PrivateRoute> <Clienti /> </PrivateRoute>} />
        <Route path="/Partite" element={<PrivateRoute> <Partite /> </PrivateRoute>} />
        <Route path="/Stadi" element={<PrivateRoute> <Stadi /> </PrivateRoute>} />
        <Route path="/Ordini" element={<PrivateRoute> <Ordini /> </PrivateRoute>} />
        <Route path="/Categorie" element={<PrivateRoute> <Categorie /> </PrivateRoute>} />



        <Route path="/Login" element={<Login/>} />
        <Route path="/Registrazione" element={<Registrazione/>} />
      </Routes>
    </div>
  );
}

export default App;
