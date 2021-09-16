import { Router } from 'express';
import { userInfo } from '../controllers/user';
import { checkAuth } from '../middleware/auth'
const userRouter = Router();

userRouter.use('/', checkAuth);

userRouter.get('/info', userInfo);
userRouter.patch('/');
userRouter.delete('/');
userRouter.get('/info');
userRouter.get('/post');
userRouter.post('/post');
userRouter.delete('/post');


export default userRouter;