import { apiRoutes } from '@/settings';
import { useFetchApi } from './useFetchApi';
import { Message } from '../models';

export const useGetMessages = (senderId?: number, recipientId?: number) =>
  useFetchApi<Message[]>(apiRoutes.MESSAGES, {
    params: { senderId, recipientId },
  });
