import AdminNav from './AdminNav';
import React, { useCallback, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Container } from 'react-bootstrap';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AxiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

const CategoryForm = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [categories, setCategories] = useState([]);  
    const [breeds, setBreeds] = useState([]);          
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, breedsResponse] = await Promise.all([
                    AxiosInstance.get('categories/'),
                    AxiosInstance.get('breeds/')
                ]);
                setCategories(categoriesResponse.data);
                setBreeds(breedsResponse.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    const handleMenuOpen = (event, item) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedItem(null);
    };

    const handleEdit = () => {
        if (selectedItem) {
            navigate(`/updatecategory/${selectedItem.id}`);
            handleClose();
        }
    };

    // const handleEdit = useCallback(() => {
        // if (selectedItem) {
            // navigate(`/editcategory/${selectedItem.id}`);
            // handleClose();
        // }
    // }, [selectedItem, navigate, handleClose]);

    const handleDelete = () => {
        if (selectedItem) {
            AxiosInstance.delete(`categories/${selectedItem.id}/`)
                .then(() => {
                    // Refresh both categories and breeds after deletion
                    return Promise.all([
                        AxiosInstance.get('categories/'),
                        AxiosInstance.get('breeds/')
                    ]);
                })
                .then(([categoriesResponse, breedsResponse]) => {
                    setCategories(categoriesResponse.data);
                    setBreeds(breedsResponse.data);
                })
                .catch(error => console.error('Failed to delete category:', error));
            handleClose();
        }
    };

    return (
        <Container className="vh-90 align-items-center justify-content-center px-2 py-0 text-center custom-scrollbar category-form mt-0">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '20px', mb: 2, px: 5 }}>
                <h2>Categories</h2>
            </Box>

            <TableContainer component={Paper} mt={5} px={4} py={1}>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1b2b5d' }}>
                            <TableCell sx={{ color: 'seashell', fontWeight: 'bold' }}>#</TableCell>
                            <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>CATEGORY NAME</TableCell>
                            <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <TableRow
                                    key={category.id}
                                    sx={{
                                        '&:nth-of-type(odd)': { backgroundColor: '#F0F4F8' },
                                        '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    <TableCell component="th" scope="row" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                                        {category.name}
                                    </TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                        <IconButton
                                            aria-label="more"
                                            aria-controls="account-menu"
                                            aria-haspopup="true"
                                            onClick={(event) => handleMenuOpen(event, category)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.2))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 35,
                                                        height: 35,
                                                        ml: -0.5,
                                                        mr: 0.5,
                                                    },
                                                    '&::before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem onClick={handleEdit}>
                                                <ListItemIcon sx={{ color: '#1b2b5d' }}>
                                                    <EditNoteIcon fontSize="medium" />
                                                </ListItemIcon>
                                                EDIT
                                            </MenuItem>
                                            <MenuItem onClick={handleDelete}>
                                                <ListItemIcon sx={{ color: '#1b2b5d' }}>
                                                    <DeleteForeverIcon fontSize="medium" />
                                                </ListItemIcon>
                                                DELETE
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No categories available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box mt={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '20px', mb: 2, px: 5 }}>
                <h2>Breeds</h2>
            </Box>

            <TableContainer component={Paper} mt={5} px={4} py={1}>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1b2b5d' }}>
                            <TableCell sx={{ color: 'seashell', fontWeight: 'bold' }}>#</TableCell>
                            <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>CATEGORY NAME</TableCell>
                            <TableCell align="center" sx={{ color: 'seashell', fontWeight: 'bold' }}>BREED</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {breeds.length > 0 ? (
                            breeds.map((breed, index) => (
                                <TableRow
                                    key={breed.id}
                                    sx={{
                                        '&:nth-of-type(odd)': { backgroundColor: '#F0F4F8' },
                                        '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    <TableCell component="th" scope="row" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center" style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                                        {breed.category ? breed.category.name : 'N/A'}
                                    </TableCell>
                                    <TableCell align="center" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                                        {breed.name}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No breeds available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

function CategoryList() {
    return (
        <AdminNav content={<CategoryForm />} />
    );
}

export default CategoryList;
