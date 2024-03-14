import { useEffect, useState } from 'react';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments from the database
    // Replace this with your actual API call or database query
    const fetchComments = async () => {
      try {
        const response = await fetch('your-api-endpoint');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      <h2>Comment List</h2>
      {comments.map((comment: any) => (
        <div key={comment.id}>
          <p>User: {comment.user}</p>
          <p>Comment: {comment.content}</p>
          <p>Posted at: {comment.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;