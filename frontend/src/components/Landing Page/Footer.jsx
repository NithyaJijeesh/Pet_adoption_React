import React from "react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import pawLogo from '../../assets/logo2.png'; 
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsappIcon from '@mui/icons-material/WhatsApp';


function  Footer() {
  return (
    <Box
      sx={{

        paddingTop: "1rem",
        paddingBottom: "1rem",
        width: 'auto',
        height: "auto",
        backgroundColor: 'seashell',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '/fff',
        textAlign: 'center',
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, padding : '1rem', }}>
            <Box display={{ xs: 'none', md: 'flex' }} m={0} p={0}>
                <img src={pawLogo} alt="logo" style={{ height: '50px', width: '50px', mr : 0 }} />
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
                    fontSize : '20px',
                    letterSpacing: '.1rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                }}
                 className='btn-text'
            >
              PETIFY
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', mb: 2 }}>
              <Typography 
                component="a" 
                href="/" 
                sx={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  fontWeight: 800,
                  letterSpacing: '.01rem',
                }}
                className='btn-text'
              >
                CONTACT
              </Typography>
              <Typography 
                component="a" 
                href="/" 
                sx={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  fontWeight: 900,
                  letterSpacing: '.01rem',
                }}
                className='btn-text'
              >
                ABOUT US
              </Typography>
              <Typography 
                component="a" 
                href="/" 
                sx={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  fontWeight: 900,
                  letterSpacing: '.01rem',
                }}
                className='btn-text'
              >
                FAQ
              </Typography>

              <Typography 
                component="a" 
                href="/" 
                sx={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  fontWeight: 900,
                  letterSpacing: '.01rem',
                }}
                className='btn-text'
              >
                BLOG
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <section className='mb-4'>
              <IconButton sx={{ color: 'green' }} href='/'>
                <WhatsappIcon />
              </IconButton>
              <IconButton sx={{ color: '#3b5998' }} href='/'>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: '#E1306C' }} href='/'>
                <InstagramIcon />
              </IconButton>
            </section>
          </Grid>

          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1" sx={{ fontFamily: 'cursive', }}>
                © {new Date().getFullYear()}  &nbsp;
                <Box component="a" 
                     href="/" 
                     sx={{ 
                            textDecoration: 'none', 
                            color: 'inherit', 
                            letterSpacing: '.05rem', 
                        }}
                >
                  PETIFY
                </Box>
                . All rights reserved
            </Typography>
          </Grid> 
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;