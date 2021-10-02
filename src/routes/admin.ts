import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard'
import { checkAuth } from '../middleware/checkAuth'
import { checkRole } from '../middleware/checkRole';
const adminRouter = Router();

adminRouter.use('/', checkAuth);
adminRouter.use('/', checkRole);

adminRouter.get('/stat/date', dashboardController.dateStat);
adminRouter.get('/stat/month', dashboardController.monthStat);

export default adminRouter;