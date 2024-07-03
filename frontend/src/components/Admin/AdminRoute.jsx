import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from "js-cookie"

function AdminRoute() {

  const token = Cookies.get('accessToken');
  const userType = Cookies.get('userType');
  // const token = localStorage.getItem('auth_token')
  console.log(userType)
  return (
    token && userType === 'admin' ? <Outlet /> : <Navigate to="/login" />
  )
}

export default AdminRoute