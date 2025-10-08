import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Badge,
  IconButton,
  Tooltip,
} from '@mui/material';
import { PersonRemove as PersonRemoveIcon } from '@mui/icons-material';

const ParticipantsList = ({ participants, onlineUsers = {}, onRemoveUser, currentUserId }) => {
  if (participants.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
        No participants
      </Typography>
    );
  }

  const handleRemove = (userId, username) => {
    if (window.confirm(`Remove ${username} from this chat?`)) {
      onRemoveUser(userId);
    }
  };

  return (
    <List dense>
      {participants.map((participant) => {
        const userId = participant.id || participant.user_id;
        const username = participant.username || participant.User?.username || `User ${userId}`;
        const isOnline = onlineUsers[userId] || false;
        const isCurrentUser = userId === currentUserId;

        return (
          <ListItem
            key={userId}
            secondaryAction={
              !isCurrentUser && onRemoveUser ? (
                <Tooltip title={`Remove ${username} from chat`}>
                  <IconButton
                    edge="end"
                    onClick={() => handleRemove(userId, username)}
                    size="small"
                    color="error"
                  >
                    <PersonRemoveIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ) : null
            }
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: isOnline ? '#44b700' : '#grey.500',
                  color: isOnline ? '#44b700' : '#grey.500',
                  boxShadow: `0 0 0 2px white`,
                  '&::after': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    animation: isOnline ? 'ripple 1.2s infinite ease-in-out' : 'none',
                    border: '1px solid currentColor',
                    content: '""',
                  },
                },
                '@keyframes ripple': {
                  '0%': {
                    transform: 'scale(.8)',
                    opacity: 1,
                  },
                  '100%': {
                    transform: 'scale(2.4)',
                    opacity: 0,
                  },
                },
              }}
            >
              <Avatar sx={{ mr: 1, width: 32, height: 32, fontSize: '0.9rem' }}>
                {username.charAt(0).toUpperCase()}
              </Avatar>
            </Badge>
            <ListItemText
              primary={username}
              secondary={isOnline ? 'Online' : 'Offline'}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption', color: isOnline ? 'success.main' : 'text.secondary' }}
              sx={{ ml: 1 }}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ParticipantsList;
