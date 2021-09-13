import { Router } from 'express';
const userRouter = Router();

userRouter.get('/user');
userRouter.patch('/user');
userRouter.delete('/user');

export default userRouter;