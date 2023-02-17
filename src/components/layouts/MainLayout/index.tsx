import { FCWithChildren } from '@/types';

const MainLayout: FCWithChildren = ({ children }) => (
  <>
    <h1>It is a main layout</h1>
    {children}
  </>
);

export default MainLayout;
