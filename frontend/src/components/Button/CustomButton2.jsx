import React from 'react';
import Button from '@mui/material/Button';
import '../components.css';

const CustomButton2 = ({ text, onClick, sx, icon }) => {
  return (
    <Button 
      variant="contained" 
    //   className='buttons' 
      sx={{ 
        display: { xs: 'none', md: 'flex' },
        width: '200px',
        fontWeight: 700,
        borderRadius: '25px',
        borderColor: '#1b2b5d', 
        backgroundColor: 'seashell',
        color: '#1b2b5d', 
        '&:hover': {
          borderColor: 'seashell', 
          backgroundColor: '#1b2b5d', 
          color: 'seashell',
        },
        ...sx
      }}
      onClick={onClick}
      startIcon={icon}
    >
      {text}
    </Button>
  );
};

export default CustomButton2;
