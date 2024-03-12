// components/comment/form.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface CommentFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  text: string;
  setText: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, text, setText }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!isAuthenticated}
      />
      <button type="submit" disabled={!isAuthenticated}>
        Submit
      </button>
    </form>
  );
};

export default CommentForm;

