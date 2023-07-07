import { User } from '@/api/models';
import { ReactNode } from 'react';

export type UserState = Omit<User, 'password'>;

export type UserContextType = {
  state: UserState;
  setUserState: () => Promise<void>;
  clearUserState: () => void;
};

export enum UserActionsEnum {
  SET_USER = 'setUser',
  CLEAR_USER = 'clearUser',
  DEFAULT = 'default',
}

export type UserAction = {
  payload?: UserState;
  type: UserActionsEnum;
};

export type UserHandlersType = {
  [UserActionsEnum.SET_USER]: (state: UserState, action: UserAction) => UserState;
  [UserActionsEnum.CLEAR_USER]: () => UserState;
  [UserActionsEnum.DEFAULT]: (state: UserState) => UserState;
};

export type UserProviderProps = {
  children: ReactNode;
};
