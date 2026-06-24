import mongoose, { Schema } from 'mongoose';

export interface User {
  name: string;
  email: string;
  role: 'student' | 'coach';
  team: string;
  points: number;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['student', 'coach'], required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User ?? mongoose.model<User>('User', userSchema);