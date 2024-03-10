// pages/api/comment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import createComment from "../../lib/createComment";
import fetchComment from "../../lib/fetchComment";
import deleteComment from "../../lib/deleteComment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return createComment(req, res);
    case "GET":
      return fetchComment(req, res);
    case "DELETE":
      return deleteComment(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
