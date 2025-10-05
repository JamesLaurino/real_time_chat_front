import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Alert,
  CircularProgress,
  Box,
  Typography,
  Avatar,
  Badge,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { getAllUsers } from '../../services/multichatService';

const AddUserModal = ({ open, onClose, currentParticipants, onAddUser, onlineUsers = {} }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addingUserId, setAddingUserId] = useState(null);

  useEffect(() => {
    if (open) {
      fetchUsers();
    }
  }, [open]);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, users, currentParticipants]);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    const participantIds = currentParticipants.map((p) => p.id || p.user_id);
    const available = users.filter(
      (user) => !participantIds.includes(user.id)
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      setFilteredUsers(
        available.filter((user) =>
          user.username.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredUsers(available);
    }
  };

  const handleAddUser = async (userId) => {
    setAddingUserId(userId);
    try {
      await onAddUser(userId);
    } catch (err) {
      setError(err.message || 'Failed to add user');
    } finally {
      setAddingUserId(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add User to Room</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredUsers.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
            {searchQuery ? 'No users found' : 'All users are already in this room'}
          </Typography>
        ) : (
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {filteredUsers.map((user) => {
              const isOnline = onlineUsers[user.id] || false;
              return (
                <ListItem key={user.id}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    sx={{
                      mr: 2,
                      '& .MuiBadge-badge': {
                        backgroundColor: isOnline ? '#44b700' : '#grey.500',
                        color: isOnline ? '#44b700' : '#grey.500',
                        boxShadow: `0 0 0 2px white`,
                      },
                    }}
                  >
                    <Avatar sx={{ width: 40, height: 40 }}>
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </Badge>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1">{user.username}</Typography>
                        <Chip
                          label={isOnline ? 'Online' : 'Offline'}
                          size="small"
                          color={isOnline ? 'success' : 'default'}
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    }
                    secondary={user.email}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleAddUser(user.id)}
                      disabled={addingUserId === user.id}
                      color="primary"
                    >
                      {addingUserId === user.id ? (
                        <CircularProgress size={24} />
                      ) : (
                        <AddIcon />
                      )}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
