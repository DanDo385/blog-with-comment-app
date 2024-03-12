// components/comment/form.tsx
import React from 'react';

interface CommentFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  text: string;
  setText: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, text, setText }) => {
  return (
    <form onSubmit={onSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
};

export default CommentForm;
