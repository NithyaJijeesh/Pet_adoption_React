import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar} from '@mui/material';
import AxiosInstance from '../axios';
import { Container } from 'react-bootstrap';
import defaultImage from '../../assets/default_pet_image.jpeg';
import CustomButton from '../Button/CustomButton';
import { toast, ToastContainer } from 'react-toastify';


const PetsFunction = () =>{
  // const [s, setDonors] = useState([])
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const handleDelete = () => {
    if (selectedDonation) {
      console.log('clicked');

      AxiosInstance.delete(`approveddonations/${selectedDonation.id}/`)
        .then(() => {
          console.log('yes')
          toast.success('Donation entry deletion completed!');
          fetchDonations();
        })
        .catch(error => {
          console.error(error);
          toast.error('Failed to delete donation');
        });
    }
  };
  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = () => {
    AxiosInstance.get('approveddonations/')
      .then(response => {
        const petsDetails = response.data.map(donors => {
          const relativeImagePath = donors.image || defaultImage;
          const imageUrl = relativeImagePath.startsWith('/media/') ? `${AxiosInstance.defaults.baseURL}${relativeImagePath}` : defaultImage;
          return {
            ...donors,
            imageUrl: imageUrl
          };
        });
        setDonations(petsDetails);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteClick = (donation) => {
    setSelectedDonation(donation);
    handleDelete();
  };
 
  return(
    <Container 
        className="vh-90 align-items-center justify-content-center px-2 py-0 text-center custom-scrollbar category-form mt-0" 
        style={{ backgroundColor: '#F0F4F8' }}
    >
      <h2>Pets Information</h2>
        <TableContainer component={Paper} mt={5} px={4} py={1}>
          <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1b2b5d'}}>
                <TableCell sx={{ color: 'seashell', fontWeight: 'bold' }}>PET NAME</TableCell>
                <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>CATEGORY</TableCell>
                <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>BREED</TableCell>
                <TableCell align="right" sx={{ color: 'seashell', fontWeight: 'bold' }}>DESCRIPTION</TableCell>
                <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>DONOR</TableCell>
                <TableCell align="left" sx={{ color: 'seashell', fontWeight: 'bold' }}>ACTION</TableCell>
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
                  {/* <TableCell align="right" style={{ textTransform: 'capitalize',fontWeight: 'bold' }}>
                    <Avatar src={donation.imageUrl} sx={{ width: 50, height: 50, backgroundColor: '#1b2b5d' }} />
                  </TableCell> */}
                  <TableCell align="center" style={{ textTransform: 'capitalize',fontWeight: 'bold' }}>
                    {donation.donor ? `${donation.donor.first_name} ${donation.donor.last_name}` : 'Unknown'} 
                  </TableCell>
                  <TableCell align="right" style={{ textTransform: 'capitalize',fontWeight: 'bold'}}>
                    <CustomButton type="button" text="Delete" onClick = {() => handleDeleteClick(donation)} sx={{ width: '80px' }} />
                  </TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>
      {/* </Box> */}
    </Container>
  )
}

function Pets() {
  return (
    <AdminNav content = {<PetsFunction />} />
  )
}

export default Pets