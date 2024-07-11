import React from 'react';
import AdminNav from './AdminNav';
import MuiCard from '@mui/joy/Card';
import MuiCardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersGear, faUsersLine } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function UserFunction() {
    const navigate = useNavigate();


  return (
    <Box sx={{ flexGrow: 1 }} px={2} py={4} className="vh-100 text-center mt-5">
      <Grid container spacing={2}>
        <Grid xs={12} md={6} lg={6}>
          <ButtonBase
            sx={{ width: '100%', height: '100%' }}
            onClick={() => navigate('/buyerdetails')} 
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
                <Typography level="h3" mb={2}>Buyers</Typography>
                <FontAwesomeIcon icon={faUsersLine} size='2x'/>
              </MuiCardContent>
            </MuiCard>
          </ButtonBase>
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <ButtonBase
            sx={{ width: '100%', height: '100%' }}
            onClick={() => navigate('/donordetails')} 
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
                {/* <Person fontSize="large" /> */}
                <Typography level="h3" mb={2}>Donors</Typography>
                <FontAwesomeIcon icon={faUsersGear} size='2x'/>
              </MuiCardContent>
            </MuiCard>
          </ButtonBase>
        </Grid>
      </Grid>
    </Box>
  );
}

const Users = () => {
  return (
    <AdminNav content={<UserFunction />} />
  );
}

export default Users;
