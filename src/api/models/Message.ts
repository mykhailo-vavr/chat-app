export type Message = {
  id: number;
  senderId: number;
  recipientId: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
};
