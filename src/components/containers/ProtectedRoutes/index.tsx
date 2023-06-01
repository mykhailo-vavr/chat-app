import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useRouter, useSignOut, useUser } from '@/hooks';
import { webRoutes } from '@/settings';
import { FCWithChildren } from '@/types';
import { TokenService } from '@/services';
import { AuthenticateService } from '@/api';

const ProtectedRoutes: FCWithChildren = ({ children }) => {
  const { isAuthenticated } = useUser();
  const { push, pathname } = useRouter();
  const signOut = useSignOut();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accessToken = TokenService.get.refresh();
    const refreshToken = TokenService.get.refresh();

    const asyncWrapper = async () => {
      // To sign out when clear localStorage
      if ((!accessToken || !refreshToken) && isAuthenticated) {
        signOut();
        return;
      }

      if (!isAuthenticated) {
        return;
      }

      if (TokenService.expired.access() && TokenService.expired.refresh()) {
        signOut();
        return;
      }

      if (TokenService.expired.access() && refreshToken) {
        setLoading(true);
        const { data } = await AuthenticateService.refreshToken({ refreshToken });

        if (data?.accessToken) {
          TokenService.set.access(data.accessToken);
        }
      }
    };

    asyncWrapper()
      .catch((e) => {
        console.error(e);
        signOut();
      })
      .finally(() => setLoading(false));
  });

  const isPublicRoute = useMemo(() => Object.values(webRoutes.public).includes(pathname), [pathname]);

  if (loading) {
    return null;
  }

  if (isPublicRoute) {
    return children as ReactElement;
  }

  if (!isAuthenticated) {
    push(webRoutes.public.ERROR_404).catch(console.error);
    return null;
  }

  return children as ReactElement;
};

export default ProtectedRoutes;
