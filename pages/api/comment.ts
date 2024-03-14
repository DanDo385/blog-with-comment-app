// pages/api/comment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db';
import { getSession } from '@auth0/nextjs-auth0';
import { verifyToken } from '../../../lib/auth'; // Implement or use Auth0's JWT verification
import Comment from '../../../lib/models/Comment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const token = authorization.split(' ')[1];
    const decoded = verifyToken(token); // Verify the token
    if (!decoded) {
      return res.status(403).json({ message: 'Token is invalid' });
    }

    // Extract comment data from request body
    const { text, postSlug } = req.body;
    if (!text || !postSlug) {
      return res.status(400).json({ message: 'Missing data' });
    }

    // Create and save the comment
    const comment = new Comment({ text, postSlug, user: decoded.sub }); // Adjust according to your user model
    await comment.save();

    return res.status(201).json(comment);
  } else if (req.method === 'GET') {
    const { postSlug } = req.query;
    const comments = await Comment.find({ postSlug }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method Not Allowed');
  }
}


