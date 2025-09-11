import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';
import { useNotifier } from '../context/NotificationContext';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, TextField, Box, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme, ownerState }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: ownerState.online ? '#44b700' : '#f44336',
    color: ownerState.online ? '#44b700' : '#f44336',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    ...(ownerState.online && {
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    }),
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
}));

const UserList = ({ onSelectUser }) => {
  const { user: currentUser } = useAuth();
  const socket = useSocket();
  const { addNotification } = useNotifier();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers.sort((a, b) => b.online - a.online));
      } catch (error) {
        console.error(error);
        addNotification(error.message, 'error');
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser, addNotification]);

  useEffect(() => {
    if (socket) {
      const handleStatusChange = ({ userId, online }) => {
        let statusUser = null;
        setUsers(prevUsers =>
          prevUsers.map(user => {
            if (user.id === userId) {
              statusUser = user;
              return { ...user, online };
            }
            return user;
          }).sort((a, b) => b.online - a.online)
        );

        if (statusUser && statusUser.id !== currentUser?.id) {
          const status = online ? 'online' : 'offline';
          addNotification(`${statusUser.username} is now ${status}`, online ? 'success' : 'info');
        }
      };

      socket.on('user_status_changed', handleStatusChange);

      return () => {
        socket.off('user_status_changed', handleStatusChange);
      };
    }
  }, [socket, addNotification, currentUser]);

  const filteredUsers = users.filter(user =>
    user.id !== currentUser?.id && // Exclude current user
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <TextField
        fullWidth
        label="Search Users"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <List>
        {filteredUsers.map(user => (
          <ListItem button key={user.id} onClick={() => onSelectUser(user)} sx={{ '&:hover': { cursor: 'pointer' } }}>
            <ListItemAvatar>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                ownerState={{ online: user.online }}
              >
                <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
              </StyledBadge>
            </ListItemAvatar>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
