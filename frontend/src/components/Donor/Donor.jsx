import React, { useEffect } from 'react'
import DonorNav from './DonorNav'
import AxiosInstance from '../axios';

function Donor() {
  useEffect(() => {
    AxiosInstance.get('donors/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <DonorNav />
    </div>
  )
}

export default Donor