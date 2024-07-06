import React, { useEffect } from 'react';
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
import {  useNavigate } from 'react-router-dom';
import { Avatar, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Cookies from "js-cookie"
import LogoutIcon from '@mui/icons-material/Logout';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const drawerWidth = 300;
const AdminNav = (props) => {

  const { content } = props;
  const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
  useEffect(() => {
      document.body.classList.add('home-background');

      return () => {
          document.body.classList.remove('home-background');
      };
  }, []);


  const handleLogout = () => {
    Cookies.remove('accessToken');
    navigate('/')

  };
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    <AppBar 
        // position="static"  
        position="fixed"
        sx={{ backgroundColor: '#bdbfc646', boxShadow: 'none', zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
            {/* {Object.keys(pagesMap).map((page) => (
              <Button
                className='btn-text'
                key={page}
                onClick={handleCloseNavMenu}
                href={pagesMap[page]}
                sx={{ my: 2,  display: 'block'}}
              >
                {page}
              </Button>
            ))} */}
          </Box>


          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Typography sx={{ minWidth: 50, color: '#1b2b5d', fontWeight: 600 }}>Admin</Typography>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 50, height: 50, backgroundColor:'#1b2b5d' }}>A</Avatar>
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
            <Avatar sx={{ backgroundColor: '#1b2b5d'}}/> Profile
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

      <Drawer
      variant="permanent"
      sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box', 
            zIndex: (theme) => theme.zIndex.appBar - 1,
            backgroundColor: '#1b2b5d', 
            color: 'seashell',
           
          },

        }}
      >
      <Toolbar />
      <Box sx={{ overflow: 'auto',paddingY:5 }}>
        <List>
          {[ 'Dashborard', 'Users', 'Pets', 'Category',  'Purchase', ''].map((text, index) => (
            <ListItem key={text} >
              <ListItemButton>
                <ListItemIcon sx={{ marginLeft: 3, color: 'seashell' }} >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText 
                  primary={text} 
                  sx={{ 
                        textTransform: 'uppercase', 
                        fontWeight:900, 
                      }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
            <ListItem key='Logout' onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon sx={{ marginLeft: 3, color: 'seashell' }}>
                   <LogoutIcon /> 
                </ListItemIcon>
                <ListItemText primary= 'LOGOUT' sx={{ textTransform: 'uppercase', fontWeight:900 }}  />
              </ListItemButton>
            </ListItem>
        </List>
      </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3,  }}>
        <Toolbar />
        {/* <div>{content}</div>
        <div>{content}</div>
        <div>{content}</div>
        <div>{content}</div>
        <div>{content}</div> */}
      </Box>
    </Box>
  );
};

export default AdminNav;
