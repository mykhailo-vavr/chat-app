import { Message } from './Message';

export type SendMessageRequest = Pick<Message, 'recipientId' | 'senderId' | 'message'>;
