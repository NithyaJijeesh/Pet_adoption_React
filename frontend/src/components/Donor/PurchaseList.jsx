import React from 'react'
import DonorNav from './DonorNav';

const PurchsaeFunction = () => {
    return(
        <div>PurchaseList</div>
    );
}
function PurchaseList() {
  return (
    <DonorNav content = {<PurchsaeFunction />} />
  )
}

export default PurchaseList