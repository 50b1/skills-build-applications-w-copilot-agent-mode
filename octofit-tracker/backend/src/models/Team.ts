import mongoose, { Schema } from 'mongoose';

export interface Team {
  name: string;
  mascot: string;
  memberCount: number;
  totalPoints: number;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    memberCount: { type: Number, required: true },
    totalPoints: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const TeamModel = mongoose.models.Team ?? mongoose.model<Team>('Team', teamSchema);