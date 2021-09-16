import { Router } from 'express';
import { checkAuth } from '../middleware/auth'
const userRouter = Router();

userRouter.use('/', checkAuth);

userRouter.get('/');
userRouter.patch('/');
userRouter.delete('/');
userRouter.get('/info');
userRouter.get('/post');
userRouter.post('/post');
userRouter.delete('/post');


export default userRouter;