import { Chat } from '@/components/containers';
import { MainLayout } from '@/components/layouts';
import { NextPageWithLayout } from '@/types';
import { webRoutes } from '@/settings';
import { useRouter } from 'next/router';
import { useRedirect, useUser } from '@/hooks';

const Page: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();
  const redirect = useRedirect();
  const user = useUser();

  if (!isReady) {
    return null;
  }

  const id = Number(query.id);

  if (!id || id < 0 || Math.floor(id) !== id) {
    redirect(webRoutes.public.ERROR_404);
  }

  if (user.id === id) {
    redirect(webRoutes.private.PROFILE);
  }

  return <Chat userId={id} />;
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
