import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from "js-cookie"

function BuyerRoute() {
    const token = Cookies.get('accessToken');
    const userType = Cookies.get('userType');

    return (
        token && userType === 'buyer' ? <Outlet /> : <Navigate to="/login" />
    )
}

export default BuyerRoute