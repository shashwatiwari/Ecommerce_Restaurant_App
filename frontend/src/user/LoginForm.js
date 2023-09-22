
import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Link, Typography, Box, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/api/auth/signin`, {
                email,
                password
            });

            const { token } = response.data;

            localStorage.setItem('token', token);

            if (response.data.message === 'Login successful') {
                toast.success('User logged in! ', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
            }
            console.log(response.data);
        } catch (error) {
            setEmail('');
            setPassword('');
            setError('Invalid credentials. Please try again.');
            setTimeout(() => {
                setError('');
            }, 3000);
            console.error(error);
        }
    };


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 17,
            }}
        >
            <LockOutlinedIcon sx={{ mb: 0 }} />
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form"
                sx={{
                    mt: 0,
                    padding: '10px',
                    borderRadius: '10px',
                    width: {
                        xs: '100%',
                        sm: '30%',
                        // md: '60%'
                    },
                }}>
                <TextField
                    margin="dense"
                    required
                    fullWidth
                    label="Email"
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

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rememberMe}
                            onChange={() => setRememberMe((prev) => !prev)}
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
                <Grid container justifyContent="flex-end" sx={{ textAlign: 'center', display: 'block' }}>
                    <Grid item>
                        <Link href="#" variant="body2">
                            Forgot Password?
                        </Link>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" sx={{ textAlign: 'center', display: 'block', mb: '1' }}>
                    <Grid item>
                        {/* <Link to="" onClick={scrollToTop}>Home</Link> */}
                        <Link to="/signup" href="/signup" variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default LoginForm;
