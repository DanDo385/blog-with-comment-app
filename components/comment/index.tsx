// components/comment/index.tsx
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CommentForm from './form'; // Assuming this exists and is correctly implemented
import CommentList from './list'; // Assuming this exists and is setup for displaying comments
import { Comment } from 'interfaces';

const CommentSection = ({ postSlug }: { postSlug: string }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the current post
    const fetchComments = async () => {
      const res = await fetch(`/api/comments?postSlug=${postSlug}`);
      const data = await res.json();
      setComments(data);
    };

    fetchComments();
  }, [postSlug]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const token = await getAccessTokenSilently();
    await fetch('/api/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, postSlug }),
    });

    setText('');
    // Refresh comments
    await setComments([]);
  };

  return (
    <div>
      {isAuthenticated && (
        <CommentForm text={text} setText={setText} onSubmit={onSubmit} />
      )}
      <CommentList comments={comments} onDelete={function (comment: Comment): Promise<void> {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default CommentSection;
