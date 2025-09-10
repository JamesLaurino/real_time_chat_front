import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';
import ChatWindow from '../components/ChatWindow';
import { Box, Button, AppBar, Toolbar, Typography, Drawer, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getConversations } from '../services/conversationService';

const drawerWidth = 300;

const ChatPage = () => {
  const { logout, user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelectUser = (selectedUser) => {
    const existingConversation = conversations.find(conv =>
      (conv.user1_id === user.id && conv.user2_id === selectedUser.id) ||
      (conv.user1_id === selectedUser.id && conv.user2_id === user.id)
    );

    if (existingConversation) {
      setSelectedConversation({
        ...existingConversation,
        other_user: existingConversation.user1_id === user.id ? conversations.find(c => c.id === existingConversation.id).user2 : conversations.find(c => c.id === existingConversation.id).user1
      });
    } else {
      setSelectedConversation({
        id: null,
        user1_id: user.id,
        user2_id: selectedUser.id,
        other_user: selectedUser,
        messages: [],
      });
    }
    if(isMobile) {
        setMobileOpen(false);
    }
  };

  const handleConversationUpdated = (newConversationId) => {
    setSelectedConversation(prevConv => ({
      ...prevConv,
      id: newConversationId,
    }));
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

  const drawerContent = <UserList onSelectUser={handleSelectUser} />;

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Chat
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, top: '64px' },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: '64px' }}
      >
        <ChatWindow selectedConversation={selectedConversation} onConversationUpdated={handleConversationUpdated} />
      </Box>
    </Box>
  );
};

export default ChatPage;
