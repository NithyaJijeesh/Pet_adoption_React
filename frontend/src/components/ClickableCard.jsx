import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

function ClickableCard({ title, image, alt }) {
  const handleClick = () => {
     console.log('Card clicked!');
  };

  return (
    <Card
      sx={{
        width: 200,
        height: 120,
        backgroundColor: 'seashell',
        color: '#1b2b5d',
        cursor: 'pointer',
        padding: '1rem',
        borderRadius: '25px',
        transition: 'transform 0.3s, backgroundColor 0.3s, color 0.3s, border 0.3s',
        '&:hover': {
          backgroundColor: '#fff5eecf' ,
          color: '#1b2b5d',
          border: '4px solid #1b2b5d',
          transform: 'translateX(5px)', 
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className='categoryCard'
      onClick={handleClick}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ 
                width: 50, 
                height: 50,
                color: '#1b2b5d',
            }}
        image={image}
        alt={alt}
      />
    </Card>
  );
}

export default ClickableCard;
