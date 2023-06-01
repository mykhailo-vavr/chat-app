import { decode, getItem, removeItem, setItem } from '@/utils';
import { JwtPayload } from 'jsonwebtoken';

export class TokenService {
  static get get() {
    return {
      verification: () => getItem('verificationToken'),
      access: () => getItem('accessToken'),
      refresh: () => getItem('refreshToken'),
    };
  }

  static get set() {
    return {
      verification: (token: string) => setItem('verificationToken', token),
      access: (token: string) => setItem('accessToken', token),
      refresh: (token: string) => setItem('refreshToken', token),
    };
  }

  static get remove() {
    return {
      verification: () => removeItem('verificationToken'),
      access: () => removeItem('accessToken'),
      refresh: () => removeItem('refreshToken'),
    };
  }

  static get decode() {
    return {
      verification: () => {
        const result = decode(this.get.verification() || '') as
          | null
          | (JwtPayload & { user: { id: number; email: string } });

        return result;
      },
      access: () => {
        const result = decode(this.get.access() || '') as null | (JwtPayload & { user: { id: number } });

        return result;
      },
      refresh: () => {
        const result = decode(this.get.refresh() || '') as null | (JwtPayload & { user: { id: number } });

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
