import { useForm, useRedirect, useUser } from '@/hooks';
import { MessageService, useGetMessages, useGetUserByPk } from '@/api';
import { webRoutes } from '@/settings';
import { Button, Input, Link } from '@/components/UI/atoms';
import { formatDate } from '@/utils';
import { useCallback, useEffect, useRef } from 'react';
import { Form } from '@/components/UI/organisms';
import { FormItem } from '@/components/UI/molecules';
import { useSocketContext } from '@/context/socket';
import { ChatFC, ChatForm } from './types';
import { MessagesWrapper, Wrapper, SendMessageWrapper } from './styles';

const Chat: ChatFC = ({ userId }) => {
  const redirect = useRedirect();
  const { id } = useUser();
  const { data: user, loading: loadingUser } = useGetUserByPk(userId);
  const { data: messages, refetch, loading: loadingMessages } = useGetMessages({ recipientId: userId, senderId: id });
  const [form] = useForm<ChatForm>();
  const messagesWrapperRef = useRef<HTMLUListElement>(null);

  const a = useSocketContext();
  console.info(a);

  useEffect(() => {
    if (!messagesWrapperRef.current) {
      return;
    }

    messagesWrapperRef.current.scrollTop = messagesWrapperRef.current.scrollHeight;
  }, [messages]);

  const onClick = useCallback(() => {
    const { message } = form.getFieldsValue();

    if (!message) {
      return;
    }

    const asyncWrapper = async () => {
      await MessageService.sendMessage({ message, senderId: id, recipientId: userId });
      await refetch({ params: { recipientId: userId, senderId: id } });
      form.setFieldsValue({ message: '' });
    };

    asyncWrapper().catch(console.error);
  }, [form, id, refetch, userId]);

  if (!user && !loadingUser) {
    redirect(webRoutes.public.ERROR_404);
    return null;
  }

  return (
    <Wrapper title={`Chat with ${user?.firstName || ''} ${user?.lastName || ''}`}>
      <Link href={webRoutes.private.USERS}>⬅ All users</Link>
      <MessagesWrapper ref={messagesWrapperRef}>
        {messages?.length ? (
          messages.map(({ createdAt, message, senderId }) => (
            <li key={createdAt.toString()} className={`message-box ${senderId === id ? 'right' : 'left'}`}>
              <p className="text">{message}</p>
              <p className="date">{formatDate(createdAt, 'hoursMinutes')}</p>
            </li>
          ))
        ) : (
          <div className="empty">There are no messages...</div>
        )}
      </MessagesWrapper>
      <Form form={form} disabled={loadingUser || loadingMessages}>
        <SendMessageWrapper>
          <FormItem name="message" className="input">
            <Input placeholder="Message" maxLength={200} />
          </FormItem>
          <Button onClick={onClick}>Send</Button>
        </SendMessageWrapper>
      </Form>
    </Wrapper>
  );
};

export default Chat;
