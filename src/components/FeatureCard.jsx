import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';

function FeatureCard({ icon, title, description, variant = 'default' }) {
  return (
    <Card
      sx={{
        height: '100%',
        p: 3,
        textAlign: 'center',
        border: 'none',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
        },
        transition: 'all 0.3s ease',
        bgcolor: variant === 'dark' ? '#1e293b' : 'white',
        color: variant === 'dark' ? 'white' : 'inherit'
      }}
    >
      <CardContent>
        <Box sx={{ mb: 2 }}>
          {icon}
        </Box>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2, 
            fontWeight: 'bold', 
            color: variant === 'dark' ? 'white' : '#1e293b' 
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: variant === 'dark' ? 'rgba(255,255,255,0.8)' : '#64748b' 
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FeatureCard;
