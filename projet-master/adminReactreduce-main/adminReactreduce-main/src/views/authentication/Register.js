import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, Button } from '@mui/material';
import axios from 'axios';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';

const Register2 = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mobile, setMobile] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [reussitMessage, setReussitMessage] = useState('');


  const handleNomChange = (e) => {
    setNom(e.target.value);
    setErrorMessage('');
  };

  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
    setErrorMessage('');
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    setErrorMessage('');
  };

  const handleAdresseChange = (e) => {
    setAdresse(e.target.value);
    setErrorMessage('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');
  };



  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/api/auth/register', {
        "firstname": nom,
        "lastname": prenom,
        "adresse": adresse,
        "tel": mobile,
        "role" :   "admin",
        "password": password,
        "email":email

      });

      if (response.status === 201 ||response.status === 200) {
        // L'inscription a réussi, rediriger ou effectuer d'autres actions
        console.log('Inscription réussie');
        setReussitMessage('Inscription réussie');
      } else {
        // L'inscription a échoué, afficher le message d'erreur
        setErrorMessage('Erreur lors de l\'inscription');
        console.error('Échec de l\'inscription');
      }
    } catch (error) {
      // Afficher le message d'erreur en cas d'erreur lors de la requête
      setErrorMessage('Erreur lors de l\'inscription');
      console.error('Erreur lors de l\'inscription', error);
    }
  };

  return (
    <PageContainer title="Register" description="This is Register page">
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
              <form onSubmit={handleRegister}>
                <Stack spacing={2} mt={3}>
                  <input type="text" className='form-control' placeholder="Nom" value={nom} onChange={handleNomChange} />
                  <input type="text" className='form-control' placeholder="Prénom" value={prenom} onChange={handlePrenomChange} />
                  <input type="number" className='form-control' placeholder="Mobile" value={mobile} onChange={handleMobileChange} />
                  <input type="text" className='form-control' placeholder="Adresse" value={adresse} onChange={handleAdresseChange} />
                  <input type="email" className='form-control' placeholder="Email" value={email} onChange={handleEmailChange} />
                  <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                  <Button type="submit" variant="contained" fullWidth>
                    Register
                  </Button>
                  {reussitMessage && (
                    <Typography color="blue" variant="body2" mt={2} textAlign="center">
                      {reussitMessage}
                    </Typography>
                  )}
                  {errorMessage && (
                    <Typography color="error" variant="body2" mt={2} textAlign="center">
                      {errorMessage}
                    </Typography>
                  )}
                </Stack>
              </form>
              <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  Already have an Account?
                </Typography>
                <Typography
                  component={Link}
                  to="/auth/login"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  Sign In
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Register2;
