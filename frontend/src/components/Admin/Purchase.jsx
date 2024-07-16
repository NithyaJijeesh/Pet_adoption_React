import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import AxiosInstance from '../axios';
import { Container } from 'react-bootstrap';


const PurchaseFunction = () =>{

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = () => {
    AxiosInstance.get('purchasedonations/')
      .then(response => {
        setDonations(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
 
  return(
    <Container 
        className="vh-90 align-items-center justify-content-center px-2 py-0 text-center custom-scrollbar category-form mt-0" 
        style={{ backgroundColor: '#F0F4F8' }}
    >
      <h2>Purchase Details</h2>
        <TableContainer component={Paper} mt={5} px={4} py={1}>
          <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1b2b5d'}}>
                <TableCell sx={{ color: 'seashell', fontWeight: 'bold' }}>PET NAME</TableCell>
                <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>CATEGORY</TableCell>
                <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>BREED</TableCell>
                <TableCell align="right" sx={{ color: 'seashell', fontWeight: 'bold' }}>DESCRIPTION</TableCell>
                <TableCell align="right" sx={{ color: 'seashell', fontWeight: 'bold' }}>BUYER</TableCell>
                {/* <TableCell align="right" sx={{ color: 'seashell', fontWeight: 'bold' }}>DONOR</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((donation, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#F0F4F8' },
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row" style={{ textTransform: 'capitalize',fontWeight: 'bold' }}>
                    {donation.name}
                  </TableCell>
                  <TableCell align="center" style={{ textTransform: 'uppercase',fontWeight: 'bold' }}>
                    {donation.category ? `${donation.category.name}` : ''}
                  </TableCell>
                  <TableCell align="center" style={{ textTransform: 'capitalize',fontWeight: 'bold' }}>
                    {donation.breed ? `${donation.breed.name}` : ''}
                  </TableCell>
                  <TableCell align="right" style={{  fontWeight: 'bold' }}>
                    {donation.description ? `${donation.description}` : ''}
                  </TableCell>
                  <TableCell align="right" style={{ textTransform: 'capitalize',fontWeight: 'bold' }}>
                    {donation.buyer ? `${donation.buyer.first_name} ${donation.buyer.last_name}` : 'Unknown'} 
                  </TableCell>
                  {/* <TableCell align="right" style={{ textTransform: 'capitalize',fontWeight: 'bold' }}>
                    {donation.donor ? `${donation.donor.first_name} ${donation.donor.last_name}` : 'Unknown'} 
                  </TableCell> */}
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>
      {/* </Box> */}
    </Container>
  )
}

function Purchase() {
  return (
    <AdminNav content = {<PurchaseFunction />} />
  )
}

export default Purchase