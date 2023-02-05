import React from 'react';
import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
 
const LoginRouteGuard = ({ element: Component, ...rest }) => {
    const userState = useSelector(state => state.user)

    function isAdmin() {
        if(Object.keys(userState).length){
            return true
        }
        return false
    }

    return(
        isAdmin() ? <Outlet/> : <Navigate to="/Login"/>
    )
};
 
export default LoginRouteGuard;