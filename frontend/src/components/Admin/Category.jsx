import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import '../components.css';
import MuiCard from '@mui/joy/Card';
import MuiCardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
 import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import { ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarksIcon from '@mui/icons-material/Bookmarks';


const CategoryForm = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }} px={2} py= {4} className="vh-100 px-2 py-4 text-center mt-5">

            <Grid container spacing={5}>
            <Grid xs={12} md={6} lg={6}>
                <ButtonBase
                sx={{ width: '100%', height: '100%' }}
                onClick={() => navigate('/addcategory')} 
                >
                    <MuiCard 
                        variant="soft" 
                        p={2}
                        sx={{
                            height: '150px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Box sx={{ mb: 2 }}>
                            <BookmarkAddIcon fontSize="large" />
                        </Box>
                        <MuiCardContent>
                            <Typography level='h3'>Add Category</Typography>
                        </MuiCardContent>
                    </MuiCard>

                </ButtonBase>
            </Grid>
                <Grid xs={12} md={6} lg={6}>
                <ButtonBase
                    sx={{ width: '100%', height: '100%' }}
                    onClick={() => navigate('/listcategory')} 
                    >
                        <MuiCard 
                            variant="soft" 
                            p={2}
                            sx={{
                                height: '150px',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Box sx={{ mb: 2 }}>
                                <BookmarksIcon fontSize="large" />
                            </Box>
                            <MuiCardContent>
                                <Typography level='h3'>All Category</Typography>
                            </MuiCardContent>
                        </MuiCard>

                    </ButtonBase>
                </Grid>
            </Grid>
      </Box>
    );
};

const Category = () => {
    return (
        <AdminNav content={<CategoryForm />} />
    );
};

export default Category;
