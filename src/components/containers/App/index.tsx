import { App as AppProvider } from 'antd';
import { UserProvider } from '@/context/user/provider';
import { GlobalStyle, lightTheme } from '@/styles';
import { ThemeProvider } from 'styled-components';
import { AppFC } from './types';

const App: AppFC = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <UserProvider>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
