console.log('🟢 MultichatPage.jsx FILE LOADED');

import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { usePremiumSocket } from '../hooks/usePremiumSocket';
import { getAllMultichats, deleteMultichat } from '../services/multichatService';
import CreateMultichatModal from '../components/multichat/CreateMultichatModal';
import AddUserModal from '../components/multichat/AddUserModal';
import RoomList from '../components/multichat/RoomList';
import MessageList from '../components/multichat/MessageList';
import MessageInput from '../components/multichat/MessageInput';
import ParticipantsList from '../components/multichat/ParticipantsList';

const drawerWidth = 300;

console.log('🟢 All MultichatPage imports complete');

const MultichatPage = () => {
  console.log('🔵 MultichatPage component rendering...');

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  console.log('🔵 User from context:', user);

  const { socket, connected } = usePremiumSocket();
  console.log('🔵 Socket:', socket, 'Connected:', connected);

  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Load rooms on mount
  useEffect(() => {
    loadRooms();
  }, []);

  // Set current user as online when socket connects
  useEffect(() => {
    if (connected && user) {
      console.log('🟣 Setting current user as online:', user.id);
      setOnlineUsers((prev) => ({ ...prev, [user.id]: true }));
    }
  }, [connected, user]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('online_users_list', (userIds) => {
      console.log('🟣 Received online users list:', userIds);
      const onlineMap = {};
      userIds.forEach(id => {
        onlineMap[id] = true;
      });
      // Merge with existing online users instead of replacing
      setOnlineUsers((prev) => ({ ...prev, ...onlineMap }));
    });

    socket.on('receive_message', (message) => {
      if (message.conversationId === activeRoom?.id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on('conversation_history', (history) => {
      setMessages(history);
      setMessagesLoading(false);
    });

    socket.on('user_list_update', (usersData) => {
      console.log('🟣 User list update:', usersData);
      // usersData is now an array of ALL participants (from database), not just online users
      setParticipants(usersData);
      // Don't automatically mark all users as online - wait for room_users_online_status event
    });

    socket.on('room_users_online_status', (statusMap) => {
      console.log('🟣 Room users online status:', statusMap);
      setOnlineUsers((prev) => ({ ...prev, ...statusMap }));
    });

    socket.on('user_joined', (data) => {
      console.log(`🟣 ${data.username} joined the room`);
      // Mark the joined user as online
      setOnlineUsers((prev) => ({ ...prev, [data.userId]: true }));
    });

    socket.on('user_status_changed', ({ userId, online }) => {
      console.log(`🟣 User ${userId} status changed to ${online ? 'online' : 'offline'}`);
      setOnlineUsers((prev) => ({ ...prev, [userId]: online }));
    });

    socket.on('user_added', (data) => {
      console.log(`🟣 User ${data.username} was added to the room`);
      // Reload rooms to get updated participant list
      loadRooms();
    });

    socket.on('user_add_success', () => {
      console.log('🟣 User added successfully');
      // Reload rooms to get updated participant list
      loadRooms();
    });

    socket.on('user_add_error', (error) => {
      console.error('❌ Error adding user:', error);
      alert(`Error: ${error}`);
    });

    socket.on('user_removed', (data) => {
      console.log(`🟣 User ${data.username} was removed from the room`);
      // Reload rooms to get updated participant list
      loadRooms();
    });

    socket.on('user_remove_success', () => {
      console.log('🟣 User removed successfully');
      // Reload rooms to get updated participant list
      loadRooms();
    });

    socket.on('user_remove_error', (error) => {
      console.error('❌ Error removing user:', error);
      alert(`Error: ${error}`);
    });

    socket.on('conversation_deleted', (data) => {
      console.log(`🟣 Conversation ${data.conversationId} was deleted`);
      // If deleted room was active, clear it
      if (activeRoom && (activeRoom.id === data.conversationId || activeRoom.conversation_id === data.conversationId)) {
        setActiveRoom(null);
        setMessages([]);
        setParticipants([]);
      }
      // Reload rooms
      loadRooms();
    });

    socket.on('delete_conversation_success', () => {
      console.log('🟣 Conversation deleted successfully');
    });

    socket.on('delete_conversation_error', (error) => {
      console.error('❌ Error deleting conversation:', error);
      alert(`Error: ${error}`);
    });

    socket.on('room_list_update', () => {
      console.log('🟣 Room list updated - reloading rooms');
      loadRooms();
    });

    socket.on('message_error', (error) => {
      console.error('Message error:', error);
    });

    return () => {
      socket.off('online_users_list');
      socket.off('receive_message');
      socket.off('conversation_history');
      socket.off('user_list_update');
      socket.off('room_users_online_status');
      socket.off('user_joined');
      socket.off('user_status_changed');
      socket.off('user_added');
      socket.off('user_add_success');
      socket.off('user_add_error');
      socket.off('user_removed');
      socket.off('user_remove_success');
      socket.off('user_remove_error');
      socket.off('conversation_deleted');
      socket.off('delete_conversation_success');
      socket.off('delete_conversation_error');
      socket.off('room_list_update');
      socket.off('message_error');
    };
  }, [socket, activeRoom]);

  const loadRooms = async () => {
    console.log('🔵 loadRooms called');
    setRoomsLoading(true);
    try {
      console.log('🔵 Fetching multichats...');
      const allRooms = await getAllMultichats();
      console.log('🔵 Received rooms:', allRooms);

      // Handle empty or undefined response
      if (!allRooms || !Array.isArray(allRooms)) {
        console.log('🔵 No rooms returned or invalid response');
        setRooms([]);
        return;
      }

      // Group by conversation_id
      const grouped = allRooms.reduce((acc, item) => {
        const convId = item.conversation_id;
        if (!acc[convId]) {
          acc[convId] = {
            id: convId,
            conversation_id: convId,
            name: item.Conversation?.name || null,
            participants: [],
          };
        }
        acc[convId].participants.push(item);
        return acc;
      }, {});

      const roomsArray = Object.values(grouped).map((room) => ({
        ...room,
        participantCount: room.participants.length,
      }));

      console.log('🔵 Processed rooms:', roomsArray);
      setRooms(roomsArray);
    } catch (err) {
      console.error('❌ Failed to load rooms:', err);
      setRooms([]);
    } finally {
      setRoomsLoading(false);
      console.log('🔵 Rooms loading complete');
    }
  };

  const handleSelectRoom = (room) => {
    setActiveRoom(room);
    setMessages([]);
    setMessagesLoading(true);
    setParticipants([]); // Clear participants - will be populated by socket event

    if (socket && connected) {
      socket.emit('join_conversation', room.id || room.conversation_id);
    }

    setMobileMenuOpen(false);
  };

  const handleSendMessage = (content) => {
    if (!socket || !activeRoom || !connected) return;

    socket.emit('send_message', {
      conversationId: activeRoom.id || activeRoom.conversation_id,
      content,
    });
  };

  const handleCreateRoom = async (newRoom) => {
    console.log('🔵 Created new room:', newRoom);

    // Create room object for immediate display
    const roomId = newRoom.id || newRoom.conversation_id;
    const newRoomObj = {
      id: roomId,
      conversation_id: roomId,
      name: newRoom.name,
      participants: [{ user_id: user.id, username: user.username, User: { id: user.id, username: user.username } }],
      participantCount: 1
    };

    // Add the new room to the list immediately
    setRooms((currentRooms) => [...currentRooms, newRoomObj]);

    // Auto-select the new room
    handleSelectRoom(newRoomObj);

    // Reload rooms in the background to get full data
    setTimeout(() => {
      loadRooms();
    }, 500);
  };

  const handleAddUser = async (userId) => {
    if (socket && activeRoom) {
      socket.emit('add_user_to_room', {
        conversationId: activeRoom.id || activeRoom.conversation_id,
        userId,
      });
      // Room reload will be triggered by user_add_success event
    }
  };

  const handleRemoveUser = async (userId) => {
    if (socket && activeRoom) {
      socket.emit('remove_user_from_room', {
        conversationId: activeRoom.id || activeRoom.conversation_id,
        userId,
      });
      // Room reload will be triggered by user_remove_success event
    }
  };

  const handleDeleteRoom = async (room) => {
    if (!socket || !connected) {
      console.error('❌ Socket not connected');
      alert('Socket not connected. Cannot delete room.');
      return;
    }

    try {
      const roomId = room.id || room.conversation_id;
      console.log('🔵 Deleting room:', roomId);

      // First delete via HTTP API (to actually delete from database)
      const result = await deleteMultichat(roomId);
      console.log('🔵 Delete result:', result);

      // Then emit socket event to notify all users
      socket.emit('delete_conversation', { conversationId: roomId });
      console.log('🔵 Emitted delete_conversation event');
    } catch (error) {
      console.error('❌ Failed to delete room:', error);
      alert(`Failed to delete room: ${error.message || error}`);
    }
  };

  console.log('🔵 Rendering MultichatPage UI');
  console.log('🔵 Rooms:', rooms);
  console.log('🔵 Active room:', activeRoom);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Top bar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Group Chat {user?.username ? `- ${user.username}` : ''}
          </Typography>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/chat')}
            sx={{ mr: 2 }}
          >
            1-on-1 Chat
          </Button>
          {connected ? (
            <Typography variant="caption" sx={{ color: 'lightgreen', mr: 2 }}>
              ● Connected
            </Typography>
          ) : (
            <Typography variant="caption" sx={{ color: 'orange', mr: 2 }}>
              ● Connecting...
            </Typography>
          )}
          <Button color="inherit" onClick={() => { logout(); navigate('/login'); }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Left Drawer - Rooms List */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileMenuOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              top: '64px',
              height: 'calc(100% - 64px)',
              display: 'flex',
              flexDirection: 'column'
            },
          }}
        >
          {/* Rooms section - header with button */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Rooms</Typography>
            <Tooltip title={user?.premium ? "Create New Room" : "Premium Only"}>
              <span>
                <IconButton
                  color="primary"
                  onClick={() => setCreateModalOpen(true)}
                  disabled={!user?.premium}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          {/* Rooms list - takes 60% of height */}
          <Box sx={{ flex: '0 0 60%', overflow: 'auto', borderBottom: 1, borderColor: 'divider' }}>
            <RoomList
              rooms={rooms}
              activeRoomId={activeRoom?.id || activeRoom?.conversation_id}
              onSelectRoom={handleSelectRoom}
              onDeleteRoom={handleDeleteRoom}
              loading={roomsLoading}
              onlineUsers={onlineUsers}
            />
          </Box>

          {/* Participants section - takes 40% of height */}
          <Box sx={{ flex: '1 1 40%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">Participants ({participants.length})</Typography>
            </Box>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <ParticipantsList
                participants={participants}
                onlineUsers={onlineUsers}
                onRemoveUser={handleRemoveUser}
                currentUserId={user?.id}
              />
            </Box>
          </Box>
        </Drawer>
      </Box>

      {/* Chat area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
          {activeRoom ? (
            <>
              {/* Room header */}
              <Box
                sx={{
                  p: 2,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6">{activeRoom.name || `Room ${activeRoom.id || activeRoom.conversation_id}`}</Typography>
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  onClick={() => setAddUserModalOpen(true)}
                  size="small"
                >
                  Add User
                </Button>
              </Box>

              {/* Messages - flex grow to fill space */}
              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <MessageList messages={messages} loading={messagesLoading} />
              </Box>

              {/* Input - fixed at bottom */}
              <MessageInput onSend={handleSendMessage} disabled={!connected} />
            </>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Select a room to start chatting
              </Typography>
            </Box>
          )}
      </Box>

      {/* Modals */}
      <CreateMultichatModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreated={handleCreateRoom}
      />

      <AddUserModal
        open={addUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        currentParticipants={participants}
        onAddUser={handleAddUser}
        onlineUsers={onlineUsers}
      />
    </Box>
  );
};

export default MultichatPage;
