// pages/api/comment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/db'; // Adjust the path as necessary
import { getSession } from '@auth0/nextjs-auth0';
import Comment from '../../lib/models/Comment'; // Adjust the path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const session = getSession(req, res);
      if (!session || !session.user) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const { text, postSlug } = req.body;
      if (!text || !postSlug) {
        return res.status(400).json({ message: 'Missing text or postSlug' });
      }

      // Assuming Comment is a Mongoose model
      const comment = await Comment.create({
        text,
        postSlug,
        user: session.user.sub, // Use user ID from the session
      });

      return res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const { postSlug } = req.query;
      if (typeof postSlug !== 'string') {
        return res.status(400).json({ message: 'Invalid postSlug' });
      }

      const comments = await Comment.find({ postSlug }).sort({ createdAt: -1 });
      return res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end('Method Not Allowed');
  }
}


