import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';
import ChatWindow from '../components/ChatWindow';
import { Box, Grid, Button, AppBar, Toolbar, Typography } from '@mui/material';
import { getConversations } from '../services/conversationService';

const ChatPage = () => {
  const { logout, user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const fetchedConversations = await getConversations(token);
        setConversations(fetchedConversations);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };

    if (token) {
      fetchConversations();
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSelectUser = (selectedUser) => {
    // Check if a conversation with this user already exists
    const existingConversation = conversations.find(conv =>
      (conv.user1_id === user.id && conv.user2_id === selectedUser.id) ||
      (conv.user1_id === selectedUser.id && conv.user2_id === user.id)
    );

    if (existingConversation) {
      setSelectedConversation({
        ...existingConversation,
        other_user: existingConversation.user1_id === user.id ? existingConversation.user2 : existingConversation.user1
      });
    } else {
      // Create a temporary conversation object for a new chat
      setSelectedConversation({
        id: null, // No ID yet, will be created on first message
        user1_id: user.id,
        user2_id: selectedUser.id,
        other_user: selectedUser,
        messages: [], // Initialize with empty messages
      });
    }
  };

  const handleConversationUpdated = (newConversationId) => {
    setSelectedConversation(prevConv => ({
      ...prevConv,
      id: newConversationId,
    }));
    // Optionally, refetch conversations to update the list with the new one
    const fetchConversations = async () => {
      try {
        const fetchedConversations = await getConversations(token);
        setConversations(fetchedConversations);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };
    fetchConversations();
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
          <UserList onSelectUser={handleSelectUser} />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <ChatWindow selectedConversation={selectedConversation} onConversationUpdated={handleConversationUpdated} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage;
