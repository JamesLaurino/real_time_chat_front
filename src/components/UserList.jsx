import React, { useEffect, useState, useContext } from 'react';
import { getUsers } from '../services/userService';
import AuthContext from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, TextField, Box, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme, ownerState }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: ownerState.online ? '#44b700' : '#f44336',
    color: ownerState.online ? '#44b700' : '#f44336',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
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
  const { token } = useContext(AuthContext);
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers(token);
        setUsers(fetchedUsers.sort((a, b) => b.online - a.online));
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  useEffect(() => {
    if (socket) {
      socket.on('user_status_changed', ({ userId, online }) => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, online } : user
          ).sort((a, b) => b.online - a.online)
        );
      });

      return () => {
        socket.off('user_status_changed');
      };
    }
  }, [socket]);

  const filteredUsers = users.filter(user =>
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
          <ListItem button key={user.id} onClick={() => onSelectUser(user)}>
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
