import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, } from 'react-bootstrap';
import {  Box, FormControl, TextField,  } from '@mui/material';
import AdminNav from './AdminNav';
import AxiosInstance from '../axios';
import '../components.css';
import CustomButton from '../Button/CustomButton';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await AxiosInstance.get(`categories/${id}/`);
                setCategory(response.data);
                setName(response.data.name);
            } catch (error) {
                console.error('Failed to fetch category:', error);
            }
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AxiosInstance.put(`categories/${id}/`, { name });
            navigate('/listcategory'); 
        } catch (error) {
            console.error('Failed to update category:', error);
        }
    };

    if (!category) return <p>Loading...</p>;

    return (
        <Container className="vh-90 d-flex px-2 py-0 text-center list-order custom-scrollbar category-form mt-0" style={{ backgroundColor:'#F0F4F8', display: 'block', justifyContent: 'center' }}>
            <h2>Manage Category</h2>
            <Box mt={2} px={4} py={1}>
                    <Form onSubmit={handleSubmit}>
                        {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
                        <Row className="my-0 mx-5">
                            <Col xs={12} sm={12} md={6} lg={6}>
                                {/* <h3>Update Category</h3> */}
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="New Category"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        variant="outlined"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </FormControl>

                                <Box my={3} sx={{ justifyContent: 'center', textAlign: 'center', marginLeft: '43%' }}>
                                    <CustomButton type="submit" text="Save Change" onClick={handleSubmit}/>
                                </Box>
                            </Col>

                        </Row>
                        
                    </Form>
            </Box>
        </Container>
    );
};



function UpdateCategory() {
  return (
    <AdminNav content={<CategoryForm />} />
  )
}

export default UpdateCategory