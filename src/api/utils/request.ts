import { AxiosRequestConfig } from 'axios';
import { TokenService } from '@/services';
import { apiClient } from '../client';

export const getApiData = async <T = any>(url: string, config?: AxiosRequestConfig) => {
  console.log('before', apiClient.defaults.headers.common.Authorization);

  if (!config?.headers?.Authorization) {
    apiClient.defaults.headers.common.Authorization = TokenService.get.access();
  }

  console.log('after', apiClient.defaults.headers.common.Authorization);

  try {
    const res = await apiClient.get<T>(url, config);
    return { data: res.data, res };
  } catch (e) {
    console.error(e);
    return { data: null, res: null };
  }
};

export const postApiData = async <T = any, D = any>(url: string, data: D, config?: AxiosRequestConfig) => {
  console.log('before', apiClient.defaults.headers.common.Authorization);

  if (!config?.headers?.Authorization) {
    apiClient.defaults.headers.common.Authorization = TokenService.get.access();
  }

  console.log('after', apiClient.defaults.headers.common.Authorization);

  try {
    const res = await apiClient.post<T>(url, data, config);
    return { data: res.data, res };
  } catch (e) {
    console.error(e);
    return { data: null, res: null };
  }
};
