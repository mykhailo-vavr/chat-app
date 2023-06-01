import { useUserContext } from '@/context/user';
import { TokenService } from '@/services';
import { useMemo } from 'react';

export const useUser = () => {
  const { state } = useUserContext();

  return useMemo(
    () => ({
      ...state,
      isAuthenticated: !!Object.values(state).length && TokenService.get.access() && TokenService.get.refresh(),
    }),
    [state],
  );
};
