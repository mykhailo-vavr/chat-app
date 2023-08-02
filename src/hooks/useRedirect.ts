import { useCallback } from 'react';
import { WebRoute } from '@/types';
import { useRouter } from './useRouter';

export const useRedirect = () => {
  const { push } = useRouter();

  return useCallback(
    (webRoute?: WebRoute) => {
      push(webRoute || '/').catch(console.error);
    },
    [push],
  );
};
