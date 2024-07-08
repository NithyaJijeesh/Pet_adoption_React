import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Card as MuiCard, CardHeader, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import AxiosInstance from '../axios'; // Adjust the path as necessary
import AdminNav from './AdminNav';

const CategoryForm = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newBreed, setNewBreed] = useState('');

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await AxiosInstance.get('/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Handle adding a new category
    const handleAddCategory = async () => {
        try {
            const response = await AxiosInstance.post('/categories/', { name: newCategory });
            setCategories([...categories, response.data]);
            setNewCategory('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    // Handle adding a new breed
    const handleAddBreed = async () => {
        try {
            const response = await AxiosInstance.post('/breeds/', { name: newBreed, category: selectedCategory });
            setNewBreed('');
            // Optional: update breeds state or refetch breeds
        } catch (error) {
            console.error('Error adding breed:', error);
        }
    };

    return (
        <Container className="vh-80 d-flex px-5 py-4 text-center list-order" style={{ display: 'flex', justifyContent: 'center' }}>
            <Box mt={4}>
                <MuiCard sx={{ minWidth: 900 }}>
                    <CardHeader title="Manage Category and Breed" className="mt-3" />
                    <Form>
                        <Row className="my-4 mx-5">
                            <Col xs={12} sm={12} md={6} lg={6}>
                                <Form.Control
                                    type="text"
                                    placeholder="New Category"
                                    name="categoryName"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    className='btnn mt-2'
                                    onClick={handleAddCategory}
                                >
                                    Add Category
                                </Button>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="category-select-label">Select Category</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        label="Select Category"
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>
                        <Row className="mb-4 mx-5">
                            <Col xs={12} sm={12} md={6} lg={6}>
                                <Form.Control
                                    type="text"
                                    placeholder="New Breed/Family"
                                    name="breedName"
                                    value={newBreed}
                                    onChange={(e) => setNewBreed(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    className='btnn mt-2'
                                    onClick={handleAddBreed}
                                >
                                    Add Breed/Family
                                </Button>
                            </Col>
                        </Row>
                        <Button
                            type="button"
                            className='btnn mb-4 mx-3'
                            onClick={() => console.log('Cancelled')}
                        >
                            CANCEL
                        </Button>
                    </Form>
                </MuiCard>
            </Box>
        </Container>
    );
};

const Category = () => {
    return (
        <AdminNav content={<CategoryForm />} />
    );
};

export default Category;
