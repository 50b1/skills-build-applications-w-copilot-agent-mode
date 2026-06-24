import { Router } from 'express';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

const routes = [
  { fullPath: '/api/users/', routerPath: '/users/', model: UserModel },
  { fullPath: '/api/teams/', routerPath: '/teams/', model: TeamModel },
  { fullPath: '/api/activities/', routerPath: '/activities/', model: ActivityModel },
  { fullPath: '/api/leaderboard/', routerPath: '/leaderboard/', model: LeaderboardModel },
  { fullPath: '/api/workouts/', routerPath: '/workouts/', model: WorkoutModel },
] as const;

type RouteConfig = (typeof routes)[number];

export const apiRouter = Router();

function getCollectionItems(route: RouteConfig) {
  return route.model.find({}).lean();
}

for (const route of routes) {
  apiRouter.get(route.routerPath, async (_request, response, next) => {
    try {
      const items = await getCollectionItems(route);
      response.json(items);
    } catch (error) {
      next(error);
    }
  });
}