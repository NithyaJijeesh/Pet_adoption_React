import React, { useEffect, useState } from 'react'
import DonorNav from './DonorNav'
import AxiosInstance from '../axios';
import MuiCard from '@mui/joy/Card';
import MuiCardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faShieldDog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '@mui/material';


const DonorFunction = () => {
  // const [donations, setDonations] = useState([]);
  const [donationCount, setDonationCount] = useState(0);
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [recentCount, setRecentCount] = useState(0);
  const navigate = useNavigate();
  const [purchasedDonations, setPurchasedDonations] = useState(false);

  useEffect(() => {
    AxiosInstance.get('donors/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    AxiosInstance.get('alldonations/')
      .then(response => {
        // setDonations(response.data);
        setDonationCount(response.data.length)
      })
      .catch(error => {
        console.error(error);
      });

      AxiosInstance.get('purchasedonations/')
      .then(response => {
        setPurchaseCount(response.data.length)

        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        const recentPurchases = response.data.filter(donation => {
          const purchasedDate = new Date(donation.purchased_date);
          return purchasedDate >= tenDaysAgo;
        });
        if (recentPurchases.length > 0) {
          console.log('Purchases happened within the last 10 days');
          setRecentCount(recentPurchases.length)
          setPurchasedDonations(true);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return(
    <>
    
    <Box sx={{ flexGrow: 1 }} px={2} py={0} className="vh-100 text-center mt-5">
    {purchasedDonations && (
      <Alert
          variant="outlined"
          severity="warning"
          sx={{
            mb: 5,
            width: '100%',
            maxWidth: '100%',
            color: '#1b2b5d',
            borderRadius: '8px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#F0F4F8',
            },
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {navigate('/purchaselist')}}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            🎉 Great News! 🎉
          </Typography>
          <Typography variant="body2" sx={{ mt: 0, p:0, fontWeight: 'bold' }}>
            Your pet donation(s) have been adopted! 🐾
          </Typography>
          <Typography variant="body2" sx={{ mt: 0, p:0 }}>
            You have {recentCount} recent adoption(s) to see. Click here to view details.
          </Typography>
      </Alert>
    )}
    <Grid container spacing={2}>
      <Grid xs={12} md={6} lg={6}>
        <ButtonBase
          sx={{ width: '100%', height: '100%' }}
          onClick={() => navigate('/donationlist')} 
        >
          <MuiCard
            variant="soft"
            p={2}
            sx={{
              height: '150px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <MuiCardContent>
              <FontAwesomeIcon icon={faShieldDog} size='2x'/>
              <Typography level="h3" mb={2}>Donations</Typography>
              <Typography level="h2">{donationCount}</Typography>
            </MuiCardContent>
          </MuiCard>
        </ButtonBase>
      </Grid>
      <Grid xs={12} md={6} lg={6}>
        <ButtonBase
          sx={{ width: '100%', height: '100%' }}
          onClick={() => navigate('/purchaselist')} 
        >
          <MuiCard
            variant="soft"
            p={2}
            sx={{
              height: '150px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <MuiCardContent>
              <FontAwesomeIcon icon={faStore}  size='2x'/>
              <Typography level="h3" mb={2}>Purchase</Typography>
              <Typography level="h2">{purchaseCount}</Typography>
            </MuiCardContent>
          </MuiCard>
        </ButtonBase>
      </Grid>
    </Grid>
  </Box>
  </>
  );
}
function Donor() {
  
  return (
    <div>
      <DonorNav content = {<DonorFunction />}/>
    </div>
  )
}

export default Donor