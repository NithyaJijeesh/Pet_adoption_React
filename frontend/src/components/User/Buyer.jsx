import React, { useEffect, useState } from 'react';
import AxiosInstance from '../axios';
import BuyerNav from './BuyerNav';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Container, InputBase, Paper, Dialog, DialogActions, DialogContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CustomButton from '../Button/CustomButton';
import defaultImage from '../../assets/default_pet_image.jpeg';
import { ToastContainer, toast } from 'react-toastify';


function BuyerFunction() {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedDonation, setSelectedDonation] = React.useState(null);

  const handleOpen = (donation) => {
    setSelectedDonation(donation);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDonation(null);
  };

  const fetchAvailable = () => {
    AxiosInstance.get('availabledonations/')
    .then(response => {

      const donationsWithImages = response.data.map(donation => {
        console.log(donation.image)
        const imageUrl = donation.image ? `${AxiosInstance.defaults.baseURL}${donation.image}` : defaultImage;
        console.log(imageUrl)
        return { ...donation, imageUrl };
        
      });
      
      setDonations(donationsWithImages);
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    fetchAvailable();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDonations = donations.filter(donation =>
    donation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.breed?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (donation) => {
    AxiosInstance.patch(`availabledonations/${donation.id}/`)
      .then(response => {
        toast.success("Success! You've Just Found Your Perfect Companion!");
        console.error(response.data);
        fetchAvailable();
      })
      .catch(error => {
        console.error(error);
        toast.error("Failed to complete the adoption.");
      });
  };

  return (
    <>
      <ToastContainer />
      <Container className="vh-90 d-flex px-2 py-0 text-center list-order custom-scrollbar category-form mt-0">
        <h2>Adopt A Companion</h2>
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 3, width: '100%', backgroundColor: '#F0F4F8' }}>
          <SearchIcon />
          <InputBase
            sx={{ ml: 1, flex: 1, height: '50px' }}
            placeholder="Companion Search"
            inputProps={{ 'aria-label': 'search donations' }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Paper>
        <Grid container spacing={4}>
          {filteredDonations.map((donation) => (
            <Grid item key={donation.id} xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#F0F4F8' }}>
                <CardMedia
                  component="img"
                  sx={{ height: 400 }}
                  image={donation.imageUrl} 
                  alt={donation.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {donation.name}
                  </Typography>
                  <Typography variant="h6" component="div" hidden>
                    {donation.breed?.name}
                  </Typography>
                  <Typography variant="h6" component="div" hidden>
                    {donation.category?.name}
                  </Typography>
                  <Typography variant="p" color="text.secondary" sx={{ fontFamily:'comic-neue'}}>
                    {donation.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mt: 2,
                      gap: '0.5rem',
                    }}
                  >
                    <CustomButton text='Purchase' onClick={() =>handleClick(donation)} sx={{ width: '150px' }} />
                    <CustomButton text='Know More' onClick={() => handleOpen(donation)} sx={{ width: '150px' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          
        </Grid>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        sx={{ '& .MuiDialog-paper': { width: '500px', maxHeight: '100vh' } }} 

      >
        <DialogContent>
          {selectedDonation && (
            <>
              <img 
                src={selectedDonation.imageUrl} 
                alt={selectedDonation.name} 
                style={{ width: '100%', height: '420px', marginTop: '1rem', overflow:'' }} 
              />
              <Typography variant="h6" component="div">
                {selectedDonation.name}
              </Typography>
              <Typography variant="p" component="div">
                {selectedDonation.category?.name} - {selectedDonation.breed?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                {selectedDonation.description}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <CustomButton text='CLOSE' onClick={handleClose} sx={{ width: '80px' }} />
        </DialogActions>
      </Dialog>
    </>
  );
}

function Buyer() {
  return (
    <div>
      <BuyerNav content={<BuyerFunction />} />
    </div>
  );
}

export default Buyer;
