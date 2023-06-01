import { apiRoutes } from '@/settings';
import axios from 'axios';

// TODO: auth token placed here

const apiClient = axios.create({
  baseURL: apiRoutes.BASE_URL,
});

export { apiClient };
