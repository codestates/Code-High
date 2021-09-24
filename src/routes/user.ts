import { Router } from 'express';
import * as userController from '../controllers/user';
import * as postController from '../controllers/post';
import { checkAuth } from '../middleware/checkAuth'
import { checkRole } from '../middleware/checkRole';
const userRouter = Router();

userRouter.use('/', checkAuth);
userRouter.use('/', checkRole);

userRouter.get('/info', userController.userInfo);
userRouter.get('/post', postController.getUserPostList);
userRouter.get('/:id', userController.userInfoById);
userRouter.delete('/post');
userRouter.get('/', userController.userList);
userRouter.patch('/', userController.editUser);
userRouter.delete('/', userController.deleteUser);


export default userRouter;