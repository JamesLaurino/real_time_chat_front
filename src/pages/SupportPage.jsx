import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Alert, Snackbar, Chip, Avatar } from '@mui/material';
import { ExpandMore, Email, Phone, LocationOn, Send, LiveHelp, Description, VideoLibrary, Forum, Speed, Security, CloudDone, SupportAgent } from '@mui/icons-material';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setShowSuccess(true);
  };

  const helpCategories = [
    {
      icon: <LiveHelp sx={{ fontSize: '3rem', color: '#2563eb' }} />,
      title: 'Centre d\'Aide',
      description: 'Guides et tutoriels détaillés',
      link: '#'
    },
    {
      icon: <VideoLibrary sx={{ fontSize: '3rem', color: '#10b981' }} />,
      title: 'Tutoriels Vidéo',
      description: 'Apprenez visuellement',
      link: '#'
    },
    {
      icon: <Description sx={{ fontSize: '3rem', color: '#f59e0b' }} />,
      title: 'Documentation',
      description: 'Documentation technique complète',
      link: '#'
    },
    {
      icon: <Forum sx={{ fontSize: '3rem', color: '#8b5cf6' }} />,
      title: 'Forum Communautaire',
      description: 'Échangez avec la communauté',
      link: '#'
    }
  ];

  const faqItems = [
    {
      question: 'Comment commencer avec ChatOne ?',
      answer: 'Commencer est facile ! Inscrivez-vous simplement pour un compte gratuit, choisissez votre forfait, et vous pouvez commencer à chatter immédiatement. Notre processus d\'intégration vous guidera dans la configuration de votre profil et la connexion avec votre équipe.'
    },
    {
      question: 'Mes données sont-elles sécurisées avec ChatOne ?',
      answer: 'Absolument ! Nous utilisons un chiffrement de bout en bout pour tous les messages, une authentification JWT sécurisée, et suivons les meilleures pratiques de l\'industrie pour la protection des données. Vos conversations sont privées et sécurisées.'
    },
    {
      question: 'Puis-je utiliser ChatOne sur des appareils mobiles ?',
      answer: 'Oui ! ChatOne fonctionne parfaitement sur tous les appareils, y compris les smartphones, tablettes et ordinateurs de bureau. Nous avons également des applications mobiles dédiées qui arrivent bientôt.'
    },
    {
      question: 'Que se passe-t-il si je dépasse ma limite de messages ?',
      answer: 'ChatOne offre une messagerie illimitée sur tous les forfaits, donc vous n\'avez jamais à vous soucier des limites de messages. Chattez autant que vous le souhaitez sans restrictions.'
    },
    {
      question: 'Comment inviter des membres d\'équipe ?',
      answer: 'Vous pouvez inviter des membres d\'équipe en allant dans vos paramètres et en utilisant la fonctionnalité "Inviter des utilisateurs". Entrez simplement leurs adresses email et ils recevront une invitation à rejoindre votre espace de travail ChatOne.'
    },
    {
      question: 'Puis-je intégrer ChatOne avec d\'autres outils ?',
      answer: 'Nous travaillons sur des intégrations avec des outils de productivité populaires. Actuellement, ChatOne fonctionne très bien comme plateforme de communication autonome, avec un accès API disponible pour des intégrations personnalisées.'
    }
  ];

  return (
    <Box>
      <Navigation />

      {/* Hero Section with Gradient */}
      <Box sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: { xs: 8, md: 12 },
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <SupportAgent sx={{ fontSize: '5rem', mb: 2, opacity: 0.9 }} />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 'bold',
                mb: 2
              }}
            >
              Comment Pouvons-Nous Vous Aider ?
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                mb: 4,
                opacity: 0.95,
                fontWeight: 300
              }}
            >
              Notre équipe de support est disponible 24/7 pour répondre à toutes vos questions
            </Typography>
            <Chip
              label="Temps de réponse moyen : 2 heures"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                py: 2.5,
                px: 1
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Quick Help Categories */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#1e293b',
            mb: 6
          }}
        >
          Ressources d'Assistance Rapide
        </Typography>
        <Grid container spacing={4}>
          {helpCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
                    borderColor: '#2563eb'
                  }
                }}
              >
                <CardContent sx={{ py: 5 }}>
                  <Box sx={{ mb: 2 }}>{category.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form & Info Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} lg={7}>
              <Card sx={{
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                borderRadius: 3
              }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar sx={{ bgcolor: '#2563eb', mr: 2, width: 50, height: 50 }}>
                      <Send />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                        Envoyez-nous un Message
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                        Nous vous répondrons dans les plus brefs délais
                      </Typography>
                    </Box>
                  </Box>

                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Votre Nom"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          error={!!errors.name}
                          helperText={errors.name}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: '#2563eb',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Adresse Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: '#2563eb',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Sujet"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          error={!!errors.subject}
                          helperText={errors.subject}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: '#2563eb',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={8}
                          value={formData.message}
                          onChange={handleInputChange}
                          error={!!errors.message}
                          helperText={errors.message}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: '#2563eb',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          startIcon={<Send />}
                          sx={{
                            bgcolor: '#2563eb',
                            '&:hover': { bgcolor: '#1d4ed8' },
                            py: 2,
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.4)'
                          }}
                        >
                          Envoyer le Message
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Contact Information Cards */}
            <Grid item xs={12} lg={5}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Card sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  boxShadow: '0 10px 30px -10px rgba(102, 126, 234, 0.4)',
                  borderRadius: 3
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                      Informations de Contact
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                        <Email />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.85rem' }}>
                          Email
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          support@chatone.com
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                        <Phone />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.85rem' }}>
                          Téléphone
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          +33 1 23 45 67 89
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                        <LocationOn />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.85rem' }}>
                          Adresse
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          123 Rue de la Tech, Paris
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Service Stats */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent sx={{ py: 3 }}>
                        <Speed sx={{ fontSize: '2.5rem', color: '#2563eb', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 0.5 }}>
                          2h
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                          Temps de réponse moyen
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent sx={{ py: 3 }}>
                        <Security sx={{ fontSize: '2.5rem', color: '#10b981', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 0.5 }}>
                          24/7
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                          Support disponible
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent sx={{ py: 3 }}>
                        <CloudDone sx={{ fontSize: '2.5rem', color: '#f59e0b', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 0.5 }}>
                          99%
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                          Satisfaction client
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent sx={{ py: 3 }}>
                        <Forum sx={{ fontSize: '2.5rem', color: '#8b5cf6', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 0.5 }}>
                          15K+
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                          Tickets résolus
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#1e293b',
            mb: 2
          }}
        >
          Questions Fréquemment Posées
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: '#64748b',
            maxWidth: '600px',
            mx: 'auto',
            mb: 6
          }}
        >
          Trouvez rapidement des réponses aux questions les plus courantes
        </Typography>

        <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
          {faqItems.map((item, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
                '&:before': { display: 'none' },
                borderRadius: '12px !important',
                overflow: 'hidden',
                border: '1px solid #e2e8f0'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: '#2563eb' }} />}
                sx={{
                  bgcolor: 'white',
                  '&:hover': { bgcolor: '#f8fafc' },
                  '& .MuiAccordionSummary-content': {
                    my: 2
                  }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: '#f8fafc', pt: 0, pb: 3 }}>
                <Typography variant="body1" sx={{ color: '#64748b', lineHeight: 1.8 }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Vous Avez Encore des Questions ?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              maxWidth: '500px',
              mx: 'auto',
              opacity: 0.95,
              fontWeight: 300
            }}
          >
            Notre équipe de support dédiée est prête à vous aider. Contactez-nous maintenant !
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Email />}
            sx={{
              bgcolor: 'white',
              color: '#2563eb',
              '&:hover': { bgcolor: '#f8fafc' },
              px: 5,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.15)'
            }}
            href="mailto:support@chatone.com"
          >
            Contacter le Support
          </Button>
        </Container>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%', fontSize: '1rem' }}
        >
          Merci pour votre message ! Nous vous répondrons dans les 24 heures.
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
}

export default SupportPage;
