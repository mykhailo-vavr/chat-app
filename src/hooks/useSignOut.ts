import { useUserContext } from '@/context/user';
import { TokenService } from '@/services';
import { webRoutes } from '@/settings';
import { useCallback } from 'react';
import { useRedirect } from './useRedirect';

export const useSignOut = () => {
  const redirect = useRedirect();
  const { clearUserState } = useUserContext();

  return useCallback(() => {
    const asyncWrapper = async () => {
      TokenService.remove.access();
      TokenService.remove.refresh();

      clearUserState();

      setTimeout(() => {
        redirect(webRoutes.public.LANDING_PAGE);
      });
    };

    asyncWrapper().catch(console.error);
  }, [clearUserState, redirect]);
};
