import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import AxiosInstance from '../axios';
import MuiCard from '@mui/joy/Card';
import MuiCardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
 import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

  const [pendingDonations, setPendingDonations] = useState(false);

  const navigate = useNavigate()


  useEffect(() => {
    AxiosInstance.get('admindashboard/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

      AxiosInstance.get('listdonations/')
      .then(response => {
        console.log(response.data);
        if (response.data.some(donation => donation.status === 'pending')) {
          setPendingDonations(true);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
      <Box sx={{ flexGrow: 1 }} px={2} py= {4} className="vh-100 px-2 py-4 text-center mt-5">
        {pendingDonations && (
          <Alert 
            variant="outlined" 
            severity="warning" 
            sx={{ mb: 5, justifyContent: 'center', textAlign: 'center', color: 'red', cursor: 'pointer' }}
            onClick={() => {
              console.log('Alert clicked!');
              navigate('/adminnotifications')
            }}
            // cursor
          >
            Attention Needed: Click Here to Handle Pending Donations!
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid xs={12} md={4} lg={4}>
            <Box>
              <MuiCard variant="soft" p={2} sx={{ height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <MuiCardContent>
                  <Typography level='title-lg'>Total Pets</Typography>
                  <Typography level="h2">15</Typography>
                </MuiCardContent>
              </MuiCard>
            </Box>
          </Grid>
          <Grid xs={12} md={4} lg={4}>
            <Box>
              <MuiCard variant="soft" p={2} sx={{ height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <MuiCardContent>
                  <Typography level='title-lg'>Users</Typography>
                  <Typography level='title-sm'>Total Donors: <span style={{ fontWeight: 'bold', fontSize: '1.6em' }}>23</span></Typography>
                  <Typography level='title-sm'>Total Buyers: <span style={{ fontWeight: 'bold', fontSize: '1.6em' }}>23</span></Typography>
                </MuiCardContent>
              </MuiCard>
            </Box>
          </Grid>
          <Grid xs={12} md={4} lg={4}>
            <Box>
              <MuiCard variant="soft" p={2} sx={{ height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <MuiCardContent>
                  <Typography level='title-lg'>Total Purchase</Typography>
                  <Typography level="h2">10</Typography>
                </MuiCardContent>
              </MuiCard>
            </Box>
          </Grid>

        </Grid>
      </Box>
  );
};

function AdminHome() {
  return (
    <AdminNav content={<Admin />} />
  );
}

export default AdminHome;
