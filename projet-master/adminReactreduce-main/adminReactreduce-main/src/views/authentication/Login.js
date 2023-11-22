import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, Button } from '@mui/material';
import axios from 'axios';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';

const Login2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/api/auth/login', {
        "email":email,
        "password": password,
      });

      if (response.status === 200) {
        // L'authentification a réussi, rediriger ou effectuer d'autres actions
        console.log('Authentification réussie');
        window.location.replace('/dashboard');
      } else {
        // L'authentification a échoué, afficher le message d'erreur
        setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect');
        console.error('Échec de l\'authentification');
      }
    } catch (error) {
      // Afficher le message d'erreur en cas d'erreur lors de la requête
      setErrorMessage('Erreur lors de l\'authentification');
      console.error('Erreur lors de l\'authentification', error);
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <form onSubmit={handleLogin}>
                <Stack spacing={2} mt={3}>
                  <input
                    type="text" className='form-control'
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <input
                    type="password" className='form-control'
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <Button type="submit" variant="contained" fullWidth>
                    Connexion
                  </Button>
                  {errorMessage && (
                    <Typography color="error" variant="body2" mt={2} textAlign="center">
                      {errorMessage}
                    </Typography>
                  )}
                </Stack>
              </form>
              <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  Bienvenu
                </Typography>
                <Typography
                  component={Link}
                  to="/auth/register"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  Créer un compte
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
