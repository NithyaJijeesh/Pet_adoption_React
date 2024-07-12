import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton } from '@mui/material';
import AxiosInstance from '../axios';
import { Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DonorNav from './DonorNav';
import CustomButton from '../Button/CustomButton';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../assets/default_image.jpeg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Approved() {
  const [donations, setDonations] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleMenuOpen = (event, donation) => {
    setAnchorEl(event.currentTarget);
    setSelectedDonation(donation);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedDonation(null);
  };

  const handleEdit = () => {
    if (selectedDonation) {
      navigate(`/updatedonation/${selectedDonation.id}`);
      handleClose();
    }
  };

  const handleDelete = () => {
    if (selectedDonation) {
      AxiosInstance.delete(`donations/${selectedDonation.id}/`)
        .then(() => {
          toast.success('Donation deleted successfully');
          fetchDonations();
        })
        .catch(error => {
          console.error(error);
          toast.error('Failed to delete donation');
        });
      handleClose();
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = () => {
    AxiosInstance.get('approveddonations/')
      .then(response => {
        const processedDonations = response.data.map(donation => {
          const relativeImagePath = donation.image || defaultProfileImage;
          const imageUrl = relativeImagePath.startsWith('/media/') ? `${AxiosInstance.defaults.baseURL}${relativeImagePath}` : defaultProfileImage;
          return {
            ...donation,
            imageUrl: imageUrl
          };
        });
        setDonations(processedDonations);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <Container className="vh-90 align-items-center justify-content-center px-2 py-0 text-center custom-scrollbar category-form mt-0" style={{ backgroundColor: '#F0F4F8' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', gap: '20px', mb: 2, px: 5 }}>
          <h2>Your Appreciated Pet Donations</h2>
          <CustomButton type="button" text="Donate" onClick={() => navigate('/donations')} sx={{ width: '80px' }} mb={0} />
        </Box>

        <TableContainer component={Paper} mt={5} px={4} py={1}>
          <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1b2b5d' }}>
                <TableCell sx={{ color: 'seashell', fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ color: 'seashell', fontWeight: 'bold' }}>PET NAME</TableCell>
                <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>CATEGORY</TableCell>
                <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>BREED</TableCell>
                <TableCell align="right" sx={{ color: 'seashell', fontWeight: 'bold' }}>DESCRIPTION</TableCell>
                <TableCell align="left" sx={{ color: 'seashell', fontWeight: 'bold' }}>IMAGE</TableCell>
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
                  <TableCell component="th" scope="row" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                    {donation.name}
                  </TableCell>
                  <TableCell align="center" style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {donation.category ? `${donation.category.name}` : ''}
                  </TableCell>
                  <TableCell align="center" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                    {donation.breed ? `${donation.breed.name}` : ''}
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    {donation.description ? `${donation.description}` : ''}
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    <Avatar src={donation.imageUrl} sx={{ width: 50, height: 50, backgroundColor: '#1b2b5d' }} />
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    <IconButton
                      aria-label="more"
                      aria-controls="account-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuOpen(event, donation)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.2))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 35,
                            height: 35,
                            ml: -0.5,
                            mr: 0.5,
                          },
                          '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem onClick={handleEdit}>
                        <ListItemIcon sx={{ color: '#1b2b5d' }}>
                          <EditNoteIcon fontSize="medium" />
                        </ListItemIcon>
                        EDIT
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>
                        <ListItemIcon sx={{ color: '#1b2b5d' }}>
                          <DeleteForeverIcon fontSize="medium" />
                        </ListItemIcon>
                        DELETE
                      </MenuItem>
                    </Menu>
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

function DonationList() {
  return (
    <DonorNav content={<Approved />} />
  );
}

export default DonationList;
