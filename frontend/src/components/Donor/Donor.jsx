import React, { useEffect, useState } from 'react'
import DonorNav from './DonorNav'
import AxiosInstance from '../axios';
import MuiCard from '@mui/joy/Card';
import MuiCardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faShieldDog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '@mui/material';


const DonorFunction = () => {
  const [donations, setDonations] = useState([]);
  const [donationCount, setDonationCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get('donors/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    AxiosInstance.get('approveddonations/')
      .then(response => {
        setDonations(response.data);
        setDonationCount(response.data.length)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return(
    <Box sx={{ flexGrow: 1 }} px={2} py={4} className="vh-100 text-center mt-5">
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
              <Typography level="h2">15</Typography>
            </MuiCardContent>
          </MuiCard>
        </ButtonBase>
      </Grid>
    </Grid>
  </Box>
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