import axios, { AxiosRequestConfig } from 'axios';

export const getData = async <T = any>(url: string, config?: AxiosRequestConfig) => {
  try {
    const res = await axios.get<T>(url, config);
    return { data: res.data, res };
  } catch (e) {
    console.error(e);
    return { data: null, res: null };
  }
};

export const postData = async <T = any, D = any>(url: string, data: D, config?: AxiosRequestConfig) => {
  try {
    const res = await axios.post<T>(url, data, config);
    return { data: res.data, res };
  } catch (e) {
    console.error(e);
    return { data: null, res: null };
  }
};
