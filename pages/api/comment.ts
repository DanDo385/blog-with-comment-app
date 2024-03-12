// pages/api/comments.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/db';
import Comment from '../../lib/models/Comment';



async function getComments(_req: NextApiRequest, res: NextApiResponse, postSlug: string) {
  await connectDB();
  const comments = await Comment.find({ postSlug }).sort({ createdAt: -1 });
  res.status(200).json(comments);
}

interface CustomNextApiRequest extends NextApiRequest {
  user: string; // Replace 'string' with the correct type for the 'user' property
}

async function postComment(req: CustomNextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { text, postSlug } = req.body;
  const comment = await Comment.create({ text, postSlug, user: req.user }); // Ensure req.user is set correctly from Auth0
  res.status(201).json(comment);
}

async function deleteComment(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { commentId } = req.query;
  const result = await Comment.deleteOne({ _id: commentId });
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  res.status(200).json({ message: 'Comment deleted successfully' });
}

export default async function commentsHandler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { postSlug } = req.query;
      return getComments(req, res, postSlug as string);
    case 'POST':
      return postComment(req as CustomNextApiRequest, res); // Cast req as CustomNextApiRequest
    case 'DELETE':
      return deleteComment(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
