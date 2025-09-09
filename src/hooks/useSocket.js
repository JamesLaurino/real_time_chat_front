import { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import AuthContext from '../context/AuthContext';

const SOCKET_URL = 'http://localhost:3000';

export const useSocket = () => {
  const { token } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      const newSocket = io(SOCKET_URL, {
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
