import { Landing } from '@/components/containers';
import { MainLayout } from '@/components/layouts';
import { useRouter, useUser } from '@/hooks';
import { webRoutes } from '@/settings';
import { NextPageWithLayout } from '@/types';

const Page: NextPageWithLayout = () => {
  const { isAuthenticated } = useUser();
  const { push } = useRouter();

  if (isAuthenticated) {
    push(webRoutes.private.PROFILE).catch(console.error);
  }

  return <Landing />;
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
