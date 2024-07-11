import React, { useEffect,useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import '../components.css';
import pawLogo from '../../assets/logo2.png';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip} from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Cookies from "js-cookie";
import LogoutIcon from '@mui/icons-material/Logout';
import StoreIcon from '@mui/icons-material/Store';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AxiosInstance from '../axios';
import defaultProfileImage from '../../assets/default_image.jpeg';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PetsIcon from '@mui/icons-material/Pets';

const drawerWidth = 300;

const DonorNav = (props) => {

  const { content } = props;

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [profileName, setProfileName] = useState('Donor');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    document.body.classList.add('home-background');

    AxiosInstance.get('donors/')
        .then(response => {
            
            const relativeImagePath = response.data.image || defaultProfileImage;
            console.log('Donor details', relativeImagePath)
            const imageUrl = relativeImagePath.startsWith('/media/') ? `${AxiosInstance.defaults.baseURL}${relativeImagePath}` : defaultProfileImage; 
            setProfileImage(imageUrl);

            const profilename = response.data.first_name ? `${response.data.first_name} ${response.data.last_name}` : 'Donor';
            setProfileName(profilename);
        })
        .catch(error => {
            console.error(error);
        });

    return () => {
      document.body.classList.remove('home-background');
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove('accessToken');
    navigate('/');
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed"
        sx={{ 
          backgroundColor: '#bdbfc646', 
          boxShadow: 'none', 
          zIndex: (theme) => theme.zIndex.drawer + 1 
        }}
        className='appBar'
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box display={{ xs: 'none', md: 'flex' }} m={0} p={0}>
              <img src={pawLogo} alt="logo" style={{ height: '80px', width: '80px', marginRight: 0 }} />
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                ml: 0,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'cursive',
                fontWeight: 900,
                fontSize: '26px',
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
              className='btn-text'
            >
              PETIFY
            </Typography>
            
            <Box display={{ xs: 'flex', md: 'none', mr: 1 }} m={0} p={0}>
              <img src={pawLogo} alt="logo" style={{ height: '80px', width: '80px', marginRight: 0 }} />
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'cursive',
                fontWeight: 900,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
              className='btn-text'
            >
              PETIFY
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {/* Placeholder for potential future navigation buttons */}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Typography sx={{ minWidth: 50, color: '#1b2b5d', fontWeight: 600, textTransform:'capitalize' }}>{profileName}</Typography>
            <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar src={profileImage} sx={{ width: 50, height: 50, backgroundColor: '#1b2b5d' }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 35,
                    height: 35,
                    ml: -0.5,
                    mr: 1,
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
              <MenuItem onClick={handleClose}>
                <ListItemIcon sx={{ color: '#1b2b5d' }}>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                {/* <Avatar sx={{ backgroundColor: '#1b2b5d'}} src={profileImage}/>  */}
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon sx={{ color: '#1b2b5d' }}>
                  <KeyIcon fontSize="small" />
                </ListItemIcon>
                Change Password
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon sx={{ color: '#1b2b5d' }}>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon sx={{ color: '#1b2b5d' }}>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            width: drawerWidth, 
            boxSizing: 'border-box', 
            zIndex: (theme) => theme.zIndex.appBar - 1,
            backgroundColor: '#1b2b5d', 
            color: 'seashell',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', paddingY: 5 }}>
          <List>
            <ListItem>
              <ListItemButton component={Link} to="/donordashboard">
                <ListItemIcon sx={{ marginLeft: 3, color: 'seashell' }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText 
                  primary='Dashboard' 
                  sx={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 900, 
                  }} 
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component={Link} to="/donationlist">
                <ListItemIcon sx={{ marginLeft: 3, color: 'seashell' }}>
                  <PetsIcon />
                </ListItemIcon>
                <ListItemText 
                  primary='Pet Donations' 
                  sx={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 900, 
                  }} 
                />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton component={Link} to="/donations">
                <ListItemIcon sx={{ marginLeft: 3, color: 'seashell' }}>
                  <VolunteerActivismIcon />
                </ListItemIcon>
                <ListItemText 
                  primary='Donate' 
                  sx={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 900, 
                  }} 
                />
              </ListItemButton>
            </ListItem>
             {/* <ListItem>
              <ListItemButton component={Link} to="/purchaselist">
                <ListItemIcon sx={{ marginLeft: 3, color: 'seashell' }}>
                    <StoreIcon />
                </ListItemIcon>
                <ListItemText 
                  primary='Purchase' 
                  sx={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 900, 
                  }} 
                />
              </ListItemButton>
            </ListItem> */}
          </List>
          <Divider />
          <List>

            <ListItem key='Notification' >
              <ListItemButton>
                <ListItemIcon sx={{ marginLeft: 3, color: 'seashell' }}>
                  <NotificationsActiveIcon /> 
                </ListItemIcon>
                <ListItemText primary='NOTIFICATIONS' sx={{ textTransform: 'uppercase', fontWeight: 900 }}  />
              </ListItemButton>
            </ListItem>

            <ListItem key='Logout' onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon sx={{ marginLeft: 3, color: 'seashell' }}>
                  <LogoutIcon /> 
                </ListItemIcon>
                <ListItemText primary='LOGOUT' sx={{ textTransform: 'uppercase', fontWeight: 900 }}  />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
};

export default DonorNav;
