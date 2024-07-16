import React, { useEffect, useState } from 'react';
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
import defaultProfileImage from '../../assets/default_image.jpeg';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, Divider, ListItemIcon, Tooltip } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Cookies from "js-cookie"
import AxiosInstance from '../axios';
import MenuIcon from '@mui/icons-material/Menu';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const pagesMap = {
  Home: '/buyerdashboard',
  Services: '/buyerdashboard',
  Adoption: '/buyerdashboard',
  Contact : '/buyerdashboard'
};

const pagesExtraMap = {
  Home: '/buyerdashboard',
  Services: '/buyerdashboard',
  Adoption: '/buyerdashboard',
  Contact : '/buyerdashboard',
  Logout : "Cookies.remove('accessToken')"
};
    

const BuyerNav = (props) => {

    const { content } = props;
 
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [profileImage, setProfileImage] = useState(defaultProfileImage);
    const [profileName, setProfileName] = useState('Buyer');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    
        setAnchorEl(null);
    };

    useEffect(() => {
        document.body.classList.add('home-background');

        AxiosInstance.get('buyers/')
        .then(response => {
            console.log(response.data?.image)
            const relativeImagePath = response.data?.image || defaultProfileImage;
            const imageUrl = relativeImagePath.startsWith('/media/') ? `${AxiosInstance.defaults.baseURL}${relativeImagePath}` : defaultProfileImage; // Construct full URL 
            setProfileImage(imageUrl);

            const profilename = response.data ? `${response.data.first_name} ${response.data.last_name}` : 'Buyer';
            setProfileName(profilename);
        })
        .catch(error => {
            console.error(error);
        });
        return () => {
            document.body.classList.remove('home-background');
        };
    }, []);

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleLogout = () => {
    // localStorage.removeItem('auth_token')
    Cookies.remove('accessToken');
    navigate('/')

    };
      
    
    return (
      <Box  >
        <CssBaseline />
        <AppBar 
            position="static"  
            sx={{ backgroundColor: '#bdbfc646', boxShadow: 'none', zIndex: 1300 }}
            className='appBar'
            mb={0}
        >
            <Container maxWidth="xl" >
            <Toolbar disableGutters>
                <Box display={{ xs: 'none', md: 'flex' }} m={0} p={0}>
                <img src={pawLogo} alt="logo" style={{ height: '80px', width: '80px', mr : 0 }} />
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
                    fontSize : '26px',
                    letterSpacing: '.1rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                }}
                className='btn-text'
                >
                PETIFY
                </Typography>
                
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  sx={{ color: '#1b2b5d', }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },  
                    justifyContent: 'flex-end',
                    color: 'red',
                  }}
                >
                  {Object.keys(pagesExtraMap).map((page) => (
                    <MenuItem 
                      key={page} 
                      onClick={handleCloseNavMenu} 
                      component="a"
                      href={pagesExtraMap[page]} 
                    >
                      <Typography 
                        textAlign="center" 
                        sx={{ 
                              color : '#1b2b5d', 
                              fontWeight:550, 
                              textTransform: 'uppercase'
                            }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
                

                <Box display={{ xs: 'flex', md: 'none', mr: 1 }} m={0} p={0}>
                <img src={pawLogo} alt="logo" style={{ height: '80px', width: '80px', mr : 0 }} />
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
                {Object.keys(pagesMap).map((page) => (
                  <Button
                    className='btn-text'
                    key={page}
                    onClick={handleCloseNavMenu}
                    href={pagesMap[page]}
                    sx={{ my: 2,  display: 'block', gap : 5, justifyContent:'space-evenly'}}
                  >
                    {page}
                  </Button>
                ))}
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
                {/* <Avatar sx={{ width: 50, height: 50, backgroundColor:'#1b2b5d' }}>B</Avatar> */}
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
            <MenuItem onClick={() => navigate('/buyerprofile')}>
              <ListItemIcon sx={{ color: '#1b2b5d' }}>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => navigate('/buyercategory')}>
              <ListItemIcon sx={{ color: '#1b2b5d' }}>
                <KeyIcon fontSize="small" />
              </ListItemIcon>
              Change Password
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
                <ListItemIcon sx={{ color: '#1b2b5d'}}>
                <Settings fontSize="small" />
                </ListItemIcon >
                Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon sx={{ color: '#1b2b5d'}}>
                <Logout fontSize="small"  />
                </ListItemIcon>
                Logout
            </MenuItem>
            </Menu>
            </Toolbar>
            </Container>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          <Toolbar />
          {content}
        </Box>
      </Box>
    );
};
    
export default BuyerNav