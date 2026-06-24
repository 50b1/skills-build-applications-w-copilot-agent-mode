import mongoose from 'mongoose';

export const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

mongoose.set('bufferCommands', false);

export async function connectDatabase() {
  return mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
}

export async function disconnectDatabase() {
  return mongoose.disconnect();
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}