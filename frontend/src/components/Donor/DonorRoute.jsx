import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from "js-cookie"

function DonorRoute() {
    const token = Cookies.get('accessToken');
    const userType = Cookies.get('userType');
    return (
    //   token ? <Outlet></Outlet> : <Navigate to={'/login'}/>
        token && userType === 'donor' ? <Outlet /> : <Navigate to="/login" />
    )
}

export default DonorRoute