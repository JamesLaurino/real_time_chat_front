import React, { useState } from 'react';
import { Box, Container, Typography, Switch, FormControlLabel, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PricingCard from '../components/PricingCard';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';

function PricingPage() {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const freeFeatures = [
    'Chat 1-à-1 illimité',
    'Messagerie en temps réel',
    'Chiffrement de bout en bout',
    'Historique des messages (30 jours)',
    'Support communautaire'
  ];

  const premiumFeatures = [
    'Tout du plan Gratuit',
    'Chat de groupe illimité',
    'Gestion avancée des groupes',
    'Historique illimité des messages',
    'Partage de fichiers (100 MB)',
    'Support prioritaire 24/7',
    'Thèmes personnalisés',
    'Sans publicité'
  ];

  const monthlyPrice = 9.99;
  const annualPrice = 99;
  const monthlySavings = ((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12) * 100).toFixed(0);

  const handleSubscribe = (plan, price, period) => {
    navigate('/register', {
      state: {
        selectedPlan: plan,
        price: price,
        period: period
      }
    });
  };

  const pricingPlans = [
    {
      title: 'Gratuit',
      price: 0,
      period: 'mois',
      features: freeFeatures,
      isPopular: false,
      buttonText: 'Commencer Gratuitement',
      onSubscribe: () => handleSubscribe('Gratuit', 0, 'gratuit')
    },
    {
      title: isAnnual ? 'Premium Annuel' : 'Premium Mensuel',
      price: isAnnual ? annualPrice : monthlyPrice,
      period: isAnnual ? 'an' : 'mois',
      originalPrice: isAnnual ? monthlyPrice * 12 : null,
      features: premiumFeatures,
      isPopular: true,
      buttonText: isAnnual ? 'Souscrire Annuellement' : 'Souscrire Mensuellement',
      onSubscribe: () => handleSubscribe(isAnnual ? 'Premium Annuel' : 'Premium Mensuel', isAnnual ? annualPrice : monthlyPrice, isAnnual ? 'an' : 'mois')
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
            Tarification Simple et Transparente
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#64748b',
              maxWidth: '600px',
              mx: 'auto',
              mb: 4
            }}
          >
            Choisissez le forfait qui vous convient le mieux. Tous les forfaits incluent les mêmes fonctionnalités puissantes.
          </Typography>
          
          {/* Billing Toggle */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ color: isAnnual ? '#64748b' : '#1e293b', fontWeight: isAnnual ? 'normal' : 'bold' }}>
              Mensuel
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={isAnnual}
                  onChange={(e) => setIsAnnual(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#10b981',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#10b981',
                    },
                  }}
                />
              }
              label=""
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" sx={{ color: isAnnual ? '#1e293b' : '#64748b', fontWeight: isAnnual ? 'bold' : 'normal' }}>
                Annuel
              </Typography>
              <Chip
                label={`Économisez ${monthlySavings}%`}
                size="small"
                sx={{
                  bgcolor: '#10b981',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Pricing Cards Carousel */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Carousel
            autoPlay={false}
            showDots={true}
            showArrows={true}
            itemsPerView={{ xs: 1, sm: 1, md: 2 }}
            spacing={4}
            height="600px"
          >
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                price={plan.price}
                period={plan.period}
                originalPrice={plan.originalPrice}
                features={plan.features}
                isPopular={plan.isPopular}
                buttonText={plan.buttonText}
                onSubscribe={plan.onSubscribe}
              />
            ))}
          </Carousel>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#1e293b',
              mb: 6
            }}
          >
            Questions Fréquemment Posées
          </Typography>
          
          <Carousel
            autoPlay={true}
            autoPlayInterval={5000}
            itemsPerView={{ xs: 1, sm: 1, md: 2 }}
            spacing={3}
            height="200px"
          >
            <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 2 }}>
                Puis-je changer de forfait à tout moment ?
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Oui, vous pouvez upgrader ou downgrader votre forfait à tout moment. Les changements prennent effet immédiatement.
              </Typography>
            </Box>
            
            <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 2 }}>
                Y a-t-il un essai gratuit ?
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Oui ! Nous offrons un essai gratuit de 14 jours avec un accès complet à toutes les fonctionnalités.
              </Typography>
            </Box>
            
            <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 2 }}>
                Quels moyens de paiement acceptez-vous ?
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Nous acceptons toutes les cartes de crédit principales, PayPal et les virements bancaires pour les forfaits annuels.
              </Typography>
            </Box>
            
            <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 2 }}>
                Puis-je annuler à tout moment ?
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Absolument. Annulez à tout moment sans questions posées. Aucuns frais cachés ou pénalités.
              </Typography>
            </Box>
          </Carousel>
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
            Prêt à Commencer ?
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
            Rejoignez des milliers d'utilisateurs qui font confiance à ChatOne pour leurs besoins de communication.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                bgcolor: '#2563eb',
                '&:hover': { bgcolor: '#1d4ed8' },
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Commencer l'Essai Gratuit
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/support')}
              sx={{
                borderColor: '#2563eb',
                color: '#2563eb',
                '&:hover': { borderColor: '#1d4ed8', bgcolor: 'rgba(37, 99, 235, 0.1)' },
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Contacter les Ventes
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default PricingPage;
