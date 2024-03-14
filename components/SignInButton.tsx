// components/SignInButton.tsx
import { useAuth0 } from '@auth0/auth0-react';

const SignInButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-slate-900">Welcome, {user?.name}!</span>
        <button
          className="px-4 py-2 bg-red-300 text-slate-900 rounded hover:bg-red-400"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    return (
      <button
        className="px-4 py-2 bg-green-300 text-slate-900 rounded hover:bg-green-400"
        onClick={() => loginWithRedirect()}
      >
        Sign In to View & Comment on Posts
      </button>
    );
  }
};

export default SignInButton;
