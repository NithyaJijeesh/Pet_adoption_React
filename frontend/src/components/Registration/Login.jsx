import React, { useEffect, useState } from 'react';
import Footer from '../Landing Page/Footer';
import NavBar from '../Landing Page/NavBar';
import '../components.css'; 
import { Box } from '@mui/material';
import CustomButton from '../Button/CustomButton';
import '../components.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



function Login () {
  const navigate = useNavigate();
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const redirectToLogin = () => {
    navigate('/registration'); 
  };

  function HandleSubmit(){
    console.log('yes')
    if(username && password){
      console.log(password,username)
      let data =  {
        "password": password,
        "username": username
      }
      const headers = { 
        'Content-Type': 'application/json'
      }
      axios.post('http://127.0.0.1:8000/login/',data,headers)
        .then(response => {
          if (response.data) {
            console.log(response.data)
          } else {
            console.log('Some error during login')
            // toast.error('Some error during login');
          }
        })
        .catch(error => {
          console.log(error)
          // toast.error('Failed to login');
        });
    }
    else{
      alert("Enter Username and Password")
    }
    
  }

  // useEffect(() => {
  //   AxiosInstance.get(`login/data/`)
  //     .then(response => {
  //       if (response.data) {
  //         console.log(response.data)
  //       } else {
  //         toast.error('No customers or items found');
  //       }
  //     })
  //     .catch(error => {
  //       toast.error('Failed to load customers and items');
  //     });
  // }, []);
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="custom-scrollbar">
      <NavBar />
      {/* <div>
        <ToastContainer />
      </div> */}
      <Box id= 'log-reg' >
        <section id="auth" >


          <form id="login">
            <h2>Welcome back</h2>
            <label>Username</label>
            <input type="text" onChange={ (e) => setUsername(e.target.value)} />
            <label>Password</label>
            <input type="password" onChange={ (e) => setPassword(e.target.value)} />
            <Box my={2} sx={{ justifyContent: 'center', textAlign: 'center', marginLeft: '35%' }}>
              <CustomButton type="submit" text="Log in" onClick={HandleSubmit} />
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
