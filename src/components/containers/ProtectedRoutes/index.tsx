import { ReactElement, useMemo } from 'react';
import { useRouter, useUser } from '@/hooks';
import { webRoutes } from '@/settings';
import { FCWithChildren } from '@/types';

const ProtectedRoutes: FCWithChildren = ({ children }) => {
  const { isAuthenticated } = useUser();
  const { push, pathname } = useRouter();

  const isPublicRoute = useMemo(() => Object.values(webRoutes.public).includes(pathname), [pathname]);

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
