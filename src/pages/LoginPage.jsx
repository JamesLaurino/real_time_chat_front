import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { login as loginService } from '../services/authService';
import { Container, Box, TextField, Button, Typography, Grid, Link, Alert, CircularProgress, Snackbar } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    // Redirect if user is successfully fetched
    if (user) {
      if (successOpen) {
        const timeoutId = setTimeout(() => navigate('/chat'), 1200);
        return () => clearTimeout(timeoutId);
      }
      navigate('/chat');
    }
  }, [user, navigate, successOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await loginService({ email, password })
      //test token 
      console.log("Token: ", token);
      login(token);
      setSuccessOpen(true);
      // Navigation is now handled by the useEffect hook
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={successOpen}
        autoHideDuration={1200}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
          Login successful
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
