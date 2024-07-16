import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import '../components.css';
import pawLogo from '../../assets/logo2.png'; 
import CustomButton from '../Button/CustomButton'; 
import CustomButton2 from '../Button/CustomButton2';
import { useLocation, useNavigate } from 'react-router-dom';



const pagesMap = {
  Home: '/',
  Category: '/',
  About: '/',
  Contact: '/'
};

const pagesExtraMap = {
  Home: '/',
  Category: '/',
  About: '/',
  Contact: '/',
  Login : '/login'
};

const NavBar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      document.body.classList.add('home-background');

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

  // const handleNavigate = (path) => {
  //   handleCloseNavMenu();
  //   navigate(path);
  // };

  return (
    <AppBar 
        position="static"  
        sx={{ backgroundColor: '#bdbfc646', boxShadow: 'none', zIndex: 1300 }}
        className='appBar'
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
                sx={{ my: 2,  display: 'block',gap : 5, justifyContent:'space-evenly'}}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2, 
              gap: '0.5rem',
            }}

          >
            {location.pathname !== '/login' && ( 
              <CustomButton text="Login" sx={{ width: '150px' }} onClick={() => navigate('/login')} />
            )}
            {location.pathname !== '/registration' &&(
              <CustomButton2 text="Signup" sx ={{ width : '150px' }} onClick={() => navigate('/registration')} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
