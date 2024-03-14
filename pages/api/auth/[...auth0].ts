// pages/api/auth/[...auth0].ts
import { AppRouteHandlerFnContext, CallbackOptions, handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { OptionsProvider } from '@auth0/nextjs-auth0/dist/handlers/router-helpers';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export default handleAuth({
  async callback(req: NextApiRequest | NextRequest | CallbackOptions | OptionsProvider<CallbackOptions> | undefined, res: NextApiResponse | AppRouteHandlerFnContext) {
    try {
      await handleCallback(req, res, { redirectTo: '/posts' });
    } catch (error) {
      const e = error as Error & { status?: number };
      (res as NextApiResponse).status(e.status || 500).end(e.message);
    }
  }
});
