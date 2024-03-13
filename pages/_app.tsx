// pages/_app.tsx
import '../styles/globals.css';
import { useRouter } from 'next/router';
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/header";
import { Auth0Provider } from "@auth0/auth0-react";

// This assumes you want to redirect to the homepage after login
const onRedirectCallback = (appState: { returnTo: any; }) => {
  // Use Next.js's router to do a client-side redirect (if needed)
  const router = useRouter();
  router.push(appState?.returnTo || '/');
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      redirectUri={typeof window !== 'undefined' ? window.location.origin : undefined}
      onRedirectCallback={(appState, user) => onRedirectCallback(appState as { returnTo: any; })}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Learn how to become a blockchain developer and engage in discussions on the future of finance."
        />
        <title>C2DeFi</title>
      </Head>

      <Header />

      <main className="py-14">
        <Component {...pageProps} />
      </main>
    </Auth0Provider>
  );
}
