import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';
import { Box, Grid, Button, AppBar, Toolbar, Typography } from '@mui/material';

const ChatPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sm={4} md={3} sx={{ borderRight: '1px solid #ddd' }}>
          <UserList />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h4">Welcome to the Chat</Typography>
            <Typography>
              Select a user to start a conversation.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage;
