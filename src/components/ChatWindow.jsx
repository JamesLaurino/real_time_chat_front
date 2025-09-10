import React, { useState, useEffect, useContext, useRef } from 'react';
import { getMessages } from '../services/conversationService';
import AuthContext from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { Box, TextField, Button, List, ListItem, ListItemText, Paper, Typography, CircularProgress, Avatar, Grow, IconButton, InputAdornment, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

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

const ChatWindow = ({ selectedConversation, onConversationUpdated }) => {
  const { token, user } = useContext(AuthContext);
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [page, setPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const conversationRef = useRef(selectedConversation);
  const userRef = useRef(user);
  const onConversationUpdatedRef = useRef(onConversationUpdated);

  useEffect(() => {
    conversationRef.current = selectedConversation;
    userRef.current = user;
    onConversationUpdatedRef.current = onConversationUpdated;
  }, [selectedConversation, user, onConversationUpdated]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMoreMessages(true);
    if (selectedConversation?.id) {
      loadMessages(1);
      if (socket) {
        socket.emit('join_conversation', selectedConversation.id);
      }
    } else if (selectedConversation) {
        setMessages([]);
    }
  }, [selectedConversation, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      const currentConversation = conversationRef.current;
      const currentUser = userRef.current;
      const currentOnConversationUpdated = onConversationUpdatedRef.current;

      if (!currentConversation || !currentUser) return;

      // Normalize message from socket (camelCase) to match API response (snake_case)
      const normalizedMessage = {
        ...message,
        id: message.id || Date.now(),
        conversation_id: message.conversationId || message.conversation_id,
        sender_id: message.senderId || message.sender_id,
        created_at: message.createdAt || message.created_at,
        sender: message.sender || { id: message.senderId, username: '...' } // Add a fallback for sender
      };

      if (!currentConversation.id && normalizedMessage.conversation_id) {
        currentOnConversationUpdated(normalizedMessage.conversation_id);
        // After the conversation is updated, we need to join the new room.
        socket.emit('join_conversation', normalizedMessage.conversation_id);
      }

      const isForCurrentConv = normalizedMessage.conversation_id === currentConversation.id;
      const isForNewConv = !currentConversation.id && 
        ((normalizedMessage.sender_id === currentUser.id && message.recipientId === currentConversation.other_user.id) || 
         (message.senderId === currentConversation.other_user.id && message.recipientId === currentUser.id));

      if (isForCurrentConv || isForNewConv) {
        setMessages(prevMessages => [...prevMessages, normalizedMessage]);
      }
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket]);

  const loadMessages = async (pageNum) => {
    if (!hasMoreMessages || loading || !selectedConversation?.id) return;
    setLoading(true);
    try {
      const limit = 20;
      const offset = (pageNum - 1) * limit;
      const fetchedMessages = await getMessages(token, selectedConversation.id, limit, offset);
      if (fetchedMessages.length < limit) {
        setHasMoreMessages(false);
      }
      setMessages(prevMessages => [...fetchedMessages.reverse(), ...prevMessages]);
      setPage(pageNum + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && socket && user) {
      // Send payload with camelCase keys as seen in example files
      socket.emit('send_message', {
        conversationId: selectedConversation.id,
        recipientId: selectedConversation.other_user.id,
        content: newMessage,
      });
      setNewMessage('');
    }
  };

  if (!selectedConversation) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: '#f0f2f5' }}>
        <Typography variant="h6" color="text.secondary">Select a conversation to start chatting</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f0f2f5' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            ownerState={{ online: selectedConversation.other_user.online }}
        >
            <Avatar sx={{ mr: 2 }}>{selectedConversation.other_user.username.charAt(0).toUpperCase()}</Avatar>
        </StyledBadge>
        <Typography variant="h6">{selectedConversation.other_user.username}</Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
        {messages.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Avatar sx={{ width: 80, height: 80, mb: 2 }}>{selectedConversation.other_user.username.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="h5">{selectedConversation.other_user.username}</Typography>
                <Typography color="text.secondary">This is the beginning of your direct message history with @{selectedConversation.other_user.username}.</Typography>
            </Box>
        ) : (
            <>
                {hasMoreMessages && selectedConversation.id && (
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Button onClick={() => loadMessages(page)} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Load More'}
                    </Button>
                </Box>
                )}
                <List>
                {messages.map((msg) => (
                  <Grow in={true} key={msg.id}>
                    <ListItem sx={{ justifyContent: msg.sender_id === user?.id ? 'flex-end' : 'flex-start', mb: 1 }}>
                      <Paper 
                        elevation={2}
                        sx={{
                          p: '12px',
                          borderRadius: '16px',
                          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)',
                          bgcolor: msg.sender_id === user?.id ? 'primary.main' : 'white',
                          color: msg.sender_id === user?.id ? 'primary.contrastText' : 'inherit' 
                        }}
                      >
                        <ListItemText 
                          primary={msg.content} 
                          secondary={`${new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
                          secondaryTypographyProps={{ color: msg.sender_id === user?.id ? 'rgba(255,255,255,0.7)' : 'text.secondary', textAlign: 'right', mt: 1 }}
                        />
                      </Paper>
                    </ListItem>
                  </Grow>
                ))}
                </List>
                <div ref={messagesEndRef} />
            </>
        )}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #ddd', backgroundColor: 'white' }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant="outlined"
          placeholder={`Message @${selectedConversation.other_user.username}`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (handleSendMessage(), e.preventDefault())}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>
                  <IconButton>
                    <EmojiEmotionsIcon />
                  </IconButton>
                </InputAdornment>
            )
          }}
        />
      </Box>
    </Paper>
  );
};

export default ChatWindow;
