import { useUserContext } from '@/context/user';
import { TokenService } from '@/services';
import { webRoutes } from '@/settings';
import { useCallback } from 'react';
import { useRouter } from './useRouter';

export const useSignOut = () => {
  const { push } = useRouter();
  const { clearUserState } = useUserContext();

  return useCallback(() => {
    const asyncWrapper = async () => {
      TokenService.remove.access();
      TokenService.remove.refresh();

      clearUserState();

      setTimeout(() => {
        push(webRoutes.public.LANDING_PAGE).catch(console.error);
      });
    };

    asyncWrapper().catch(console.error);
  }, [clearUserState, push]);
};
