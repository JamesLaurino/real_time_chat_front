import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Chat</h2>
      <p>Welcome to the chat!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ChatPage;
