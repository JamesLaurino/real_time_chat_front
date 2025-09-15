import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HeroSection({ 
  title = "ChatOne", 
  subtitle = "The future of real-time communication. Connect, collaborate, and communicate with confidence.",
  primaryButtonText = "Start Free Trial",
  primaryButtonAction = "/pricing",
  secondaryButtonText = "Get Started",
  secondaryButtonAction = "/register",
  showButtons = true 
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '3rem', md: '4.5rem' },
            fontWeight: 'bold',
            mb: 2
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            opacity: 0.9,
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          {subtitle}
        </Typography>
        {showButtons && (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(primaryButtonAction)}
              sx={{
                bgcolor: '#10b981',
                '&:hover': { bgcolor: '#059669' },
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              {primaryButtonText}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(secondaryButtonAction)}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              {secondaryButtonText}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default HeroSection;
