// pages/posts/[slug].tsx
import React from 'react';
import { useRouter } from 'next/router';
import CommentForm from '../../components/CommentForm';
import { useAuth0 } from '@auth0/auth0-react';


const PostPage = () => {
  const { isAuthenticated } = useAuth0();
  const router = useRouter();
  const { slug } = router.query;

  const handleSubmitComment = (comment: string) => {
    // Logic to handle the submission of the comment
    console.log(comment);
    // Here you would typically send the comment to your backend server
  };

  return (
    <div>
      {/* ... other post content */}
      {isAuthenticated && <CommentForm onSubmit={handleSubmitComment} />}
    </div>
  );
};

export default PostPage;