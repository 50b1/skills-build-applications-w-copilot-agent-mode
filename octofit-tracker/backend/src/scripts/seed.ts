import { connectDatabase, disconnectDatabase } from '../config/database.js';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

const users = [
  { name: 'Maya Chen', email: 'maya.chen@example.edu', role: 'student', team: 'Blue Blazers', points: 420 },
  { name: 'Jordan Ellis', email: 'jordan.ellis@example.edu', role: 'student', team: 'Red Rockets', points: 385 },
  { name: 'Avery Patel', email: 'avery.patel@example.edu', role: 'student', team: 'Green Giants', points: 360 },
  { name: 'Coach Rivera', email: 'coach.rivera@example.edu', role: 'coach', team: 'Blue Blazers', points: 0 },
] as const;

const teams = [
  { name: 'Blue Blazers', mascot: 'Lightning Bolt', memberCount: 12, totalPoints: 2140 },
  { name: 'Red Rockets', mascot: 'Comet', memberCount: 11, totalPoints: 1985 },
  { name: 'Green Giants', mascot: 'Oak Tree', memberCount: 10, totalPoints: 1870 },
] as const;

const activities = [
  { user: 'Maya Chen', activityType: 'Running', durationMinutes: 35, points: 80, completedAt: new Date('2026-06-20T15:30:00Z') },
  { user: 'Jordan Ellis', activityType: 'Cycling', durationMinutes: 45, points: 90, completedAt: new Date('2026-06-21T16:00:00Z') },
  { user: 'Avery Patel', activityType: 'Yoga', durationMinutes: 30, points: 55, completedAt: new Date('2026-06-22T14:15:00Z') },
  { user: 'Maya Chen', activityType: 'Strength Training', durationMinutes: 40, points: 95, completedAt: new Date('2026-06-23T17:20:00Z') },
] as const;

const leaderboard = [
  { rank: 1, name: 'Maya Chen', team: 'Blue Blazers', points: 420 },
  { rank: 2, name: 'Jordan Ellis', team: 'Red Rockets', points: 385 },
  { rank: 3, name: 'Avery Patel', team: 'Green Giants', points: 360 },
] as const;

const workouts = [
  {
    title: 'Cardio Kickstart',
    focusArea: 'Endurance',
    difficulty: 'beginner',
    durationMinutes: 25,
    exercises: ['Jumping jacks', 'Jogging intervals', 'High knees'],
  },
  {
    title: 'Core Builder',
    focusArea: 'Core strength',
    difficulty: 'intermediate',
    durationMinutes: 30,
    exercises: ['Plank holds', 'Bicycle crunches', 'Mountain climbers'],
  },
  {
    title: 'Athlete Circuit',
    focusArea: 'Full body',
    difficulty: 'advanced',
    durationMinutes: 45,
    exercises: ['Burpees', 'Push-ups', 'Squat jumps', 'Lunges'],
  },
] as const;

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  await Promise.all([
    UserModel.insertMany(users),
    TeamModel.insertMany(teams),
    ActivityModel.insertMany(activities),
    LeaderboardModel.insertMany(leaderboard),
    WorkoutModel.insertMany(workouts),
  ]);

  console.log('Inserted users, teams, activities, leaderboard entries, and workouts.');
}

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });