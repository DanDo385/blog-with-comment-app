// components/comment/index.tsx
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CommentForm from './form';
import CommentList from './list';
import useComments from '../../hooks/useComments'; // Assuming this hook is implemented correctly

const CommentSection = ({ postSlug }: { postSlug: string }) => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [text, setText] = useState('');
  const { comments, mutate } = useComments(postSlug); // Fetch comments for this postSlug

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    const token = await getAccessTokenSilently();
    await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, postSlug }),
    });

    setText('');
    mutate(); // Re-fetch comments
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <CommentForm text={text} setText={setText} onSubmit={onSubmit} />
          <CommentList comments={comments} />
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>
          Log In to Comment
        </button>
      )}
    </div>
  );
};

export default CommentSection;
