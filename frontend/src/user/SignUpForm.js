
import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Typography, TextField, Button } from '@mui/material';

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`https://ecommerce-restaurant-app-n4n7.vercel.app/api/auth/signup`, {
                username,
                email,
                password,
            });
            if (response.data.message === 'User registered successfully') {
                toast.success('Signed up successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);

            }
            console.log(response.data);
        } catch (error) {
            setEmail('');
            toast.error('Email id already registered', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            console.error(error);
        }
    };

    return (
        <Box onSubmit={handleSignUp}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 17,
            }}
        >
            <LockOutlinedIcon sx={{ mb: 0 }} />
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form"
                sx={{
                    mt: 0,
                    padding: '15px',
                    borderRadius: '10px',
                    width: {
                        xs: '100%',
                        sm: '30%',
                    },
                }}>
                <TextField
                    margin="dense"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    required
                    fullWidth
                    label="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    color="primary"
                    type='submit'
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                >
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
}
export default SignUpForm;
