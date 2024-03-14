// components/SignInButton.tsx
import { useAuth0 } from '@auth0/auth0-react';

const SignInButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({ redirectUri: `${window.location.origin}/posts` });
  };

  return (
    <button
      className="px-4 py-2 bg-green-300 text-slate-900 rounded hover:bg-green-400"
      onClick={handleLogin}
    >
      Sign In to View & Comment on Posts
    </button>
  );
};

export default SignInButton;
