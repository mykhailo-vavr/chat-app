import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useRedirect, useRouter, useSignOut, useUser } from '@/hooks';
import { webRoutes } from '@/settings';
import { FCWithChildren, PublicWebRoute } from '@/types';
import { TokenService } from '@/services';
import { AuthenticateService } from '@/api';

const ProtectedRoutes: FCWithChildren = ({ children }) => {
  const { isAuthenticated } = useUser();
  const { pathname } = useRouter();
  const redirect = useRedirect();
  const signOut = useSignOut();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accessToken = TokenService.get.access();
    const refreshToken = TokenService.get.refresh();

    const asyncWrapper = async () => {
      if (!isAuthenticated) {
        return;
      }

      // To sign out when clear localStorage
      if (!accessToken || !refreshToken) {
        signOut();
        return;
      }

      const isAccessTokenExpired = TokenService.expired.access();
      const isRefreshTokenExpired = TokenService.expired.refresh();

      if (isAccessTokenExpired && isRefreshTokenExpired) {
        signOut();
        return;
      }

      if (isAccessTokenExpired && !isRefreshTokenExpired) {
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

  const isPublicRoute = useMemo(() => Object.values(webRoutes.public).includes(pathname as PublicWebRoute), [pathname]);

  if (loading) {
    return null;
  }

  if (isPublicRoute) {
    return children as ReactElement;
  }

  if (!isAuthenticated) {
    redirect(webRoutes.public.ERROR_404);
  }

  return children as ReactElement;
};

export default ProtectedRoutes;
