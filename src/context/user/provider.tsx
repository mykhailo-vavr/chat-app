import { FC, useEffect, useMemo, useReducer, useState } from 'react';
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
        const user = null;
        dispatch({ type: UserActionsEnum.SET_USER, payload: user });
      },
      clearUserState() {
        dispatch({ type: UserActionsEnum.CLEAR_USER });
      },
    }),
    [],
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
