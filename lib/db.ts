// db.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected.');
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('Connected to MongoDB.');
};

export default connectDB;
