import React, { useState } from 'react';
import { Dialog, Box, IconButton, InputAdornment, Alert } from '@mui/material';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import AxiosInstance from '../axios';
import CustomButton from '../Button/CustomButton';

const PasswordChangeModal = ({ open, handleClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [typeCurrent, setTypeCurrent] = useState('password');
  const [iconCurrent, setIconCurrent] = useState(eyeOff);
  const [typeNew, setTypeNew] = useState('password');
  const [iconNew, setIconNew] = useState(eyeOff);
  const [typeConfirm, setTypeConfirm] = useState('password');
  const [iconConfirm, setIconConfirm] = useState(eyeOff);

  const handleToggleCurrent = () => {
    setTypeCurrent(typeCurrent === 'password' ? 'text' : 'password');
    setIconCurrent(iconCurrent === eyeOff ? eye : eyeOff);
  };

  const handleToggleNew = () => {
    setTypeNew(typeNew === 'password' ? 'text' : 'password');
    setIconNew(iconNew === eyeOff ? eye : eyeOff);
  };

  const handleToggleConfirm = () => {
    setTypeConfirm(typeConfirm === 'password' ? 'text' : 'password');
    setIconConfirm(iconConfirm === eyeOff ? eye : eyeOff);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    AxiosInstance.put('change-password/', {
      current_password: currentPassword,
      new_password: newPassword,
    })
      .then(response => {
        handleClose();
      })
      .catch(error => {
        console.error(error);
        setPasswordError('An error occurred while changing the password');
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <section id="auth1">
        <form id="password-change" onSubmit={(e) => { e.preventDefault(); handlePasswordChange(); }}>
          <h2>Change Password</h2>
          <label>Current Password</label>
          <div className="password-input-container">
            <input
              type={typeCurrent}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <span onClick={handleToggleCurrent}>
              <Icon icon={iconCurrent} size={25} />
            </span>
          </div>
          <label>New Password</label>
          <div className="password-input-container">
            <input
              type={typeNew}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span onClick={handleToggleNew}>
              <Icon icon={iconNew} size={25} />
            </span>
          </div>
          <label>Confirm Password</label>
          <div className="password-input-container">
            <input
              type={typeConfirm}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span onClick={handleToggleConfirm}>
              <Icon icon={iconConfirm} size={25} />
            </span>
          </div>
          {passwordError && (
            <Box mt={2}>
              <Alert severity="error">{passwordError}</Alert>
            </Box>
          )}
          <Box my={2} sx={{ justifyContent: 'center', textAlign: 'center' }}>
            <CustomButton type="submit" text="Change Password" />
            <CustomButton type="button" text="Cancel" onClick={handleClose} />
          </Box>
        </form>
      </section>
    </Dialog>
  );
};

export default PasswordChangeModal;
