import { RequestConfig, RequestError } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useFetch = <T = Record<string, unknown>>(url: string, initialConfig?: RequestConfig) => {
  const [loading, toggle] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<RequestError | null>(null);

  const fetchData = useCallback(
    async (config?: RequestConfig) => {
      try {
        toggle(true);
        const res = await axios.get<T>(url, config);
        setData(res.data);
      } catch (e) {
        setError(error);
      } finally {
        toggle(false);
      }
    },
    [error, url],
  );

  useEffect(() => {
    fetchData(initialConfig).catch(() => {});
  }, []);

  return { data, error, loading, refetch: fetchData };
};
