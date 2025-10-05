import React from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardContent, Avatar } from '@mui/material';
import { Email, Phone, LocationOn, Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#1e293b', color: 'white', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#2563eb' }}>
              ChatOne
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mb: 3, lineHeight: 1.8 }}>
              L'avenir de la communication en temps réel. Connectez-vous en toute confiance avec la meilleure plateforme de messagerie.
            </Typography>

            {/* Social Media Icons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Avatar sx={{ bgcolor: '#2563eb', cursor: 'pointer', '&:hover': { bgcolor: '#1d4ed8' } }}>
                <Facebook />
              </Avatar>
              <Avatar sx={{ bgcolor: '#2563eb', cursor: 'pointer', '&:hover': { bgcolor: '#1d4ed8' } }}>
                <Twitter />
              </Avatar>
              <Avatar sx={{ bgcolor: '#2563eb', cursor: 'pointer', '&:hover': { bgcolor: '#1d4ed8' } }}>
                <LinkedIn />
              </Avatar>
              <Avatar sx={{ bgcolor: '#2563eb', cursor: 'pointer', '&:hover': { bgcolor: '#1d4ed8' } }}>
                <Instagram />
              </Avatar>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Liens Rapides
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Button
                color="inherit"
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  opacity: 0.8,
                  '&:hover': { opacity: 1, bgcolor: 'rgba(255,255,255,0.05)' }
                }}
                onClick={() => navigate('/about')}
              >
                À Propos
              </Button>
              <Button
                color="inherit"
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  opacity: 0.8,
                  '&:hover': { opacity: 1, bgcolor: 'rgba(255,255,255,0.05)' }
                }}
                onClick={() => navigate('/pricing')}
              >
                Tarification
              </Button>
              <Button
                color="inherit"
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  opacity: 0.8,
                  '&:hover': { opacity: 1, bgcolor: 'rgba(255,255,255,0.05)' }
                }}
                onClick={() => navigate('/contact')}
              >
                Contact
              </Button>
              <Button
                color="inherit"
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  opacity: 0.8,
                  '&:hover': { opacity: 1, bgcolor: 'rgba(255,255,255,0.05)' }
                }}
                onClick={() => navigate('/support')}
              >
                Support
              </Button>
            </Box>
          </Grid>

          {/* Contact Information - Visually Attractive */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Contactez-Nous
            </Typography>

            {/* Email Card */}
            <Card sx={{
              bgcolor: 'rgba(37, 99, 235, 0.1)',
              mb: 2,
              border: '1px solid rgba(37, 99, 235, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(37, 99, 235, 0.15)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
              }
            }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#2563eb', width: 40, height: 40 }}>
                    <Email fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                      Email
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                      contact@chatone.com
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Phone Card */}
            <Card sx={{
              bgcolor: 'rgba(16, 185, 129, 0.1)',
              mb: 2,
              border: '1px solid rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(16, 185, 129, 0.15)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
              }
            }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#10b981', width: 40, height: 40 }}>
                    <Phone fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                      Téléphone
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                      +33 1 23 45 67 89
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Address Card */}
            <Card sx={{
              bgcolor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(245, 158, 11, 0.15)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
              }
            }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#f59e0b', width: 40, height: 40 }}>
                    <LocationOn fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                      Adresse
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', lineHeight: 1.4 }}>
                      123 Avenue des Champs-Élysées
                      <br />
                      75008 Paris, France
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box sx={{
          textAlign: 'center',
          mt: 6,
          pt: 4,
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2024 ChatOne. Tous droits réservés.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.6,
                cursor: 'pointer',
                '&:hover': { opacity: 1, color: '#2563eb' }
              }}
            >
              Politique de Confidentialité
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.6,
                cursor: 'pointer',
                '&:hover': { opacity: 1, color: '#2563eb' }
              }}
            >
              Conditions d'Utilisation
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.6,
                cursor: 'pointer',
                '&:hover': { opacity: 1, color: '#2563eb' }
              }}
            >
              Cookies
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
