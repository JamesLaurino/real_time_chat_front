import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Box 
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

function FaqItem({ question, answer, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{
        boxShadow: 'none',
        border: '1px solid #e2e8f0',
        borderRadius: '8px !important',
        mb: 1,
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: '0 0 8px 0',
        }
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: '#2563eb' }} />}
        sx={{
          '& .MuiAccordionSummary-content': {
            margin: '16px 0',
          },
          '&.Mui-expanded': {
            minHeight: 48,
          },
          '&:hover': {
            bgcolor: 'rgba(37, 99, 235, 0.04)'
          }
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            color: '#1e293b',
            fontSize: '1.1rem'
          }}
        >
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          pt: 0,
          pb: 2
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#64748b',
            lineHeight: 1.6
          }}
        >
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default FaqItem;
