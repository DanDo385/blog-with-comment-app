// lib/models/Comment.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IComment extends Document {
  text: string;
  userId: mongoose.Types.ObjectId;
  url: string;
}

const CommentSchema: Schema = new Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
}, { timestamps: true });

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
