import React, { useState } from 'react';
import Footer from '../Landing Page/Footer';
import NavBar from '../Landing Page/NavBar';
import '../components.css';
import { Box} from '@mui/material';
import CustomButton from '../Button/CustomButton';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../axios';

function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('donor');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailExistsError, setEmailExistsError] = useState('');
  const [usernameExistsError, setUsernameExistsError] = useState('');

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
      checkUserExists({ email: input });
    } else {
      setEmailError('Invalid email format');
    }
  };

  const handleUsernameChange = (e) => {
    const input = e.target.value;
    setUsername(input);
    if (input) {
      setUsernameError('');
      checkUserExists({ username: input });
    } else {
      setUsernameError('Username is required');
    }
  };

  const checkUserExists = async (params) => {
    try {
      const response = await AxiosInstance.get('check_user_exists/', { params });
      const { username_exists, email_exists } = response.data;
      if (params.username) {
        setUsernameExistsError(username_exists ? 'Username already exists' : '');
      }
      if (params.email) {
        setEmailExistsError(email_exists ? 'Email already exists' : '');
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
    }
  };

  const generateRandomPassword = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
    else {
      setImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailExistsError || usernameExistsError) {
      setErrorMessage('Please resolve the errors before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('user_type', role);
    formData.append('password', generateRandomPassword());
    if (image) {
        formData.append('image', image );
    }

    AxiosInstance.post('register/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response.data);
      navigate('/login');
    })
    .catch(error => {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.username) {
          setUsernameExistsError(errorData.username);
        }
        if (errorData.email) {
          setEmailExistsError(errorData.email);
        }
        setErrorMessage('Registration failed. Please try again.');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    });
  };

  const redirectToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="custom-scrollbar">
      <NavBar />
      <Box id='log-reg'>
        <section id="auth">
          <form id="sign-up" className="form-large-screen" onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}

            <h2>Time to feel like home</h2>
            
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <label>Username</label>
            {/* <input 
              type="text" 
              value={username} 
              onChange={handleUsernameChange} 
              className={usernameError || usernameExistsError ? 'input-error' : 'input-success'}

            />

            <label>Email</label>
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
            </div> */}

            <div className="input-with-icon">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className={usernameError || usernameExistsError ? 'input-error' : 'input-success'}
              />
              {usernameError || usernameExistsError ? (
                <ErrorIcon className="icon-error" />
              ) : (
                username && <CheckCircleIcon className="icon-success" />
              )}
            </div>
            {usernameExistsError && <div className="error-message" style={{ color: 'red' }} mb={5}>{usernameExistsError}</div>}
            <label>Email</label>
            <div className="input-with-icon">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={emailError || emailExistsError ? 'input-error' : 'input-success'}
              />
              {emailError || emailExistsError ? (
                <ErrorIcon className="icon-error" />
              ) : (
                email && <CheckCircleIcon className="icon-success" />
              )}
            </div>
            {emailExistsError && <div className="error-message" style={{ color: 'red' }} mb={5}>{emailExistsError}</div>}

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
            <textarea rows='2' value={address} onChange={(e) => setAddress(e.target.value)} />
            <label>Upload Image</label>
            <input type="file" onChange={handleImageChange} />

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
              <CustomButton type="submit" text="Sign up" onClick={handleSubmit} />
            </Box>
            <div className="toggle">
              Already have an account?
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
