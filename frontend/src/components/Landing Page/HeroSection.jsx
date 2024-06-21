import React from 'react';
import { Box, Typography, Grid} from '@mui/material';
import '../components.css';
import CustomButton from '../Button/CustomButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import circleImage1 from '../../assets/pet-images-10.jpeg';
// import circleImage2 from '../../assets/pet-images-2.jpeg';
import petImage from '../../assets/pet-images-3.jpg';
import CustomButton2 from '../Button/CustomButton2';



const HeroSection = () => {

  return (
    <Box
      sx={{
        width: 'auto',
        height: '550px',
        // backgroundColor: 'seashell',
        backgroundImage: `url(${petImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#fff',
        textAlign: 'center',
        padding: '0 20px', 
        borderBottomLeftRadius: '30px',
        borderBottomRightRadius: '30px',
      }}
    >
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx = {{backgroundImage : "url('../../assets/pet-images-3.jpg')"}}>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom className='hero-text'>
            Welcome to <span style={{ textTransform: 'uppercase', fontFamily: 'cursive', fontWeight: 900,letterSpacing: '.1rem', fontSize : '50px'}}>PETIFY</span>
          </Typography>
          <Typography variant="h5" component="p" gutterBottom className='hero-text' sx={{ fontWeight : 500, fontSize: '30px' }}>
            Give them the love they deserve
          </Typography><br /><br />
          
          <Grid container direction="column" alignItems="center">
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, padding : '1rem', gap: '1rem', }}>
          <CustomButton text="Join Our Community"  />
          <CustomButton2 text="Watch Video" icon={<PlayCircleIcon />} />
          </Grid>
        </Grid>
      </Grid>

        {/* Right column for round images */}
        {/* <Grid item xs={12} sm={6}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Avatar
                alt="Circle Image 2"
                src={circleImage2}
                sx={{
                  width: { xs: '150px', sm: '200px', md : '220px', lg : '220px', xl : '250px' },
                  height: { xs: '150px', sm: '200px', md : '220px', lg : '220px', xl : '250px' },
                  border: '2px solid #1b2b5d',
                }}
              />
            </Grid>
            <Grid item>
              <Avatar
               alt="Circle Image 1"
               src={circleImage1}
               sx={{
                 width: { xs: '150px', sm: '200px', md : '260px', lg : '260px', xl : '350px' },
                 height: { xs: '150px', sm: '200px', md : '265px', lg :'260px', xl : '350px' },
                 border: '2px solid #1b2b5d',
               }}
              />
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default HeroSection;
