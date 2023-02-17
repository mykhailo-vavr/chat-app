import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import useToggle from './useToggle';

export default <T = Record<string, unknown>>(url: string, initialConfig?: AxiosRequestConfig) => {
  const [loading, toggle] = useToggle();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useCallback(
    async (config?: AxiosRequestConfig) => {
      try {
        toggle();
        const res = await axios.get<T>(url, config);
        setData(res.data);
      } catch (e) {
        setError(error);
      } finally {
        toggle();
      }
    },
    [error, toggle, url],
  );

  useEffect(() => {
    fetchData(initialConfig).catch(() => {});
  }, []);

  return { data, error, loading, refetch: fetchData };
};
