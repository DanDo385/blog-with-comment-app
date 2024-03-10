// components/comment.form.tsx
import { useAuth0 } from "@auth0/auth0-react";

type CommentFormProps = {
  text: string;
  setText: Function;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

import { JSX } from "react";

export default function CommentForm({
  text,
  setText,
  onSubmit,
}: CommentFormProps) {
  const { isAuthenticated, logout, loginWithPopup } = useAuth0();

  return (
    <>
    <form onSubmit={onSubmit}>
      <textarea
        className="flex w-full max-h-40 p-3 rounded resize-y bg-slate-900 text-green-300 placeholder-slate-700"
        rows={2}
        placeholder={
          isAuthenticated
            ? `What are your thoughts?`
            : "Please login to leave a comment"
        }
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={!isAuthenticated}
      />

      <div className="flex items-center mt-4">
        {isAuthenticated ? (
          <div className="flex items-center space-x-6">
            <button className="py-2 px-4 rounded bg-green-400 text-white disabled:opacity-40 hover:bg-green-600">
              Send
            </button>
            <button
              className="text-green-300"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="py-2 px-4 rounded bg-green-400 text-white disabled:opacity-40 hover:bg-green-600"
            onClick={() => loginWithPopup()}
          >
            Log In
          </button>
        )}
      </div>
    </form>
    </>
  );
};
