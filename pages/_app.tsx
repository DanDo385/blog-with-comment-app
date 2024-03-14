// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { Auth0Provider } from '@auth0/auth0-react';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? ''}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? ''}
      redirectUri={typeof window !== 'undefined' ? `${window.location.origin}/api/auth/callback` : undefined}
      onRedirectCallback={onRedirectCallback}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>C2DeFi Zone</title>
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </Auth0Provider>
  );
};

export default MyApp;
