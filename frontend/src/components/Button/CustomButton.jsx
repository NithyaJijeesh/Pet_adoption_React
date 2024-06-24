import React from 'react';
import Button from '@mui/material/Button';
import '../components.css';

const CustomButton = ({ text,  onClick, sx }) => {
  return (
    <Button 
      variant="contained" 
      // className='buttons' 
      sx={{ 
        display: { xs: 'none', md: 'flex' },
        width: '200px',
        fontWeight: 700,
        borderRadius: '25px',
        backgroundColor: '#1b2b5d', 
        color: 'seashell',
        '&:hover': {
          // borderColor: '#1b2b5d', 
          backgroundColor: 'seashell', 
          color: '#1b2b5d',
        },
        ...sx
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
