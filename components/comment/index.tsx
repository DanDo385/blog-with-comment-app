// components/comment/index.ts
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CommentForm from './form'; // Make sure this component exists and is correctly implemented
import CommentList from './list'; // Make sure this component exists and is correctly implemented
import type { Comment } from '../../interfaces';

type CommentSectionProps = {
  postSlug: string;
};

const CommentSection: React.FC<CommentSectionProps> = ({ postSlug }) => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Fetch comments for the current post
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?postSlug=${postSlug}`);
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postSlug]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    
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
        setComments([...comments, newComment]);
        setText('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <CommentForm text={text} setText={setText} onSubmit={onSubmit} />
          <CommentList comments={comments} />
        </>
      ) : (
        <button onClick={() => loginWithRedirect({ redirectUri: window.location.origin + window.location.pathname })}>
          Log In to Comment
        </button>
      )}
    </div>
  );
};

export default CommentSection;
