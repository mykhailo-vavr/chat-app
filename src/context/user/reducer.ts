import { UserAction, UserActionsEnum, UserHandlersType, UserState } from './types';

const handlers: UserHandlersType = {
  [UserActionsEnum.SET_USER]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [UserActionsEnum.CLEAR_USER]: () => ({}),
  [UserActionsEnum.DEFAULT]: (state) => state,
};

export const reducer = (state: UserState, action: UserAction) => {
  const handle = handlers[action.type] || handlers[UserActionsEnum.DEFAULT];
  return handle(state, action);
};
