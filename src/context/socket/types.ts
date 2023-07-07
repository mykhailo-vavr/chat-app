import { DefaultEventsMap } from '@/types';
import { Socket } from 'socket.io-client';

export type SocketContextType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  connection: Socket<DefaultEventsMap, DefaultEventsMap> | null;
};
