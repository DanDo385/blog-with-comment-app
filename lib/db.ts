// lib.db.ts
import mongoose from 'mongoose';

// Ensure the MongoDB URI is defined
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<mongoose.Connection> {
  if (cached.conn) {
    // Return existing database connection
    return cached.conn;
  }

  if (!cached.promise) {
    // Connect to the database
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  // Await the connection promise
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
