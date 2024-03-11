//lib/deleteComment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Comment from "./models/Comment";
import connectDB from "./db";

export default async function deleteComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { commentId } = req.query;

  if (!commentId) {
    return res.status(400).json({ message: "Comment ID must be provided" });
  }

  try {
    const result = await Comment.deleteOne({ _id: commentId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Could not delete the comment", error });
  }
}
export const deleteCommentHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await deleteComment(req, res);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};