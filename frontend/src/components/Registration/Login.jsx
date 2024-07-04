import React, { useState } from 'react';
import Footer from '../Landing Page/Footer';
import NavBar from '../Landing Page/NavBar';
import '../components.css'; 
import { Alert, Box } from '@mui/material';
import CustomButton from '../Button/CustomButton';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../axios';
import Cookies from 'js-cookie';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  const redirectToRegistration = () => {
    navigate('/registration'); 
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (username && password) {
      
      let data = {
        "password": password,
        "username": username
      };

      AxiosInstance.post('login/', data)
        .then(response => {

          const { access, refresh } = response.data;
          const decoded = JSON.parse(atob(access.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
          const userType = decoded.user_type;

          Cookies.set('accessToken', access, { expires: 7 });
          Cookies.set('refreshToken', refresh, { expires: 7 });
          Cookies.set('userType', userType, { expires: 7 });

          if (userType === 'admin') {
            console.log(userType)
            navigate('/admindashboard');
          } else if (userType === 'donor') {
            navigate('/donordashboard');
          } else if (userType === 'buyer') {
            navigate('/buyerdashboard');
          } else {
            navigate('/login');
          }
        })
        .catch(error => {
          console.error(error);
          setErrorMessage('Invalid username or password. Please try again.');
        });
    } else {
      setErrorMessage('Enter Username and Password');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="custom-scrollbar">
      <NavBar />
      
      <Box id='log-reg'>
        <section id="auth">
          <form id="login" onSubmit={handleSubmit}>
          {errorMessage && <Alert variant="outlined" severity="error" style={{ color: 'red' }}>{errorMessage}</Alert>}
            <h2>Welcome back</h2>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='login-input'/>
            <label>Password</label>
            {/* <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span class="flex justify-around items-center" onClick={handleToggle}>
                <Icon class="absolute mr-10" icon={icon} size={25}/>
            </span> */}
            <div className="password-input-container">
              <input type={type} value={password} onChange={(e) => setPassword(e.target.value)} />
              <span onClick={handleToggle}>
                <Icon icon={icon} size={25} />
              </span>
            </div>
            <Box my={2} sx={{ justifyContent: 'center', textAlign: 'center', marginLeft: '35%' }}>
              <CustomButton type="submit" text="Log in" onClick={handleSubmit} />
            </Box>
            <div className="toggle" justifyContent='center' textAlign='center'>
              Have you been here before?
              <span onClick={redirectToRegistration} sx={{ color: '#1b2b5d' }}> Sign up</span>
            </div>
          </form>
        </section>
      </Box>
      <Footer />
    </div>
  );
}

export default Login;
