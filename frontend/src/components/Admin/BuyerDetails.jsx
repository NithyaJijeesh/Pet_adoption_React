import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Avatar } from '@mui/material';
import { Container } from 'react-bootstrap';
import CustomButton from '../Button/CustomButton';
import AxiosInstance from '../axios';
import defaultProfileImage from '../../assets/default_image.jpeg';
import { toast, ToastContainer } from 'react-toastify';



function BuyerFunction() {

  const [buyers, setBuyers] = useState([])
  const [selectedBuyer, setSelectedBuyer] = useState(null);


  const handleDelete = () => {
    if (selectedBuyer) {
      AxiosInstance.delete(`listbuyerdetails/${selectedBuyer.id}/`)
        .then(() => {
          console.log('yes')
          toast.success('Donor deletion completed!');
          fetchDonors();
        })
        .catch(error => {
          console.error(error);
          toast.error('Failed to delete donation');
        });
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = () => {
    AxiosInstance.get('listbuyers/')
      .then(response => {
        console.log(response.data);
        const donorDetails = response.data.map(donors => {
          const relativeImagePath = donors.image || defaultProfileImage;
          const imageUrl = relativeImagePath.startsWith('/media/') ? `${AxiosInstance.defaults.baseURL}${relativeImagePath}` : defaultProfileImage;
          return {
            ...donors,
            imageUrl: imageUrl
          };
        });
        setBuyers(donorDetails);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteClick = (buyer) => {
    setSelectedBuyer(buyer);
    handleDelete();
  };

  return  (
    <>
      <ToastContainer />
      <Container className="vh-90 align-items-center justify-content-center px-2 py-0 text-center custom-scrollbar category-form mt-0" style={{ backgroundColor: '#F0F4F8' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '20px', mb: 2, px: 5 }}>
            <h2>Buyers Details</h2>
          </Box>

          <TableContainer component={Paper} mt={5} px={4} py={1}>
            <Table sx={{ minWidth: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1b2b5d' }}>
                  <TableCell sx={{ color: 'seashell', fontWeight: 'bold' }}>#</TableCell>
                  <TableCell sx={{ color: 'seashell', fontWeight: 'bold' }}>NAME</TableCell>
                  <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>CONTACT</TableCell>
                  <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>EMAIL</TableCell>
                  <TableCell align="right" sx={{ color: 'seashell', fontWeight: 'bold' }}>ADDRESS</TableCell>
                  <TableCell align="left" sx={{ color: 'seashell', fontWeight: 'bold' }}>IMAGE</TableCell>
                  <TableCell align="left" sx={{ color: 'seashell', fontWeight: 'bold' }}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {buyers.map((buyer, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#F0F4F8' },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell component="th" scope="row" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                      {buyer ? `${buyer.first_name} ${buyer.last_name}` : ''}
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: 'bold' }}>
                      {buyer.phone ? `${buyer.phone}` : ''}
                    </TableCell>
                    <TableCell align="center" style={{  fontWeight: 'bold' }}>
                      {buyer.email ? `${buyer.email}` : ''}
                    </TableCell>
                    <TableCell align="right" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                      {buyer.address ? `${buyer.address}` : ''}
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: 'bold' }}>
                      <Avatar src={buyer.imageUrl} sx={{ width: 50, height: 50, backgroundColor: '#1b2b5d' }} />
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: 'bold' }}>
                      <CustomButton type="button" text="Delete" onClick = {() => handleDeleteClick(buyer)} sx={{ width: '80px' }} />
                    </TableCell>
                  </TableRow>
                ))} 
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </>
  );


}


function BuyerDetails() {
  return (
    <AdminNav  content={<BuyerFunction />}/>
  )
}

export default BuyerDetails