import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#1e293b', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              ChatOne
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mb: 2 }}>
              L'avenir de la communication en temps réel. Connectez-vous en toute confiance.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Produit
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                color="inherit"
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                onClick={() => navigate('/pricing')}
              >
                Tarification
              </Button>
              <Button
                color="inherit"
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                onClick={() => navigate('/support')}
              >
                Support
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Commencer
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                color="inherit"
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                onClick={() => navigate('/register')}
              >
                S'inscrire
              </Button>
              <Button
                color="inherit"
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                onClick={() => navigate('/login')}
              >
                Connexion
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            2024 ChatOne. Tous droits réservés.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
