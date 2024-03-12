import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CommentForm from './form'; // Ensure this is correctly imported
import CommentList from './list'; // Ensure this is correctly imported
import type { Comment } from '../../interfaces';

const CommentSection: React.FC<{ postSlug: string }> = ({ postSlug }) => {
  // Now useAuth0 and useState are correctly called inside the component
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/comments?postSlug=${postSlug}`);
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, [postSlug]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!text.trim()) return;
    
    const token = await getAccessTokenSilently();
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, postSlug }),
    });

    if (response.ok) {
      setText('');
      const newComment: Comment = await response.json();
      setComments(prevComments => [...prevComments, newComment]);
    }
  };

  // Implement actual deletion logic here if needed
  const onDelete = async (commentId: string) => {
    // Placeholder for deletion logic
  };

  return (
    <div>
      {isAuthenticated ? (
        <CommentForm text={text} setText={setText} onSubmit={onSubmit} />
      ) : (
        <button onClick={() => getAccessTokenSilently()}>Log In to Comment</button>
      )}
      <CommentList comments={comments} onDelete={onDelete} />
    </div>
  );
};

export default CommentSection;
