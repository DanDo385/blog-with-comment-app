import type { NextApiRequest, NextApiResponse } from "next";
import CommentModel from "../models/Comment"; // Adjust the path as necessary
import getUser from "./getUser";
import clearUrl from "./clearUrl";
import connectDB from "./db"; // Ensure this is correctly imported

export default async function createComments(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB(); // Ensure DB connection

  const url = clearUrl(req.headers.referer);
  const { text } = req.body;
  const { authorization } = req.headers;

  if (!text || !authorization) {
    return res.status(400).json({ message: "Missing parameter." });
  }

  try {
    // Verify user token
    const user = await getUser(authorization);
    if (!user) return res.status(400).json({ message: "Need authorization." });

    const { name, picture, sub, email } = user;

    // Create and save the comment
    const comment = await CommentModel.create({
      url,
      text,
      user: { name, picture, sub, email },
      createdAt: new Date(),
    });

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unexpected error occurred." });
  }
}