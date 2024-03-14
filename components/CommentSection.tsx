import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm'; // Ensure this import path matches your project structure
import CommentList from './CommentList';
import { Comment } from '../../interfaces'; // Adjust import path as necessary

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  // Example useEffect hook to fetch initial comments - adjust with your API call
  useEffect(() => {
    const fetchComments = async () => {
      // Placeholder for fetching comments from your API
      const response = await fetch('/api/comments');
      const data = await response.json();
      setComments(data);
    };
    fetchComments().catch(console.error);
  }, []);

  // Function responsible for adding a new comment
  const addComment = async (commentText: string) => {
    // Placeholder for submitting the comment to your API
    // Adjust with your actual API call
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: commentText }),
    });
    if (response.ok) {
      const newComment = await response.json();
      // Update local state with the new comment
      setComments((prevComments) => [...prevComments, newComment]);
    } else {
      // Handle errors, e.g., show an error message
      console.error('Failed to add comment');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <CommentForm onSubmit={addComment} />
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;
