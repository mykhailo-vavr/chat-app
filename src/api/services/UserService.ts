import { apiRoutes } from '@/settings';
import { getApiData } from '../utils';
import { User } from '../models';

export class UserService {
  static async getUser(id: number) {
    return getApiData<User>(`${apiRoutes.USERS}/${id}`);
  }
}
