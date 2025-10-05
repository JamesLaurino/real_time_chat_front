import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Divider,
  CircularProgress,
  IconButton,
  Avatar,
  AvatarGroup,
  Badge,
  Tooltip,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const RoomList = ({ rooms, activeRoomId, onSelectRoom, onDeleteRoom, loading, onlineUsers = {} }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (rooms.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
        No rooms available. Create one to get started!
      </Typography>
    );
  }

  const handleDelete = (e, room) => {
    e.stopPropagation();
    if (window.confirm(`Delete room "${room.name || `Room ${room.id || room.conversation_id}`}"?`)) {
      onDeleteRoom(room);
    }
  };

  return (
    <List sx={{ p: 0 }}>
      {rooms.map((room) => {
        const participants = room.participants || [];
        const displayParticipants = participants.slice(0, 3);

        return (
          <React.Fragment key={room.id || room.conversation_id}>
            <ListItem
              disablePadding
              secondaryAction={
                <Tooltip title="Delete this room">
                  <IconButton
                    edge="end"
                    onClick={(e) => handleDelete(e, room)}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemButton
                selected={activeRoomId === (room.id || room.conversation_id)}
                onClick={() => onSelectRoom(room)}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {room.name || `Room ${room.id || room.conversation_id}`}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    {displayParticipants.length > 0 ? (
                      <AvatarGroup max={3} sx={{ mr: 1 }}>
                        {displayParticipants.map((participant) => {
                          const userId = participant.user_id || participant.User?.id;
                          const username = participant.User?.username || participant.username || `User ${userId}`;
                          const isOnline = onlineUsers[userId] || false;

                          return (
                            <Badge
                              key={userId}
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              variant="dot"
                              sx={{
                                '& .MuiBadge-badge': {
                                  backgroundColor: isOnline ? '#44b700' : '#9e9e9e',
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  border: '1px solid white',
                                },
                              }}
                            >
                              <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                {username.charAt(0).toUpperCase()}
                              </Avatar>
                            </Badge>
                          );
                        })}
                      </AvatarGroup>
                    ) : null}
                    <Typography variant="caption" color="text.secondary">
                      {room.participantCount || 0} participant{room.participantCount !== 1 ? 's' : ''}
                    </Typography>
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default RoomList;
