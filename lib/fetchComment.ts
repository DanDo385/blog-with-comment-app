//lib/fetchComment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Comment from "./models/Comment";
import connectDB from "./db";

export default async function fetchComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ message: "URL must be provided" });
  }

  try {
    const comments = await Comment.find({ url }).sort({ createdAt: -1 });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch comments", error });
  }
}
