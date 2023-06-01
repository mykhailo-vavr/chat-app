import { Message } from './Message';

export type GetMessageRequest = Pick<Message, 'senderId' | 'recipientId'>;
