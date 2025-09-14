import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Chat, Security, Speed, Group } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import ReviewCard from '../components/ReviewCard';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Chat sx={{ fontSize: 48, color: '#2563eb' }} />,
      title: 'Messagerie en Temps Réel',
      description: 'Messagerie instantanée avec la technologie Socket.io pour une communication fluide'
    },
    {
      icon: <Security sx={{ fontSize: 48, color: '#10b981' }} />,
      title: 'Sécurisé et Privé',
      description: 'Chiffrement de bout en bout et authentification JWT pour protéger vos conversations'
    },
    {
      icon: <Speed sx={{ fontSize: 48, color: '#f59e0b' }} />,
      title: 'Ultra Rapide',
      description: 'Performance optimisée avec des mises à jour en temps réel et une latence minimale'
    },
    {
      icon: <Group sx={{ fontSize: 48, color: '#2563eb' }} />,
      title: 'Collaboration d\'Équipe',
      description: 'Parfait pour les équipes, les amis et la communication professionnelle'
    },
    {
      icon: <Chat sx={{ fontSize: 48, color: '#10b981' }} />,
      title: 'Multi-Plateforme',
      description: 'Fonctionne parfaitement sur tous les appareils et plateformes'
    },
    {
      icon: <Security sx={{ fontSize: 48, color: '#f59e0b' }} />,
      title: 'Partage de Fichiers',
      description: 'Partagez des documents, images et fichiers en toute facilité et sécurité'
    }
  ];

  const reviews = [
    {
      name: 'Sarah Johnson',
      role: 'Chef de Produit',
      avatar: 'SJ',
      rating: 5,
      comment: 'ChatOne a révolutionné notre communication d\'équipe. Les fonctionnalités en temps réel sont incroyables !'
    },
    {
      name: 'Michael Chen',
      role: 'Développeur Logiciel',
      avatar: 'MC',
      rating: 5,
      comment: 'La meilleure application de chat que j\'aie utilisée. Interface claire et performance ultra-rapide.'
    },
    {
      name: 'Emma Williams',
      role: 'Directrice Marketing',
      avatar: 'EW',
      rating: 5,
      comment: 'Les fonctionnalités de sécurité nous donnent une tranquillité d\'esprit. Hautement recommandé pour un usage professionnel.'
    },
    {
      name: 'David Rodriguez',
      role: 'Chef d\'Équipe',
      avatar: 'DR',
      rating: 5,
      comment: 'Intégration parfaite avec notre flux de travail. Les fonctionnalités de collaboration sont exceptionnelles.'
    },
    {
      name: 'Lisa Park',
      role: 'Designer',
      avatar: 'LP',
      rating: 5,
      comment: 'Interface magnifique et design intuitif. Rend la communication agréable.'
    }
  ];

  return (
    <Box>
      <Navigation />
      
      <HeroSection 
        title="ChatOne"
        subtitle="L'avenir de la communication en temps réel. Connectez-vous, collaborez et communiquez en toute confiance."
        primaryButtonText="Essai Gratuit"
        secondaryButtonText="Commencer"
      />

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              color: '#1e293b'
            }}
          >
            Pourquoi Choisir ChatOne ?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: '#64748b',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Découvrez la nouvelle génération de messagerie avec nos fonctionnalités de pointe
          </Typography>
          
          <Carousel
            autoPlay={true}
            autoPlayInterval={3500}
            itemsPerView={{ xs: 1, sm: 2, md: 3 }}
            spacing={3}
            height="320px"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </Carousel>
        </Container>
      </Box>

      {/* Reviews Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              color: '#1e293b'
            }}
          >
            Ce Que Disent Nos Utilisateurs
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: '#64748b',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Rejoignez des milliers d'utilisateurs satisfaits qui font confiance à ChatOne pour leurs besoins de communication
          </Typography>
          
          <Carousel
            autoPlay={true}
            autoPlayInterval={4000}
            itemsPerView={{ xs: 1, sm: 2, md: 3 }}
            spacing={3}
            height="280px"
          >
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                name={review.name}
                role={review.role}
                avatar={review.avatar}
                rating={review.rating}
                comment={review.comment}
              />
            ))}
          </Carousel>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default HomePage;
