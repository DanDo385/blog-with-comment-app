//component/CommentForm.tsx
import { useState } from 'react';

const CommentForm = ({ onSubmit }: { onSubmit: (comment: string) => void }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit && comment.trim()) {
      onSubmit(comment);
      setComment(''); // Clear the input after submitting
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full p-2 text-slate-900 bg-green-300 rounded"
        placeholder="What do you think?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      ></textarea>
      <button
        type="submit"
        className="px-4 py-2 bg-green-300 text-slate-900 rounded hover:bg-green-400"
      >
        Send
      </button>
    </form>
  );
};

export default CommentForm;
