import { FC } from '@/types';

export type ChatProps = {
  userId: number;
};

export type ChatFC = FC<ChatProps>;

export type ChatForm = {
  message: string;
};
