import { useUserContext } from '@/context/user';
import { TokenService } from '@/services';
import { useMemo } from 'react';

export const useUser = () => {
  const { state } = useUserContext();

  return useMemo(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.id && TokenService.get.access() && TokenService.get.refresh()),
    }),
    [state],
  );
};
