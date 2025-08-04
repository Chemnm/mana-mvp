import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { login } from '../api/authService';
import logo from '../assets/mana-logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setError('');
      const user = await login(email, password);
      if (user) {
        setUser(user);
        if (user.role === 'Retail') {
          navigate('/retail');
        } else {
          navigate(`/${user.role.toLowerCase()}`);
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        p: 3,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <img src={logo} alt="MANA Logo" style={{ height: '40px', marginRight: '12px' }} />
            <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
              MANA Dashboard
            </Typography>
          </Box>
          <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
            Please sign in to continue
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
