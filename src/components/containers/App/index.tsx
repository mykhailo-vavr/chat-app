import { App as AppProvider } from 'antd';
import { UserProvider } from '@/context/user';
import { GlobalStyle, lightTheme } from '@/styles';
import { ThemeProvider } from 'styled-components';
import { SocketProvider } from '@/context/socket';
import { AppFC } from './types';
import ProtectedRoutes from '../ProtectedRoutes';

const App: AppFC = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <UserProvider>
      <SocketProvider>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <AppProvider>
            <ProtectedRoutes>{getLayout(<Component {...pageProps} />)}</ProtectedRoutes>
          </AppProvider>
        </ThemeProvider>
      </SocketProvider>
    </UserProvider>
  );
};

export default App;
