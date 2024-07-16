import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Card, Box, TextField, Avatar, CardActions, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import Footer from './Footer';
import AspectRatio from '@mui/joy/AspectRatio';
import ClickableCard from './ClickableCard';
import aboutImage1 from '../../assets/bird.jpeg';
import aboutImage2 from '../../assets/pet-images-11.jpg';
import catImage from '../../assets/cat.png';
import dogImage from '../../assets/dog.png';
import birdImage from '../../assets/bird.png';
import pawImage from '../../assets/paw.png';
import dogImg1 from '../../assets/indian-pariah-dog-1.jpeg';
import dogImg2 from '../../assets/indian-pariah-dog-2.jpg';
import dogImg3 from '../../assets/Indianspitz.jpg';
import dogImg4 from '../../assets/beagle.jpeg';
import birdImg1 from '../../assets/bird5.jpg';
import catImg1 from '../../assets/cat1.jpg';
import catImg3 from '../../assets/cat3.jpeg';
import rabbitImg3 from '../../assets/rabbit.jpg';
import circleImage1 from '../../assets/pet-images-10.jpeg';
import circleImage2 from '../../assets/pet-images-2.jpeg';
import detailsImg1 from '../../assets/dog-adopt.jpg';
import detailsImg2 from '../../assets/cat-adopt.jpeg';
import '../components.css';
import CustomButton from '../Button/CustomButton';
import Cookies from 'js-cookie'

function Home() {

  const [hoverIndex, setHoverIndex] = useState(null);
  const boxRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const aboutImageRef1 = useRef(null);
  const aboutImageRef2 = useRef(null);

  const imageData = [
    { src: dogImg4, alt: "Beagle", category: 'Dog', title: "Pogo", breed: "Beagle" },
    { src: birdImg1, alt: "Bird", category: "Bird", title: "Dooby", breed: "Parrot" },
    { src: catImg1, alt: "Cat",category: "Cat",  title: "Oreo", breed: "" },
    { src: rabbitImg3, alt: "Rabbit", category: "Rabbit", title: "Snowie", breed: "" },
    { src: dogImg2, alt: "Dog",category: "Dog",  title: "Chase", breed: "Indian Pariah Dog" },
    { src: dogImg3, alt: "Dog", category: "Dog", title: "Cookie", breed: "Indian Spitz" },
    { src: dogImg1, alt: "Dog",category: "Dog",  title: "Rio", breed: "Indian Pariah Dog" },
    { src: catImg3, alt: "Cat", category: "Cat", title: "Bebo", breed: "" }
  ];

  useEffect(() => {

    Cookies.remove('accessToken');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }} className="custom-scrollbar">
      <NavBar />
      <HeroSection />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: '-3rem', width: '80%' }}>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  padding: '0.9rem' }}>
            <ClickableCard title="DOG" image={dogImage} alt="Dog Image" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  padding: '0.9rem' }}>
            <ClickableCard title="CAT" image={catImage} alt="Cat Image" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.9rem' }}>
            <ClickableCard title="BIRDS" image={birdImage} alt="Birds Image" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.9rem' }}>
            <ClickableCard title="OTHERS" image={pawImage} alt="Other Animals Image" />
          </Grid>
        </Grid>

        {/* ---------------------Category Section---------------- */}

        <Box
          ref={boxRef}
          className={`box-animate ${isVisible ? 'box-animate-visible' : ''}`}
          sx={{
            width: 'auto',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: 'seashell',
            borderRadius: '35px',
          }}
        >
          <Typography variant="h5" component="p" className='contentSub' my={3}>What's New?</Typography>
          <Typography variant="h4" component="h1" className='contentHead' sx={{ fontFamily: 'cursive' }}>Take A Look At Some Of Our Friends</Typography>
          <Grid container spacing={3} alignItems="center" justifyContent="center" mt={3}>
            {imageData.map((image, index) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Card
                  variant="outlined"
                  
                  sx={{
                    width: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    transition: 'transform 0.3s, border 0.3s',
                    '&:hover': {
                      borderColor: '#1b2b5d',
                      transform: 'translateY(-2px)',
                      border : '4px solid #1b2b5d'
                    },
                    
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <AspectRatio
                    variant="soft"
                    sx={{
                      flexGrow: 1,
                      '--AspectRatio-paddingBottom': '56.25%',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                    m={1}
                  >
                    <img
                      
                      src={image.src}
                      loading="lazy"
                      alt={image.alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'white',
                        
                      }}
                    />
                  </AspectRatio>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
                    <Typography variant="h5" className='text-color'>Name  : {image.title}</Typography>
                    <Typography variant="body1" className='text-color'>Category : {image.category}</Typography>
                    {image.breed && (
                      <Typography variant="body2" className='text-color'>Breed: {image.breed}</Typography>
                    )}
                    {hoverIndex === index && (
                      <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Link to="#" style={{ textDecoration: 'none', color: '#1b2b5d', marginTop: '8px' }}>Learn More...</Link>
                      </Box>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ---------------------End of Category Section---------------- */}


        {/* ----------------------------About section----------------------- */}

        <Box
          id="about"
          sx={{
            padding: '4rem',
            borderRadius: '30px',
            marginY: '5rem',
            textAlign: 'center',
          }}
         >
          <Typography variant="h4" component="h2" className='contentHead' sx={{ fontFamily: 'cursive' }} mb={3}>
            About Us
          </Typography>

          {/* Section 1: Image on the left */}
          <Grid container spacing={4} alignItems="center" mt={3}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <img
                    ref={aboutImageRef2}
                    src={aboutImage2}
                    alt="About Us"
                    // className={`image-animate ${isAboutImageVisible1 ? 'image-animate-visible' : ''}`}
                    style={{
                      borderRadius: '30px',
                      width: '100%',
                      maxWidth: '380px',
                      border: '2px solid #1b2b5d',
                    }}
                  />
                </Grid>
                <Grid item>
                  <img
                    ref={aboutImageRef1}
                    src={aboutImage1}
                    alt="About Us"
                    // className={`image-animate ${isAboutImageVisible1 ? 'image-animate-visible' : ''}`}
                    style={{
                      borderRadius: '30px',
                      width: '100%',
                      maxWidth: '350px',
                      border: '2px solid #1b2b5d',
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" className='contentSub'>OUR VISION</Typography>
              <Typography variant="h6" className='contentHead'>Who We Are</Typography>
              <Typography variant="body1" className='contentText'>
                We are a dedicated team of animal lovers committed to providing a safe haven for all pets in need. Our vision is to create a world where every animal is treated with love and respect.
              </Typography>
            </Grid>
          </Grid>

          {/* Section 2: Image on the right */}
          <Grid container spacing={4} alignItems="center" mt={6}>
            <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
              <Typography variant="h5" className='contentSub'>OUR MISSION</Typography>
              <Typography variant="h6" className='contentHead'>Adopt a Friend</Typography>
              <Typography variant="body1" className='contentText'>
                If you are looking for a friend to accompany you, then connect with us to get one of the finest breeds available. We aim to match every pet with the perfect owner to ensure a lifetime of happiness.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
              <Grid container spacing={2} justifyContent="center" >
                <Grid item >
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
                    width: { xs: '150px', sm: '200px', md : '260px', lg : '260px', xl : '320px' },
                    height: { xs: '150px', sm: '200px', md : '260px', lg :'260px', xl : '300px' },
                    border: '2px solid #1b2b5d',
                  }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* -------------------------------End of about section----------------------- */}


        {/* ----------------------------Details section----------------------- */}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '2rem',
            marginBottom: '2rem',
            padding: '3rem',
            backgroundColor: '#1b2b5d',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
            <Box
              ref={aboutImageRef1}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: '3rem',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                width: '100%',
                minHeight: 400,
              }}
            >
              <Card sx={{ width: { xs: '100%', md: '45%' }, height: '100%' }}>
                <CardMedia
                  component="img"
                  height="400px"
                  width="400px"
                  image={detailsImg1}
                  alt="Dog Adoption Article"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'cursive' }}>
                    Dog Adoption Article
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Learn more about caring for your dog
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to="#" style={{ textDecoration: 'none', color: '#1b2b5d', marginTop: '8px' }}>Read More</Link>
                </CardActions>
              </Card>

              <Card sx={{ width: { xs: '100%', md: '45%' }, height: '100%' }}>
                <CardMedia
                  // component="img"
                  // height="auto"
                  // image={detailsImg2}
                  // alt="Cat Adoption Article"

                  component="img"
                  height="400px"
                  width="400px"
                  image={detailsImg2}
                  alt="Cat Adoption Article"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'cursive' }}>
                    Cat Adoption Article
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Helpful insight to what to expect.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to="#" style={{ textDecoration: 'none', color: '#1b2b5d', marginTop: '8px' }}>Read More</Link>
                </CardActions>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* -------------------------------End of details section----------------------- */}
              
        {/* --------Contact Section---- */}

        <Box
          id="contact"
          className="contact"
          sx={{ backgroundColor: 'seashell', padding: '4rem', borderRadius: '30px' }}
          my={5}
        >
          <div className="container" sx={{ justifyContent: 'center', textAlign: 'center' }}>
            <Grid container spacing={10} mb={3} sx={{ padding: '3rem', borderRadius: '30px', justifyContent: 'center', textAlign: 'center' }}>
              <div className="section-header">
                <Typography variant="h4" component="h2" className='contentHead' sx={{ fontFamily: 'cursive' }} mb={2}>
                  Contact Us
                </Typography>
                <Typography variant="h6" className='contentSub'>
                  Connect with us to know more about PETIFY 
                </Typography>
              </div>
            </Grid>
            <Grid container spacing={5} p={0} sx={{ justifyContent: 'center', textAlign: 'center' }}>
              <Grid item xs={12} md={4} sx={{ borderRadius: '30px', backgroundColor: '#1b2b5d', color: 'seashell', justifyContent: 'center', textAlign: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 3 }} p={2} m={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                    <i className="bi bi-geo-alt" style={{ fontSize: '24px' }}></i>
                    <div>
                      <Typography variant="h5">Location:</Typography>
                      <Typography variant="body1">A108 Adam Street, New York, NY 535022</Typography>
                    </div>
                  </Box>
                  <Box >
                    <i className="bi bi-envelope" style={{ fontSize: '24px' }}></i>
                    <div>
                      <Typography variant="h5">Email:</Typography>
                      <Typography variant="body1">info@example.com</Typography>
                    </div>
                  </Box>
                  <Box >
                    <i className="bi bi-phone" style={{ fontSize: '24px' }}></i>
                    <div>
                      <Typography variant="h5">Call:</Typography>
                      <Typography variant="body1">+1 5589 55488 55</Typography>
                    </div>
                  </Box>
                  <Box >
                    <i className="bi bi-clock" style={{ fontSize: '24px' }}></i>
                    <div>
                      <Typography variant="h5">Open Hours:</Typography>
                      <Typography variant="body1">Mon-Sat: 11AM - 23PM</Typography>
                    </div>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={8} p={5} sx={{ backgroundColor: 'seashell', justifyContent : 'center', alignItems:'center' }}>
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="Your Name"
                        name="name"
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Your Email"
                        name="email"
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="subject"
                        label="Subject"
                        name="subject"
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="message"
                        label="Message"
                        name="message"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={7}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Box my={5} sx={{ justifyContent: 'center', textAlign: 'center', marginLeft: '40%' }}>
                      <CustomButton type="submit" text="Send Message" />
                    </Box>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </div>
        </Box>
        {/* ---------------------------------contact end------------------- */}
      </Box>
      <Footer />
    </div>
  );
}

export default Home;
