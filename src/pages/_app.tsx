import { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux';
import 'flowbite';

import '@/styles/globals.css';

import { store } from '@/store/store'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
export default MyApp;
