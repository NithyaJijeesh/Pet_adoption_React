import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box} from '@mui/material';
import AxiosInstance from '../axios';
import { Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DonorNav from './DonorNav';
import CustomButton from '../Button/CustomButton';
import { useNavigate } from 'react-router-dom';


function Approved() {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = () => {
    AxiosInstance.get('approveddonations/')
      .then(response => {
        setDonations(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
    <ToastContainer />
    <Container 
        className="vh-90 align-items-center justify-content-center px-2 py-0 text-center custom-scrollbar category-form mt-0" 
        style={{ backgroundColor: '#F0F4F8' }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', textAlign: 'center', gap: '20px' , mb : 2, px : 5}}>
          <h2>Your Appreciated Pet Donations</h2>
          <CustomButton type="button" text="Donate" onClick={() => navigate('/donations')} sx={{ width: '80px'}} mb = {0}/>
        </Box>

        <TableContainer component={Paper} mt={5} px={4} py={1}>
          <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1b2b5d'}}>
              <TableCell sx={{ color: 'seashell', fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ color: 'seashell', fontWeight: 'bold' }}>PET NAME</TableCell>
                <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>CATEGORY</TableCell>
                <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>BREED</TableCell>
                <TableCell align="right" sx={{ color: 'seashell', fontWeight: 'bold' }}>DESCRIPTION</TableCell>
                <TableCell align="right" sx={{ color: 'seashell', fontWeight: 'bold' }}>IMAGE</TableCell>
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
                    {index+1}
                  </TableCell>
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
                  <TableCell align="right" style={{ textTransform: 'capitalize',fontWeight: 'bold' }}>{donation.donor.first_name} {donation.donor.last_name}</TableCell>

                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>
    </Container>
    </>
  );

}



function DonationList() {
  return (
    <DonorNav content={<Approved/>} />
  )
}

export default DonationList