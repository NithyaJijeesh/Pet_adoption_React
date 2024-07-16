import React, { useEffect, useState } from 'react';
import DonorNav from './DonorNav';
import AxiosInstance from '../axios';
import { Alert, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

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

  const handleAlertClick = () => {
    navigate('/purchaselist');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {donations.map((donation, index) => (
        <Alert
          key={index}
          variant="filled"
          severity="success"
          sx={{
            mb: 2,
            width: '100%',
            maxWidth: '100%',
            backgroundColor: '#4caf50',
            color: '#fff',
            borderRadius: '8px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#388e3c',
            },
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={handleAlertClick}
        >
          <Typography variant="body2">
            <strong>{donation.name}</strong> was adopted! 🎉
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            View Details
          </Typography>
        </Alert>
      ))}
    </Box>
  );
};

function DonorNotification() {
  return (
    <DonorNav content={<Notifications />} />
  );
}

export default DonorNotification;
