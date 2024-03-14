// pages/api/auth/[...auth0].ts
import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { redirectTo: '/posts' });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
