import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import AxiosInstance from '../axios';
import { Container } from 'react-bootstrap';
import DonorNav from './DonorNav';


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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
 
  return(
    <Container 
        className="vh-90 align-items-center justify-content-center px-2 py-0 text-center custom-scrollbar category-form mt-0" 
        style={{ backgroundColor: '#F0F4F8' }}
    >
      <h2>Purchased Pets</h2>
        <TableContainer component={Paper} mt={5} px={4} py={1}>
          <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1b2b5d'}}>
                <TableCell align="left" sx={{ color: 'seashell', fontWeight: 'bold' }}>DATE</TableCell>
                <TableCell sx={{ color: 'seashell', fontWeight: 'bold' }}>PET NAME</TableCell>
                <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>CATEGORY</TableCell>
                <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>BREED</TableCell>
                <TableCell align="right" sx={{ color: 'seashell', fontWeight: 'bold' }}>DESCRIPTION</TableCell>
                {/* <TableCell align="right" sx={{ color: 'seashell', fontWeight: 'bold' }}>BUYER</TableCell> */}
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
                  <TableCell align="left" style={{ textTransform: 'capitalize',fontWeight: 'bold' }}>
                    {donation.purchased_date ? formatDate(donation.purchased_date) : 'Unknown'}                  
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ textTransform: 'capitalize',fontWeight: 'bold' }}>
                    {donation.name}
                  </TableCell>
                  <TableCell align="center" style={{ textTransform: 'uppercase',fontWeight: 'bold' }}>
                    {donation.category ? `${donation.category.name}` : ''}
                  </TableCell>
                  <TableCell align="center" style={{ textTransform: 'capitalize',fontWeight: 'bold' }}>
                    {donation.breed?.name || ''}
                  </TableCell>
                  <TableCell align="right" style={{  fontWeight: 'bold' }}>
                    {donation.description ? `${donation.description}` : ''}
                  </TableCell>
                  {/* <TableCell align="right" style={{ textTransform: 'capitalize',fontWeight: 'bold' }}>
                    {donation.buyer ? `${donation.buyer.first_name} ${donation.buyer.last_name}` : 'Unknown'} 
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
function PurchaseList() {
  return (
    <DonorNav content = {<PurchaseFunction />} />
  )
}

export default PurchaseList