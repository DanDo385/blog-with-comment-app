// pages/api/comment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/db';
import { getSession } from '@auth0/nextjs-auth0';
import { Comment } from '../../models/Comment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    const session = await getSession(req, res);
    if (!session || !session.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { text, postSlug } = req.body;
    if (!text || !postSlug) {
      return res.status(400).json({ message: 'Missing text or postSlug' });
    }

    const comment = await Comment.create({
      text,
      postSlug,
      user: session.user.sub,
    });

    return res.status(201).json(comment);
  } else if (req.method === 'GET') {
    const { postSlug } = req.query;
    if (typeof postSlug !== 'string') {
      return res.status(400).json({ message: 'Invalid postSlug' });
    }

    const comments = await Comment.find({ postSlug }).sort({ createdAt: -1 });
    return res.status(200).json(comments);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end('Method Not Allowed');
  }
}

