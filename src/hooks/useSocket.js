import { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import AuthContext from '../context/AuthContext';

const SOCKET_URL =
    window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : '/socket.io';


export const useSocket = () => {
  const { token } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      const newSocket = io(SOCKET_URL, {
        path:'/socket.io',
        auth: {
          token,
        },
      });

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [token]);

  return socket;
};
