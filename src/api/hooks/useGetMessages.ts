import { apiRoutes } from '@/settings';
import { useFetchApi } from './useFetchApi';
import { GetMessageRequest, Message } from '../models';

export const useGetMessages = (params: GetMessageRequest) =>
  useFetchApi<Message[]>(apiRoutes.MESSAGES, {
    params,
  });
