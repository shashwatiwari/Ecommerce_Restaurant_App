import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, IconButton } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import axios from 'axios';
import { toast } from 'react-toastify';

function ContactUsForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitMessage, setSubmitMessage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/api/contact-us/submit`, formData);

            if (response.status === 201) {
                toast.success('Message submitted successfully', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setSubmitMessage('true');
                setTimeout(() => {
                    setSubmitMessage(false);
                }, 3000);
                formData.name = '';
                formData.email = '';
                formData.message = '';
                console.log('Message submitted successfully');
            }
        } catch (error) {
            toast.error('Error submitting message', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            console.error('Error submitting message', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 18 }}>
            <Typography component="h1" variant="h5" gutterBottom>
                Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="name"
                            label="Name"
                            fullWidth
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="email"
                            label="Email"
                            fullWidth
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <IconButton>
                                        <MailOutlineIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="message"
                            label="Message"
                            fullWidth
                            multiline
                            rows={4}
                            required
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ marginTop: '16px' }}
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
}

export default ContactUsForm;
