import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import AxiosInstance from '../axios';
import defaultProfileImage from '../../assets/default_pet_image.jpeg';
import CustomButton from '../Button/CustomButton';
import { Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function AdminFunction({ profileImage, setProfileImage }) {
  const [isEditing, setIsEditing] = useState(false);
  const [donor, setDonor] = useState({});
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
    AxiosInstance.get('admindashboard/')
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
  }, [setProfileImage]);

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

    AxiosInstance.put('admindashboard/', formData, {
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
            <div className="profile-card__name">Admin</div>
            <div className="profile-card__details">
              <div className="profile-card__group">
                <span className="profile-card__label">Username: </span>
                <span className="profile-card__text">{donor.username}</span>
              </div>
              <div className="profile-card__group">
                <span className="profile-card__label">Email: </span>
                <span className="profile-card__text"><strong>{donor.email}</strong></span>
              </div>
              
            </div>
            <div className="profile-card-ctr">
              <CustomButton type='button' text='Edit' onClick={handleEditClick} />
              <CustomButton type='button' text='Change Password'  />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const AdminProfile = () => {
  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  return (
    <AdminNav profileImage={profileImage} content={<AdminFunction profileImage={profileImage} setProfileImage={setProfileImage} />} />
  );
}

export default AdminProfile;
