import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      // Pass the postSlug or a returnUrl as a query parameter
      // and ensure your Auth0 settings allow dynamic returnTo URLs
    });
  },
  async callback(req, res) {
    await handleCallback(req, res, {
      redirectTo: '/', // Change this to dynamically use the URL stored before redirection
    });
  },
  // ... other handlers if needed
});
