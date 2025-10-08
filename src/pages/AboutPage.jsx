import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function AboutPage() {
  const teamMembers = [
    {
      name: 'Sophie Martin',
      role: 'CEO & Fondatrice',
      avatar: 'https://i.pravatar.cc/300?img=1',
      bio: 'Experte en communication digitale avec 15 ans d\'expérience dans le développement de solutions de messagerie.'
    },
    {
      name: 'Alexandre Dubois',
      role: 'CTO',
      avatar: 'https://i.pravatar.cc/300?img=12',
      bio: 'Architecte logiciel passionné par les technologies temps réel et la sécurité des communications.'
    },
    {
      name: 'Marie Laurent',
      role: 'Lead Designer',
      avatar: 'https://i.pravatar.cc/300?img=5',
      bio: 'Designer UX/UI primée, spécialisée dans la création d\'expériences utilisateur intuitives et élégantes.'
    },
    {
      name: 'Thomas Bernard',
      role: 'Responsable Sécurité',
      avatar: 'https://i.pravatar.cc/300?img=13',
      bio: 'Expert en cybersécurité, garantissant la protection et la confidentialité de vos conversations.'
    }
  ];

  return (
    <Box>
      <Navigation />

      {/* Hero Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              color: '#1e293b',
              mb: 3
            }}
          >
            À Propos de ChatOne
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#64748b',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8
            }}
          >
            ChatOne est né d'une vision simple : créer une plateforme de messagerie qui combine simplicité,
            sécurité et performance. Nous croyons que la communication doit être accessible, privée et sans compromis.
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2563eb', mb: 2 }}>
                    Notre Mission
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b', lineHeight: 1.8 }}>
                    Offrir une expérience de messagerie instantanée de qualité supérieure,
                    accessible à tous, avec un engagement ferme envers la protection de la vie privée.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2563eb', mb: 2 }}>
                    Nos Valeurs
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b', lineHeight: 1.8 }}>
                    Transparence, innovation et respect de nos utilisateurs.
                    Nous construisons des outils qui respectent votre vie privée et vos données.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2563eb', mb: 2 }}>
                    Notre Vision
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b', lineHeight: 1.8 }}>
                    Devenir la référence mondiale en matière de messagerie sécurisée,
                    tout en restant simple et accessible pour tous les utilisateurs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#1e293b',
              mb: 2
            }}
          >
            Notre Équipe
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#64748b',
              mb: 6,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Des experts passionnés qui travaillent chaque jour pour améliorer votre expérience de communication.
          </Typography>

          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{
                  height: '100%',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 2,
                        border: '4px solid #2563eb'
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 0.5 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#2563eb', fontWeight: 'bold', mb: 2 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ textAlign: 'center' }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#2563eb', mb: 1 }}>
                100K+
              </Typography>
              <Typography variant="h6" sx={{ color: '#64748b' }}>
                Utilisateurs Actifs
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#2563eb', mb: 1 }}>
                10M+
              </Typography>
              <Typography variant="h6" sx={{ color: '#64748b' }}>
                Messages Échangés
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#2563eb', mb: 1 }}>
                99.9%
              </Typography>
              <Typography variant="h6" sx={{ color: '#64748b' }}>
                Temps de Disponibilité
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default AboutPage;
