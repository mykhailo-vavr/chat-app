import { apiRoutes } from '@/settings';
import { TokenService } from '@/services';
import { getApiData, postApiData } from '../utils';
import {
  AuthCredentials,
  BaseResponse,
  RefreshTokenRequest,
  SignInRequest,
  SignUpRequest,
  VerificationCredentials,
  VerifyCodeRequest,
} from '../models';

export class AuthenticateService {
  static async signUp(requestBody: SignUpRequest) {
    return postApiData<BaseResponse>(apiRoutes.SIGN_UP, requestBody);
  }

  static async signIn(requestBody: SignInRequest) {
    return postApiData<VerificationCredentials>(apiRoutes.SIGN_IN, requestBody);
  }

  static async verifyCode(requestBody: VerifyCodeRequest) {
    return postApiData<AuthCredentials>(apiRoutes.VERIFY_CODE, requestBody, {
      headers: { Authorization: TokenService.get.verification() },
    });
  }

  static async refreshToken(params: RefreshTokenRequest) {
    return getApiData<Pick<AuthCredentials, 'accessToken'>>(apiRoutes.REFRESH_TOKEN, { params });
  }
}
