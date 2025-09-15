import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SubscriptionButton({ 
  plan, 
  price, 
  period,
  variant = "contained",
  size = "large",
  fullWidth = false,
  children,
  disabled = false,
  sx = {}
}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      // Simulate subscription process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would integrate with a payment processor
      // For now, redirect to registration
      navigate('/register', { 
        state: { 
          selectedPlan: plan,
          price: price,
          period: period
        }
      });
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={handleSubscribe}
      disabled={disabled || loading}
      sx={{
        position: 'relative',
        ...sx
      }}
    >
      {loading && (
        <CircularProgress
          size={20}
          sx={{
            position: 'absolute',
            color: variant === 'contained' ? 'white' : 'primary.main'
          }}
        />
      )}
      <span style={{ opacity: loading ? 0 : 1 }}>
        {children}
      </span>
    </Button>
  );
}

export default SubscriptionButton;
