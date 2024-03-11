// lib/models/Comment.ts
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    email: String,
  },
  postSlug: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
