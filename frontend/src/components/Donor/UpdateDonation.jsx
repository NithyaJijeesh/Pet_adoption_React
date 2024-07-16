import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DonorNav from './DonorNav';
import CustomButton from '../Button/CustomButton';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Box, Select, InputLabel, FormControl, TextField, MenuItem, Button, styled } from '@mui/material';
import AxiosInstance from '../axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DonationUpdate() {
    const { id } = useParams(); // Get the donation ID from the URL
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [petName, setPetName] = useState('');
    const [category, setCategory] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [breeds, setBreeds] = useState([]);

    const CustomOutlinedButton = styled(Button)(({ theme }) => ({
        borderColor: '#1b2b5d',
        color: '#1b2b5d',
        '&:hover': {
          borderColor: '#1b2b5d',
          backgroundColor: 'rgba(27, 43, 93, 0.04)',
        },
    }));

    // Fetch categories
    useEffect(() => {
        AxiosInstance.get('categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setErrorMessage('Error fetching categories');
            });
    }, []);

    // Fetch breeds when category changes
    useEffect(() => {
        if (category) {
            AxiosInstance.get(`donationbreed/?category_id=${category}`)
                .then(response => {
                    setBreeds(response.data);
                })
                .catch(error => {
                    console.error('Error fetching breeds:', error);
                    setErrorMessage('Error fetching breeds');
                });
        }
    }, [category]);

    // Fetch donation details when ID changes
    useEffect(() => {
        if (id) {
            AxiosInstance.get(`donationdetails/${id}/`)
                .then(response => {
                    const donation = response.data;
                    setPetName(donation.name);
                    setCategory(donation.category.id);
                    setBreed(donation.breed.id);
                    setDescription(donation.description);
                    // Handle mainImage and additionalImages if needed
                })
                .catch(error => {
                    console.error('Error fetching donation:', error);
                    setErrorMessage('Error fetching donation');
                });
        }
    }, [id]);

    // Handle main image file change
    function handleMainImageChange(e) {
        const file = e.target.files[0];
        setMainImage(file ? file : null);
    }

    // Handle additional images file change
    function handleAdditionalImagesChange(e) {
        const files = Array.from(e.target.files);
        setAdditionalImages(files);
    }

    // Handle donation update
    function handleDonation() {
        const formData = new FormData();
        formData.append('name', petName || '');
        formData.append('category_id', category || '');
        formData.append('breed_id', breed || '');
        formData.append('description', description || '');
        formData.append('status', 'pending');
        formData.append('purchase_status', 'not_purchased');

        if (mainImage) {
            formData.append('main_image', mainImage);
        }
        additionalImages.forEach((image) => {
            formData.append('additional_images', image); // Note: ensure your backend expects 'additional_images'
        });

        AxiosInstance.put(`donationdetails/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            toast.success("Donation updated successfully.");
            navigate('/donationlist'); // Redirect to the donation list or other appropriate page
        })
        .catch(error => {
            console.error('Error during donation update:', error);
            setErrorMessage('Error during donation update');
            toast.error('Error during donation update.');
        });
    }

    return (
        <>
        <ToastContainer />
        <Container className="vh-90 d-flex px-2 py-0 text-center list-order custom-scrollbar category-form mt-0" style={{ backgroundColor: '#F0F4F8', display: 'block', justifyContent: 'center' }}>
            <h2>Update Pet Details</h2>
            <Box mt={2} px={4} py={1}>
                <Form>
                    {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
                    <Row className="my-0 mx-5">
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Pet Name"
                                    value={petName}
                                    onChange={(e) => setPetName(e.target.value)}
                                    variant="outlined"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="category-select-label">Select Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
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
                                <InputLabel id="breed-select-label">Select Breed</InputLabel>
                                <Select
                                    labelId="breed-select-label"
                                    value={breed}
                                    onChange={(e) => setBreed(e.target.value)}
                                    label="Select Breed"
                                    sx={{ textTransform: 'capitalize' }}
                                >
                                    <MenuItem value={''} sx={{ textTransform: 'capitalize' }}>None</MenuItem>
                                    {breeds.map((breed) => (
                                        <MenuItem key={breed.id} value={breed.id} sx={{ textTransform: 'capitalize' }}>
                                            {breed.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <CustomOutlinedButton variant="outlined" component="label">
                                    Upload Main Image
                                    <input type="file" onChange={handleMainImageChange} hidden />
                                </CustomOutlinedButton>
                                {mainImage && <p>{mainImage.name}</p>}
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <CustomOutlinedButton variant="outlined" component="label">
                                    Upload Additional Images
                                    <input type="file" onChange={handleAdditionalImagesChange} multiple hidden />
                                </CustomOutlinedButton>
                                {additionalImages.length > 0 && (
                                    <ul>
                                        {additionalImages.map((image, index) => (
                                            <li key={index}>{image.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </FormControl>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    mt: 2,
                                    gap: '0.5rem',
                                    mb: 2
                                }}
                            >
                                <CustomButton type="button" text="UPDATE" onClick={handleDonation} />
                                <CustomButton type="button" text="CANCEL" onClick={() => navigate('/donationlist')} />
                            </Box>
                        </Col>
                    </Row>
                </Form>
            </Box>
        </Container>
        </>
    );
}
function UpdateDonation() {
  return (
    <DonorNav content={<DonationUpdate />} />
  );
}

export default UpdateDonation;
