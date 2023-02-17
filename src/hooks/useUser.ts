import { useUserContext } from '@/context/user/useUserContext';
import { useMemo } from 'react';

export default () => {
  const { state } = useUserContext();

  return useMemo(() => ({ ...state, isAuthenticated: !!(state ?? true) }), [state]);
};
