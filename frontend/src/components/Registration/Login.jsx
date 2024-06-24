import React, { useState } from 'react';
import Footer from '../Landing Page/Footer';
import NavBar from '../Landing Page/NavBar';
import '../components.css'; 
import { Box } from '@mui/material';
import CustomButton from '../Button/CustomButton';
import '../components.css';
import { useNavigate } from 'react-router-dom';


function Login () {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/registration'); 
  };
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="custom-scrollbar">
      <NavBar />
      <Box id= 'log-reg' >
        <section id="auth" >


          <form id="login">
            <h2>Welcome back</h2>
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <Box my={2} sx={{ justifyContent: 'center', textAlign: 'center', marginLeft: '35%' }}>
              <CustomButton type="submit" text="Log in" onClick={(e) => e.preventDefault()} />
            </Box>
            <div className="toggle" justifyContent='center' textAlign='center'>
              Have you been here before?
              <span onClick={redirectToLogin} sx={{ color: '#1b2b5d' }}> Sign up</span>
            </div>
          </form>


        </section>
      </Box>
      <Footer />
    </div>
  );
}

export default Login;
