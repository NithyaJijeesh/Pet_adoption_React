import React from 'react'
import BuyerNav from './BuyerNav'
function PasswordFunction()
{
    return(
        <div><h1>hi</h1></div>
    )
}
function BuyerPassword() {
  return (
    <BuyerNav content={<PasswordFunction />} />
  )
}

export default BuyerPassword