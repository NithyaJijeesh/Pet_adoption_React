import React, { useState } from 'react';
import Footer from '../Landing Page/Footer';
import NavBar from '../Landing Page/NavBar';
import '../components.css';
import { Box } from '@mui/material';
import CustomButton from '../Button/CustomButton';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';


function Registration() {
  const [role, setRole] = useState('donor');
  const [phone, setPhone] = useState('+91 ');
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();



  const handleRadioChange = (e) => {
    setRole(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (input.startsWith('+91 ')) {
      const number = input.slice(4);
      if (/^\d{0,10}$/.test(number)) {
        setPhone(input);
        if (number.length !== 10) {
          setPhoneError('Phone number must be 10 digits long');
        } else {
          setPhoneError('');
        }
      }
    }
  };

  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
    if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(input)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email format');
    }
  };

  const redirectToLogin = () => {
    navigate('/login'); // Navigate to /login route
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="custom-scrollbar">
      <NavBar />
      <Box id= 'log-reg' >
        <section id="auth" >
          <form id="sign-up" className="form-large-screen">
            <h2>Time to feel like home</h2>
            <label>First Name</label>
            <input type="text" />
            <label>Last Name</label>
            <input type="text" />
            <label>Username</label>
            <input type="text" />
            <label>Email</label>
            {/* <input type="text" /> */}
            <div className="input-with-icon">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={emailError ? 'input-error' : 'input-success'}
              />
              {emailError ? (
                <ErrorIcon className="icon-error" />
              ) : (
                email && <CheckCircleIcon className="icon-success" />
              )}
            </div>
            <label>Phone</label>
            <div className="input-with-icon">
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className={phoneError ? 'input-error' : 'input-success'}
              />
              {phoneError ? (
                <ErrorIcon className="icon-error" />
              ) : (
                phone.length === 14 && <CheckCircleIcon className="icon-success" />
              )}
            </div>
            <label>Address</label>
            <textarea rows='2' />
            <label>Upload File</label>
            <input type="file" />
            {/* <label>Password</label>
            <input type="password" />
            <label>Confirm Password</label>
            <input type="password" /> */}

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
            <Box my={2} sx={{ justifyContent: 'center', textAlign: 'center', marginLeft: '35%' }}>
              <CustomButton type="submit" text="Sign up" onClick={(e) => e.preventDefault()} />
            </Box>
            <div className="toggle">
              Already have an account?
              {/* <span onClick={handleToggle} sx={{ color: '#1b2b5d' }}> Log in</span> */}
              <span onClick={redirectToLogin} style={{ color: '#1b2b5d', cursor: 'pointer' }}> Log in</span>

            </div>
          </form>


        </section>

      </Box>
      <Footer />
    </div>
  );
}

export default Registration;
