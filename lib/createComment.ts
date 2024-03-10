//lib/createComment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Comment from "./models/Comment";
import connectDB from "./db";

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { text, url, userId } = req.body;

  if (!text || !url || !userId) {
    return res.status(400).json({ message: "Missing comment data" });
  }

  try {
    const comment = await Comment.create({
      text,
      url,
      userId
    });

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Could not create the comment", error });
  }
}
