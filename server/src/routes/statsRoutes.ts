import {Router} from 'express';
import statsController from '../controllers/statsController';
import asyncHandler from '../utils/asyncHandler';

const statsRoutes = Router();

statsRoutes.get(
  '/monthly',
  asyncHandler(statsController.getMonthlyStats)
);

export default statsRoutes;