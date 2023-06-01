import { apiRoutes } from '@/settings';
import { postApiData } from '../utils';
import { BaseResponse, SendMessageRequest } from '../models';

export class MessageService {
  static async sendMessage(requestBody: SendMessageRequest) {
    return postApiData<BaseResponse>(apiRoutes.MESSAGES, requestBody);
  }
}
