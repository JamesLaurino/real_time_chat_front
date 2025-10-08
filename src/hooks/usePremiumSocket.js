import { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import AuthContext from '../context/AuthContext';

const SOCKET_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : window.location.origin;

export const usePremiumSocket = () => {
  const { token } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log('🟣 usePremiumSocket: token =', token ? 'exists' : 'null');
    if (!token) {
      console.log('🟣 No token, skipping socket connection');
      setSocket(null);
      setConnected(false);
      return;
    }

    // Backend creates separate Socket.IO instance with custom path
    // Then adds a namespace /conversation/premium to it
    // So we connect: base URL + namespace, using the custom path
    console.log('🟣 Creating premium socket connection');
    console.log('🟣 Base URL:', SOCKET_BASE_URL);
    console.log('🟣 Namespace: /conversation/premium');
    console.log('🟣 Path: /socket.io-premium/');

    const newSocket = io(`${SOCKET_BASE_URL}/conversation/premium`, {
      path: '/socket.io-premium/',
      transports: ['websocket'],
      auth: {
        token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    newSocket.on('connect', () => {
      console.log('🟣 ✅ Connected to premium socket:', newSocket.id);
      setConnected(true);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('🟣 ❌ Disconnected from premium socket. Reason:', reason);
      setConnected(false);
    });

    newSocket.on('connect_error', (err) => {
      console.error('🟣 ❌ Premium socket connection error:', err.message);
      setConnected(false);
    });

    newSocket.on('reconnect_attempt', (attemptNumber) => {
      console.log('🟣 🔄 Reconnection attempt:', attemptNumber);
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log('🟣 ✅ Reconnected after', attemptNumber, 'attempts');
    });

    setSocket(newSocket);

    return () => {
      console.log('🟣 Cleaning up socket connection');
      if (newSocket) {
        newSocket.removeAllListeners();
        newSocket.close();
      }
      setSocket(null);
      setConnected(false);
    };
  }, [token]);

  return { socket, connected };
};
