import React from 'react';
import { Card, CardContent, Box, Typography, Avatar, Rating } from '@mui/material';

function ReviewCard({ name, role, avatar, rating, comment }) {
  return (
    <Card
      sx={{
        height: '100%',
        p: 3,
        border: 'none',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
        },
        transition: 'all 0.3s ease'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#2563eb', mr: 2 }}>
            {avatar}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              {role}
            </Typography>
          </Box>
        </Box>
        <Rating value={rating} readOnly sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ color: '#374151', fontStyle: 'italic' }}>
          "{comment}"
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
