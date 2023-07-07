import { DefaultEventsMap, FCWithChildren } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useUser } from '@/hooks';
import { SocketContext } from './context';

export const SocketProvider: FCWithChildren = ({ children }) => {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const [connection, setConnection] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const { isAuthenticated, id } = useUser();

  useEffect(() => {
    if (!isAuthenticated) {
      return () => {};
    }

    const socketData = io(process.env.NEXT_PUBLIC_API_BASE_URL || '', { autoConnect: false, auth: { id } });
    setSocket(socketData);

    const socketConnection = socketData.connect();
    socketConnection.emit('connected_user');
    setConnection(socketConnection);

    socketData.on('connect_error', console.error);

    socketData.on('user connected', (user) => {
      console.info(user);
    });

    return () => {
      socketData.disconnect();
      socketData.off('connect_error');
    };
  }, [id, isAuthenticated]);

  const contextValues = useMemo(
    () => ({
      socket,
      connection,
    }),
    [socket, connection],
  );

  return <SocketContext.Provider value={contextValues}>{children}</SocketContext.Provider>;
};
