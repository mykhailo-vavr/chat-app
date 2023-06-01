import { FC, useEffect, useMemo, useReducer, useState } from 'react';
import { TokenService } from '@/services';
import { UserService } from '@/api/services';
import { UserContext } from './context';
import { UserActionsEnum, UserContextType, UserProviderProps } from './types';
import { reducer } from './reducer';

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const [loading, setLoading] = useState(true);

  const contextValue: UserContextType = useMemo(
    () => ({
      state,
      async setUserState() {
        const accessToken = TokenService.decode.access();

        if (!accessToken?.user?.id) {
          return;
        }

        const { data } = await UserService.getUser(accessToken.user.id);

        if (!data) {
          return;
        }

        dispatch({ type: UserActionsEnum.SET_USER, payload: data });
      },
      clearUserState() {
        dispatch({ type: UserActionsEnum.CLEAR_USER });
      },
    }),
    [state],
  );

  useEffect(() => {
    setLoading(true);

    const asyncWrapper = async () => {
      try {
        await contextValue.setUserState();
      } catch (error) {
        console.error(error);
      }
    };

    asyncWrapper()
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return null;
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
