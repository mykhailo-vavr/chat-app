import { Landing } from '@/components/containers';
import { MainLayout } from '@/components/layouts';
import { NextPageWithLayout } from '@/types';

const Page: NextPageWithLayout = () => <Landing />;

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
