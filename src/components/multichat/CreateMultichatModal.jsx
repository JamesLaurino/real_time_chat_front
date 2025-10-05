import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  CircularProgress,
  Box,
  Typography,
  TextField,
} from '@mui/material';
import AuthContext from '../../context/AuthContext';
import { createMultichat } from '../../services/multichatService';

const CreateMultichatModal = ({ open, onClose, onCreated }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [groupName, setGroupName] = useState('');

  const handleCreate = async () => {
    if (!user || !user.premium) {
      setError('Only premium users can create multichat rooms');
      return;
    }

    if (!groupName.trim()) {
      setError('Please enter a group name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newRoom = await createMultichat(user.id, groupName.trim());
      onCreated(newRoom);
      setGroupName('');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create multichat room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Create Group Chat</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {!user?.premium && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Premium membership required
          </Alert>
        )}
        <TextField
          autoFocus
          margin="dense"
          label="Group Name"
          type="text"
          fullWidth
          variant="outlined"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          disabled={loading || !user?.premium}
          placeholder="Enter a name for your group..."
          sx={{ mt: 2 }}
        />
        <Box sx={{ py: 2 }}>
          <Typography variant="body2" color="text.secondary">
            You&apos;ll be added automatically and can invite others after creation.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          disabled={loading || !user?.premium}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Creating...' : 'Create Group'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMultichatModal;
