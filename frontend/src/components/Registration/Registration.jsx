import React, { useState } from 'react';
import styled from 'styled-components';
import dogImg1 from '../../assets/dog-image1.jpg'; // Ensure the path is correct
import Footer from '../Landing Page/Footer';
import NavBar from '../Landing Page/NavBar';
import '../components.css'; // Assuming you are keeping some CSS in a separate file
import { Box } from '@mui/material';
import CustomButton from '../Button/CustomButton';

const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 900px;
  height: 550px;
  margin: 50px auto 50px;
  background: seashell;
  padding: 1rem;
  border-radius: 30px;
`;

const SignInForm = styled.div`
  position: relative;
  width: calc(100% - 260px);
  height: 100%;
  transition: transform 1.2s ease-in-out;
  padding: 50px 30px 0;

  &.move {
    transform: translate3d(calc(100% - 260px), 0, 0);
  }
`;

const SubContainer = styled.div`
  overflow: hidden;
  position: absolute;
  left: calc(100% - 260px);
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  background: #fff;
  transition: transform 1.2s ease-in-out;

  &.move {
    transform: translate3d(calc((100% - 260px) * -1), 0, 0);
  }
`;

const ImgContainer = styled.div`
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 900px;
    height: 100%;
    background-image: url(${dogImg1});
    background-size: cover;
    transition: transform 1.2s ease-in-out;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
`;

const ImgText = styled.div`
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  transition: transform 1.2s ease-in-out;

  &.move {
    transform: translateX(520px);
  }
`;

const ImgButton = styled.div`
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
`;

const SignUpForm = styled.div`
  position: relative;
  width: calc(100% - 260px);
  height: 100%;
  transition: transform 1.2s ease-in-out;
  padding: 50px 30px 0;

  &.move {
    transform: translate3d(0, 0, 0);
  }
`;

function Registration() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <NavBar />
      <Container className={`cont ${isSignUp ? 's--signup' : ''}`}>
        <SignInForm className={`form sign-in ${isSignUp ? 'move' : ''}`}>
          <h2>Welcome back,</h2>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" />
          </label>
          <p className="forgot-pass">Forgot password?</p>

          <Box mt={2} textAlign="center">
              <CustomButton type="submit" text="Sign In" className="submit" />
          </Box>
          {/* <button type="button" className="submit">Sign In</button> */}
          {/* <button type="button" className="fb-btn">Connect with <span>facebook</span></button> */}
        </SignInForm>
        <SubContainer className={`sub-cont ${isSignUp ? 'move' : ''}`}>
          <ImgContainer className="img">
            <ImgText className={`img__text m--up ${isSignUp ? 'move' : ''}`}>
              <h2>New here?</h2>
              <p>Sign up and discover a great amount of new opportunities!</p>
            </ImgText>
            <ImgText className={`img__text m--in ${isSignUp ? 'move' : ''}`}>
              <h2>One of us?</h2>
              <p>If you already have an account, just sign in. We've missed you!</p>
            </ImgText>
            <ImgButton className="img__btn" onClick={handleToggle}>
              <span className={`m--up ${isSignUp ? 'move' : ''}`}>Sign Up</span>
              <span className={`m--in ${isSignUp ? 'move' : ''}`}>Sign In</span>
            </ImgButton>
          </ImgContainer>
          <SignUpForm className={`form sign-up ${isSignUp ? 'move' : ''}`}>
            <h2>Time to feel like home,</h2>
            <label>
              <span>Name</span>
              <input type="text" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" />
            </label>
            {/* <button type="button" className="submit">Sign Up</button> */}
            <Box mt={2} textAlign="center">
              <CustomButton type="submit" text="Sign Up" className="submit" />
            </Box>
            {/* <button type="button" className="fb-btn">Join with <span>facebook</span></button> */}
          </SignUpForm>
        </SubContainer>
      </Container>
      <Footer />
    </>
  );
}

export default Registration;
