// lib/models/Comment.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IBlogPost extends Document {
  title: string;
  content: string;
  authorId: mongoose.Schema.Types.ObjectId; // Assuming you have an User model
  comments: mongoose.Schema.Types.ObjectId[]; // Array of comment references
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

const BlogPost = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;


