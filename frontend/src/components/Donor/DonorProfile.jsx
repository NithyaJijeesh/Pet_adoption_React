import React, { useEffect, useState } from 'react';
import '../components.css';
import DonorNav from './DonorNav';
import CustomButton from '../Button/CustomButton';
import AxiosInstance from '../axios';
import defaultProfileImage from '../../assets/default_pet_image.jpeg';
import { Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function DonorFunction() {
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [donor, setDonor] = useState({});
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '+91 ', // Initialize phone with +91 
    address: '',
    image: defaultProfileImage,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailExistsError, setEmailExistsError] = useState('');
  const [usernameExistsError, setUsernameExistsError] = useState('');

  useEffect(() => {
    AxiosInstance.get('donors/')
      .then(response => {
        const data = response.data;
        const relativeImagePath = data.image || defaultProfileImage;
        const imageUrl = relativeImagePath.startsWith('/media/') ? `${AxiosInstance.defaults.baseURL}${relativeImagePath}` : defaultProfileImage;
        setProfileImage(imageUrl);
        setDonor(data);
        setFormData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleMessageClick = () => {
    setMessageVisible(true);
  };

  const handleCloseClick = () => {
    setMessageVisible(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Perform validation
    if (name === 'email') {
      if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
        setEmailError('');
        checkUserExists({ email: value });
      } else {
        setEmailError('Invalid email format');
      }
    } else if (name === 'username') {
      if (value) {
        setUsernameError('');
        checkUserExists({ username: value });
      } else {
        setUsernameError('Username is required');
      }
    } else if (name === 'phone') {
      // Ensure the phone number always starts with +91
      let input = value;
      if (!input.startsWith('+91 ')) {
        input = '+91 ' + input.replace(/^\+91\s*/, '');
      }
      // Limit to +91 followed by 10 digits
      if (input.length > 14) {
        input = input.slice(0, 14);
      }
      setFormData(prevData => ({
        ...prevData,
        phone: input
      }));

      const number = input.slice(4);
      if (/^\d{0,10}$/.test(number)) {
        setPhoneError(number.length !== 10 ? 'Phone number must be 10 digits long' : '');
      }
    }
  };

  const checkUserExists = async (params) => {
    try {
      const response = await AxiosInstance.get('check_user_edit_exists/', { params });
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setFormData(prevData => ({
        ...prevData,
        image: file
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (emailExistsError || usernameExistsError || emailError || phoneError) {
      setErrorMessage('Please resolve the errors before submitting.');
      return;
    }

    AxiosInstance.put('donors/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        setDonor(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error(error);
        setErrorMessage('An error occurred while updating the profile. Please try again.');
      });
  };

  return (
    <div className="wrapper">
      {isEditing ? (
        <div className="profile-card js-profile-card">
          <section id="profile">
            <form id="profile-section" onSubmit={handleFormSubmit}>
              <h2>Change Details</h2>
              {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
              <label>First Name</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleFormChange} />
              <label>Last Name</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleFormChange} />
              <label>Username</label>
              <div className="input-with-icon">
                <input type="text" name="username" value={formData.username} onChange={handleFormChange} className={usernameError || usernameExistsError ? 'input-error' : 'input-success'} />
                {usernameError || usernameExistsError ? (
                  <ErrorIcon className="icon-error" />
                ) : (
                  formData.username && <CheckCircleIcon className="icon-success" />
                )}
              </div>
              {usernameError && <div className="error-message" style={{ color: 'red' }}>{usernameError}</div>}
              {usernameExistsError && <div className="error-message" style={{ color: 'red' }}>{usernameExistsError}</div>}
              
              <label>Email</label>
              <div className="input-with-icon">
                <input type="email" name="email" value={formData.email} onChange={handleFormChange} className={emailError || emailExistsError ? 'input-error' : 'input-success'} />
                {emailError || emailExistsError ? (
                  <ErrorIcon className="icon-error" />
                ) : (
                  formData.email && <CheckCircleIcon className="icon-success" />
                )}
              </div>
              {emailError && <div className="error-message" style={{ color: 'red' }}>{emailError}</div>}
              {emailExistsError && <div className="error-message" style={{ color: 'red' }}>{emailExistsError}</div>}
              
              <label>Phone</label>
              <div className="input-with-icon">
                <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className={phoneError ? 'input-error' : 'input-success'} />
                {phoneError ? (
                  <ErrorIcon className="icon-error" />
                ) : (
                  formData.phone.length === 14 && <CheckCircleIcon className="icon-success" />
                )}
              </div>
              {phoneError && <div className="error-message" style={{ color: 'red' }}>{phoneError}</div>}
              
              <label>Address</label>
              <textarea rows='2' name="address" value={formData.address} onChange={handleFormChange} />

              <label>Change Image</label>
              <div className="profile-card__img1">
                <img src={profileImage} alt="Profile" />
              </div>
              <input type="file" onChange={handleImageChange} />
              
              <Box my={2} sx={{ justifyContent: 'center', textAlign: 'center' }} className='profile-card-ctr'>
                <CustomButton type='submit' text='Save' onClick={handleFormSubmit} />
                <CustomButton type='button' text='Cancel' onClick={() => setIsEditing(false)} />
              </Box>
            </form>
          </section>
        </div>
      ) : (
        <div className="profile-card js-profile-card">
          <div className="profile-card__img">
            <img src={profileImage} alt="Profile" />
          </div>
          <div className="profile-card__cnt js-profile-cnt">
            <div className="profile-card__name">{donor.first_name} {donor.last_name}</div>
            <div className="profile-card__details">
              <div className="profile-card__group">
                <span className="profile-card__label">Username: </span>
                <span className="profile-card__text">{donor.username}</span>
              </div>
              <div className="profile-card__group">
                <span className="profile-card__label">Email: </span>
                <span className="profile-card__text"><strong>{donor.email}</strong></span>
              </div>
              <div className="profile-card__group">
                <span className="profile-card__label">Phone:</span>
                <span className="profile-card__text"><strong>{donor.phone}</strong></span>
              </div>
              <div className="profile-card__group">
                <span className="profile-card__label">Address:</span>
                <span className="profile-card__text"><strong>{donor.address}</strong></span>
              </div>
            </div>
            <div className="profile-card-ctr">
              <CustomButton type='button' text='Edit' onClick={handleEditClick} />
              <CustomButton type='button' text='Change Password' onClick={handleMessageClick} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const DonorProfile = () => {
  return (
    <DonorNav content={<DonorFunction />} />
  );
}

export default DonorProfile;
