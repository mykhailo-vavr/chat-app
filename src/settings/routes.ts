export const webRoutes = {
  public: {
    LANDING_PAGE: '/',
    ERROR_404: '/404',
    SIGN_UP: '/sign-up',
    SIGN_IN: '/sign-in',
    VERIFY_CODE: '/verify-code',
  },
  private: {
    USERS: '/users',
    PROFILE: '/profile',
  },
} as const;

export const apiRoutes = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  VERIFY_CODE: '/auth/verify-code',
  REFRESH_TOKEN: '/auth/refresh-token',
  USERS: '/users',
  MESSAGES: '/messages',
} as const;
