import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute =({
    redirectPath = "/Login",
    children}) =>{

    const token = window.localStorage.getItem('token');
    if(token){
        return children
    }else{
        return <Navigate to={redirectPath} />
  }
}

export default PrivateRoute;