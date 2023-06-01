import { Chat } from '@/components/containers';
import { MainLayout } from '@/components/layouts';
import { NextPageWithLayout } from '@/types';
import { webRoutes } from '@/settings';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks';
import { User } from '@/api';

const Page: NextPageWithLayout = () => {
  const { query, push, isReady } = useRouter();
  const user = useUser() as User;

  if (!isReady) {
    return null;
  }

  const id = Number(query.id);

  if (!id || id < 0 || Math.floor(id) !== id) {
    push(webRoutes.public.ERROR_404).catch(console.error);
    return null;
  }

  if (user.id === id) {
    push(webRoutes.private.PROFILE).catch(console.error);
    return null;
  }

  return <Chat userId={id} />;
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
