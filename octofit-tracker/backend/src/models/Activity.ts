import mongoose, { Schema } from 'mongoose';

export interface Activity {
  user: string;
  activityType: string;
  durationMinutes: number;
  points: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    user: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    points: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const ActivityModel = mongoose.models.Activity ?? mongoose.model<Activity>('Activity', activitySchema);