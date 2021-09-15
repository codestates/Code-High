import { Router } from 'express';
import { checkAuth } from '../middleware/auth'
const userRouter = Router();

userRouter.use('/', checkAuth);

userRouter.get('/');
userRouter.patch('/');
userRouter.delete('/');

export default userRouter;