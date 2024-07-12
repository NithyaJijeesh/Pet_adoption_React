import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Box, MenuItem, Select, InputLabel, FormControl, TextField, Divider } from '@mui/material';
import AdminNav from './AdminNav';
import AxiosInstance from '../axios';
import '../components.css';
import CustomButton from '../Button/CustomButton';

const CategoryForm = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newBreed, setNewBreed] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await AxiosInstance.get('/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrorMessage('Error fetching categories. Please try again.');
            }
        };
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            const response = await AxiosInstance.post('/categories/', { name: newCategory });
            setCategories([...categories, response.data]);
            setNewCategory('');
        } catch (error) {
            console.error('Error adding category:', error);
            setErrorMessage('Error adding category. Please try again.');
        }
    };

    const handleAddBreed = async () => {
        try {
            const response = await AxiosInstance.post('/breeds/', { name: newBreed, category_id: selectedCategory });
            setNewBreed('');
            setSelectedCategory('');
        } catch (error) {
            console.error('Error adding breed:', error);
            setErrorMessage('Error adding breed. Please try again.');
        }
    };

    return (
        <Container className="vh-90 d-flex px-2 py-0 text-center list-order custom-scrollbar category-form mt-0" style={{ backgroundColor:'#F0F4F8', display: 'block', justifyContent: 'center' }}>
            <h2>Manage Category and Breed/Family</h2>
            <Box mt={2} px={4} py={1}>
                <Form>
                    {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
                    <Row className="my-0 mx-5">
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <h3>Add New Category</h3>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="New Category"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    variant="outlined"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                            </FormControl>
                            <Box my={3} sx={{ justifyContent: 'center', textAlign: 'center', marginLeft: '43%' }}>
                                <CustomButton type="button" text="Add Category" onClick={handleAddCategory} />
                            </Box>
                        </Col>
                    </Row>
                    <Divider />
                    <Row className="mb-4 mx-5">
                        <Col xs={12} sm={12} md={6} lg={6} p={3}>
                            <h3>Add New Breed/Family</h3>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="category-select-label">Select Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    label="Select Category"
                                    sx={{ textTransform: 'uppercase' }}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id} sx={{ textTransform: 'uppercase' }}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="New Breed"
                                    value={newBreed}
                                    onChange={(e) => setNewBreed(e.target.value)}
                                    variant="outlined"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                            </FormControl>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, gap: '0.5rem', mb: 2 }}>
                                <CustomButton type="button" text="Add Breed/Family" onClick={handleAddBreed} />
                                <CustomButton type="button" text="Cancel" onClick={() => console.log('Cancelled')} />
                            </Box>
                        </Col>
                    </Row>
                </Form>
            </Box>
        </Container>
    );
};

function CreateCategory() {
    return (
        <AdminNav content={<CategoryForm />} />
    );
}

export default CreateCategory;
