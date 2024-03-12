// components/comment/index.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CommentForm from './form'; // Ensure this is correctly imported
import CommentList from './list'; // Ensure this is correctly imported
import type { Comment } from '../../interfaces'; // Ensure this type is correctly defined

type Props = {
  postSlug: string;
};

const CommentSection: React.FC<Props> = ({ postSlug }) => {
  const {
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
    isLoading,
    error,
  } = useAuth0();
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = useCallback(async () => {
    const response = await fetch(`/api/comments?postSlug=${postSlug}`);
    const data = await response.json();
    setComments(data);
  }, [postSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      // Trigger login if not authenticated
      loginWithRedirect();
      return;
    }

    if (!text.trim()) return;

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, postSlug }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setText('');
      const newComment: Comment = await response.json();
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Adjust this to handle actual deletion logic
  const onDelete = async (commentId: string) => {
    // Placeholder for deletion logic
  };

  // Handle Auth0 loading state and errors
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <CommentForm text={text} setText={setText} onSubmit={onSubmit} />
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In to Comment</button>
      )}
      <CommentList comments={comments} onDelete={onDelete} />
    </div>
  );
};

export default CommentSection;
