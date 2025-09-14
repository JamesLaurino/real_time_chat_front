import React from 'react';
import { Card, CardContent, Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check } from '@mui/icons-material';
import { formatPrice } from '../helpers/formatPrice';

function PricingCard({ 
  title, 
  price, 
  period, 
  originalPrice = null,
  features = [], 
  isPopular = false, 
  onSubscribe,
  buttonText = "Get Started"
}) {
  const savings = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        border: isPopular ? '2px solid #2563eb' : '1px solid #e2e8f0',
        borderRadius: 2,
        boxShadow: isPopular ? '0 10px 25px -3px rgba(37, 99, 235, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isPopular ? '0 20px 40px -3px rgba(37, 99, 235, 0.15)' : '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
        },
        transition: 'all 0.3s ease'
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: 'absolute',
            top: -1,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: '#2563eb',
            color: 'white',
            px: 3,
            py: 0.5,
            borderRadius: '0 0 8px 8px',
            fontSize: '0.875rem',
            fontWeight: 'bold'
          }}
        >
          Most Popular
        </Box>
      )}
      
      <CardContent sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2563eb' }}>
              {formatPrice(price)}
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              /{period}
            </Typography>
          </Box>
          
          {originalPrice && savings > 0 && (
            <Box sx={{ mt: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  textDecoration: 'line-through', 
                  color: '#94a3b8',
                  mb: 0.5
                }}
              >
                {formatPrice(originalPrice)}/{period}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#10b981',
                  fontWeight: 'bold'
                }}
              >
                Save {savings}%
              </Typography>
            </Box>
          )}
        </Box>

        <Button
          variant={isPopular ? "contained" : "outlined"}
          size="large"
          fullWidth
          onClick={onSubscribe}
          sx={{
            mb: 3,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold',
            ...(isPopular ? {
              bgcolor: '#2563eb',
              '&:hover': { bgcolor: '#1d4ed8' }
            } : {
              borderColor: '#2563eb',
              color: '#2563eb',
              '&:hover': { borderColor: '#1d4ed8', bgcolor: 'rgba(37, 99, 235, 0.04)' }
            })
          }}
        >
          {buttonText}
        </Button>

        <List sx={{ p: 0 }}>
          {features.map((feature, index) => (
            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Check sx={{ color: '#10b981', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText 
                primary={feature} 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    fontSize: '0.95rem',
                    color: '#475569'
                  } 
                }} 
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default PricingCard;
