import React, { useState, useEffect, useContext, useRef } from 'react';
import { getMessages } from '../services/conversationService';
import AuthContext from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { Box, TextField, Button, List, ListItem, ListItemText, Paper, Typography, CircularProgress, Avatar } from '@mui/material';

const ChatWindow = ({ selectedConversation, onConversationUpdated }) => {
  const { token, user } = useContext(AuthContext);
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [page, setPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMoreMessages(true);
    if (selectedConversation?.id) { // Only load messages if conversation has an ID
      loadMessages(1);
      if (socket) {
        socket.emit('join_conversation', selectedConversation.id);
      }
    } else if (selectedConversation) {
        // It's a new conversation, so no messages to load
        setMessages([]);
    }
  }, [selectedConversation, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (message) => {
        if (!selectedConversation?.id && message.conversation_id) {
          onConversationUpdated(message.conversation_id);
        }

        if (message.conversation_id === selectedConversation?.id ||
            (!selectedConversation?.id && ((message.sender_id === user?.id && message.recipient_id === selectedConversation?.other_user?.id) || (message.sender_id === selectedConversation?.other_user?.id && message.recipient_id === user?.id)))) {
          setMessages(prevMessages => [...prevMessages, message]);
        }
      });

      return () => {
        socket.off('receive_message');
      };
    }
  }, [socket, selectedConversation, user, onConversationUpdated]);

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
      setMessages(prevMessages => [...fetchedMessages, ...prevMessages]);
      setPage(pageNum + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && socket && user) {
      socket.emit('send_message', {
        conversationId: selectedConversation.id, // Will be null for new conversations
        recipientId: selectedConversation.other_user.id,
        content: newMessage,
      });
      setNewMessage('');
    }
  };

  if (!selectedConversation) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography variant="h6" color="text.secondary">Select a conversation to start chatting</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <Avatar sx={{ mr: 2 }}>{selectedConversation.other_user.username.charAt(0).toUpperCase()}</Avatar>
        <Typography variant="h6">{selectedConversation.other_user.username}</Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
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
                    <ListItem key={msg.id} sx={{ justifyContent: msg.sender_id === user?.id ? 'flex-end' : 'flex-start' }}>
                    <Paper sx={{ p: 1, bgcolor: msg.sender_id === user?.id ? 'primary.main' : 'grey.300', color: msg.sender_id === user?.id ? 'primary.contrastText' : 'inherit' }}>
                        <ListItemText primary={msg.content} secondary={`${msg.sender.username} - ${new Date(msg.created_at).toLocaleTimeString()}`} />
                    </Paper>
                    </ListItem>
                ))}
                </List>
                <div ref={messagesEndRef} />
            </>
        )}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={`Message @${selectedConversation.other_user.username}`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
      </Box>
    </Paper>
  );
};

export default ChatWindow;
