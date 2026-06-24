import mongoose, { Schema } from 'mongoose';

export interface LeaderboardEntry {
  rank: number;
  name: string;
  team: string;
  points: number;
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    rank: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true }
);

export const LeaderboardModel = mongoose.models.Leaderboard ?? mongoose.model<LeaderboardEntry>('Leaderboard', leaderboardSchema);