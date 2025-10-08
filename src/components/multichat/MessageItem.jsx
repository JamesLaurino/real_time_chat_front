import React, { useContext } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import AuthContext from '../../context/AuthContext';

const MessageItem = ({ message }) => {
  const { user } = useContext(AuthContext);
  const isOwn = message.senderId === user?.id || message.sender_id === user?.id;
  const senderName = message.sender?.username || `User ${message.senderId || message.sender_id}`;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwn ? 'flex-end' : 'flex-start',
        mb: 1,
      }}
    >
      <Paper
        sx={{
          p: 1.5,
          maxWidth: '70%',
          backgroundColor: isOwn ? '#dcf8c6' : '#f0f0f0',
        }}
      >
        <Typography
          variant="caption"
          color={isOwn ? 'success.main' : 'primary'}
          sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}
        >
          {isOwn ? 'You' : senderName}
        </Typography>
        <Typography variant="body1">{message.content}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
          {new Date(message.createdAt || message.created_at).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageItem;
