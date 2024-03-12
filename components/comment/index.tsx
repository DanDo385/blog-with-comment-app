// components/comment/index.tsx
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CommentForm from './form'; // Ensure this import path matches your file structure
import CommentList from './list'; // Ensure this import path matches your file structure
import type { Comment } from '../../interfaces';

type CommentSectionProps = {
  postSlug: string;
};

const CommentSection: React.FC<CommentSectionProps> = ({ postSlug }) => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/comments?postSlug=${postSlug}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postSlug]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
      return;
    }
    
    setLoading(true);
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

      if (response.ok) {
        const newComment = await response.json();
        setComments(prevComments => [...prevComments, newComment]);
        setText('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  // Example onDelete function implementation
  const onDelete = async (commentId: string) => {
    // Implementation depends on your API and Auth setup
    console.log(`Delete comment with ID: ${commentId}`);
    // After deletion logic, you could refresh the comments list similar to the fetchComments logic
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <CommentForm text={text} setText={setText} onSubmit={onSubmit} />
          <CommentList comments={comments} onDelete={onDelete} />
        </>
      ) : (
        <button onClick={() => loginWithRedirect({ appState: { returnTo: window.location.pathname } })}>
          Log In to Comment
        </button>
      )}
      {loading && <p>Loading comments...</p>}
    </div>
  );
};

export default CommentSection;
