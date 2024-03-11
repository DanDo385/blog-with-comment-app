// lib/models/Comment.ts
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  postSlug: { type: String, required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true }, // Ensure you have consent to store and display emails
    picture: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
