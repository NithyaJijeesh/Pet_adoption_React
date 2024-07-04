import React, { useEffect } from 'react'
import AxiosInstance from '../axios';
import BuyerNav from './BuyerNav';

function Buyer() {
  useEffect(() => {
    AxiosInstance.get('buyers/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <BuyerNav />
    </div>
  )
}

export default Buyer