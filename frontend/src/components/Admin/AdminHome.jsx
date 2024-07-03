import React, { useEffect } from 'react'
import AdminNav from './AdminNav'
// import axios from 'axios';
import AxiosInstance from '../axios';

function AdminHome() {

  useEffect(() => {
    AxiosInstance.get('admindashboard/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <AdminNav />
    </div>
  )
}

export default AdminHome