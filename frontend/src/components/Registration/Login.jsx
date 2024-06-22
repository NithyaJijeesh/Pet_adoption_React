import React, { useState } from 'react';
import Footer from '../Landing Page/Footer';
import NavBar from '../Landing Page/NavBar';
import '../components.css'; 
import { Box } from '@mui/material';
import CustomButton from '../Button/CustomButton';
import '../components.css';

function Registration() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('buyer');

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleRadioChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="custom-scrollbar">
      <NavBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 , padding : '5rem'}}>
        <section id="auth" className={isSignUp ? 'sign-up' : ''}>
          <form id="sign-up">
            <h2 my={5}>Time to feel like home</h2>
            <label>First Name</label>
            <input type="text" />
            <label>Last Name</label>
            <input type="text" />
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <label>Confirm Password</label>
            <input type="password" />
            
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" value="donor" checked={role === 'donor'} onChange={handleRadioChange} />
                <span></span>
                Donor
              </label>
              <label className="radio-label">
                <input type="radio" value="buyer" checked={role === 'buyer'} onChange={handleRadioChange} />
                <span></span>
                Buyer
              </label>
            </div>
            <Box my={2} sx={{ justifyContent: 'center', textAlign: 'center', marginLeft: '30%' }}>
              <CustomButton type="submit" text="Sign up" onClick={(e) => e.preventDefault()} />
            </Box>
            <div className="toggle">
              Already have an account?
              <span onClick={handleToggle} sx={{ color: '#1b2b5d' }}> Log in</span>
            </div>
          </form>

          <form id="login">
            <h2>Welcome back</h2>
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <Box my={2} sx={{ justifyContent: 'center', textAlign: 'center', marginLeft: '30%' }}>
              <CustomButton type="submit" text="Log in" onClick={(e) => e.preventDefault()} />
            </Box>
            <div className="toggle" justifyContent='center' textAlign='center'>
              Have you been here before?
              <span onClick={handleToggle} sx={{ color: '#1b2b5d' }}> Sign up</span>
            </div>
          </form>

          <div id="slider">
            <div id="login-text">
              <h1>Good to see you again</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            </div>
            <div id="sign-up-text">
              <h1>Welcome to the thing</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            </div>
          </div>
        </section>
      </Box>
      <Footer />
    </div>
  );
}

export default Registration;
