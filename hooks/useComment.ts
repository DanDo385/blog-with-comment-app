// hooks/useComments.ts
import { useState } from 'react';
import useSWR from 'swr';
import { useAuth0 } from '@auth0/auth0-react';
import type { Comment } from '../interfaces';

const fetcher = (url: string) => fetch(url).then((res) => res.ok ? res.json() : Promise.reject(res));

export default function useComments(postSlug: string) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [text, setText] = useState('');
  
  const { data: comments, mutate } = useSWR<Comment[]>(`/api/comments?postSlug=${postSlug}`, fetcher);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return; // Don't submit empty comments

    try {
      const token = await getAccessTokenSilently();
      await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, postSlug }),
      });

      setText(''); // Clear the textarea
      await mutate(); // Trigger a revalidation to update the list of comments
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Implement the onDelete function if needed.

  return {
    text,
    setText,
    comments: comments || [],
    onSubmit,
    isAuthenticated
  };
}
