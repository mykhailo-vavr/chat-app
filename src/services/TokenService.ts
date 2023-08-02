import { TokensTypeEnum } from '@/types';
import { decode, getItem, removeItem, setItem } from '@/utils';

export class TokenService {
  static get get() {
    return {
      verification: () => getItem(TokensTypeEnum.VERIFICATION_TOKEN),
      access: () => getItem(TokensTypeEnum.ACCESS_TOKEN),
      refresh: () => getItem(TokensTypeEnum.REFRESH_TOKEN),
    };
  }

  static get set() {
    return {
      verification: (token: string) => setItem(TokensTypeEnum.VERIFICATION_TOKEN, token),
      access: (token: string) => setItem(TokensTypeEnum.ACCESS_TOKEN, token),
      refresh: (token: string) => setItem(TokensTypeEnum.REFRESH_TOKEN, token),
    };
  }

  static get remove() {
    return {
      verification: () => removeItem(TokensTypeEnum.VERIFICATION_TOKEN),
      access: () => removeItem(TokensTypeEnum.ACCESS_TOKEN),
      refresh: () => removeItem(TokensTypeEnum.REFRESH_TOKEN),
    };
  }

  static get decode() {
    return {
      verification: () => {
        const result = decode<{ user: { id: number; email: string } }>(this.get.verification() || '');
        return result;
      },
      access: () => {
        const result = decode<{ user: { id: number } }>(this.get.access() || '');
        return result;
      },
      refresh: () => {
        const result = decode<{ user: { id: number } }>(this.get.refresh() || '');
        return result;
      },
    };
  }

  static get expired() {
    return {
      access: () => {
        const accessTokenData = this.decode.access();

        if (!accessTokenData) {
          throw new Error('There is no access token');
        }

        return Number(accessTokenData?.exp) * 1000 < Date.now();
      },
      refresh: () => {
        const refreshTokenData = this.decode.refresh();

        if (!refreshTokenData) {
          throw new Error('There is no refresh token');
        }

        return Number(refreshTokenData?.exp) * 1000 < Date.now();
      },
    };
  }
}
