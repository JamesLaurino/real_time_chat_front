import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Card, CardContent, Alert } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Simulate form submission
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Box>
      <Navigation />

      {/* Hero Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              color: '#1e293b',
              mb: 2
            }}
          >
            Contactez-Nous
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#64748b',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Une question ? Une suggestion ? Notre équipe est là pour vous aider.
          </Typography>
        </Container>
      </Box>

      {/* Contact Form & Info */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Card sx={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 3 }}>
                    Envoyez-nous un message
                  </Typography>

                  {submitted && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Nom"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          error={!!errors.name}
                          helperText={errors.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Sujet"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          error={!!errors.subject}
                          helperText={errors.subject}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message}
                          variant="outlined"
                          multiline
                          rows={6}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          sx={{
                            bgcolor: '#2563eb',
                            '&:hover': { bgcolor: '#1d4ed8' },
                            py: 1.5,
                            fontSize: '1.1rem'
                          }}
                        >
                          Envoyer le Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={5}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 3 }}>
                  Informations de Contact
                </Typography>

                <Card sx={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', mb: 3 }}>
                  <CardContent sx={{ p: 3, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Email sx={{ color: '#2563eb', fontSize: '2rem' }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 0.5 }}>
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#64748b' }}>
                        contact@chatone.com
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                        support@chatone.com
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', mb: 3 }}>
                  <CardContent sx={{ p: 3, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Phone sx={{ color: '#2563eb', fontSize: '2rem' }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 0.5 }}>
                        Téléphone
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#64748b' }}>
                        +33 1 23 45 67 89
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                        Lundi - Vendredi: 9h - 18h
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                  <CardContent sx={{ p: 3, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <LocationOn sx={{ color: '#2563eb', fontSize: '2rem' }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 0.5 }}>
                        Adresse
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#64748b' }}>
                        123 Avenue des Champs-Élysées
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#64748b' }}>
                        75008 Paris, France
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Quick Links */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 3, textAlign: 'center' }}>
            Besoin d'aide rapidement ?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                    Centre d'Aide
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Consultez nos guides et tutoriels
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                    FAQ
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Réponses aux questions fréquentes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                    Chat en Direct
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Assistance instantanée 24/7
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                    Communauté
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Rejoignez notre forum d'entraide
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default ContactPage;
