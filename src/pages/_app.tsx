import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import { useState } from 'react'
import { Provider } from 'react-redux';

import '@/styles/globals.css';

import { store } from '@/store/store'

function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session, }>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Provider store={store}>
        <Component {...pageProps} />
        <Analytics />
      </Provider>
    </SessionContextProvider>
  );
}
export default MyApp;
