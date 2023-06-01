import { apiRoutes } from '@/settings';
import { useFetchApi } from './useFetchApi';
import { User } from '../models';

export const useGetUsers = (firstName?: string, lastName?: string, id?: number) =>
  useFetchApi<User[]>(apiRoutes.USERS, {
    params: { firstName, lastName, id },
  });
