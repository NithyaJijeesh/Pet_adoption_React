import React from 'react'
import AdminNav from './AdminNav'

function Purchase() {
    const content = (
        <>
        <h2 sx={{ fontFamily : 'cursive', color: '#1b2b5d'}}>User Details</h2>
        <div>Purchase</div>
        </>
    )
  return (
    <AdminNav content = {content} />
  )
}

export default Purchase