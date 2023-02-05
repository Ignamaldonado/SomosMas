import React from 'react';
import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
 
const AdminRouteGuard = ({ element: Component, ...rest }) => {
    const userState = useSelector(state => state.user)

    function isAdmin() {
        if(userState.roleId === 1){
            return true
        }
        return false
    }

    return(
        isAdmin() ? <Outlet/> : <Navigate to="/backOffice"/>
    )
};
 
export default AdminRouteGuard;