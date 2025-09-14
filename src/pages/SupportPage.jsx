import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Alert, Snackbar } from '@mui/material';
import { ExpandMore, Email, Phone, LocationOn, Send } from '@mui/icons-material';
import Navigation from '../components/Navigation';

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
    
    // Clear error when user starts typing
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
    
    // Simulate form submission
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setShowSuccess(true);
  };

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
    },
    {
      question: 'Quelles options de support sont disponibles ?',
      answer: 'Nous offrons un support par email pour tous les utilisateurs, un support prioritaire pour les forfaits payants, et une documentation complète. Notre équipe de support répond généralement dans les 24 heures.'
    },
    {
      question: 'Comment annuler mon abonnement ?',
      answer: 'Vous pouvez annuler votre abonnement à tout moment depuis les paramètres de votre compte. Il n\'y a pas de frais d\'annulation, et vous continuerez à avoir accès jusqu\'à la fin de votre période de facturation.'
    }
  ];

  return (
    <Box>
      <Navigation />
      
      {/* Header */}
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
            Comment Pouvons-Nous Vous Aider ?
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
            Obtenez le support dont vous avez besoin. Nous sommes là pour vous aider à tirer le meilleur parti de ChatOne.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ p: 4, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 3 }}>
                Envoyez-nous un Message
              </Typography>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{
                        bgcolor: '#2563eb',
                        '&:hover': { bgcolor: '#1d4ed8' },
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem'
                      }}
                    >
                      Envoyer le Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ p: 4, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', height: 'fit-content' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 3 }}>
                Informations de Contact
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Email sx={{ color: '#2563eb', mr: 2 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    support@chatone.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Phone sx={{ color: '#10b981', mr: 2 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                    Téléphone
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    +33 1 23 45 67 89
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocationOn sx={{ color: '#f59e0b', mr: 2 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                    Adresse
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    123 Rue de la Tech<br />
                    75001 Paris, France
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ bgcolor: '#f8fafc', p: 3, borderRadius: 2, mt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                  Temps de Réponse
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  Nous répondons généralement à toutes les demandes dans les 24 heures. Les utilisateurs premium bénéficient d'un support prioritaire avec des temps de réponse plus rapides.
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
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
            Trouvez des réponses aux questions courantes sur ChatOne
          </Typography>

          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {faqItems.map((item, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  '&:before': { display: 'none' },
                  borderRadius: '8px !important',
                  overflow: 'hidden'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
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
                <AccordionDetails sx={{ bgcolor: 'white', pt: 0 }}>
                  <Typography variant="body1" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: '#1e293b',
              mb: 2
            }}
          >
            Vous Avez Encore des Questions ?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#64748b',
              mb: 4,
              maxWidth: '500px',
              mx: 'auto'
            }}
          >
            Notre équipe de support est là pour vous aider. N'hésitez pas à nous contacter !
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Email />}
            sx={{
              bgcolor: '#2563eb',
              '&:hover': { bgcolor: '#1d4ed8' },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem'
            }}
            href="mailto:support@chatone.com"
          >
            Support par Email
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
          sx={{ width: '100%' }}
        >
          Merci pour votre message ! Nous vous répondrons dans les 24 heures.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SupportPage;
