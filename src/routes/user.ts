import { Router } from 'express';
import * as userController from '../controllers/user';
import * as postController from '../controllers/post';
import * as dashboardController from '../controllers/dashboard';
import { checkAuth } from '../middleware/checkAuth'
import { checkRole } from '../middleware/checkRole';
// import { upload } from '../utils/multer';

const userRouter = Router();

// userRouter.post('/image', upload.single('image'), checkAuth, checkRole, userController.editImage)

userRouter.use('/', checkAuth);
userRouter.use('/', checkRole);

userRouter.get('/info', userController.userInfo);
userRouter.get('/post', postController.getUserPostList);
userRouter.get('/active/post', dashboardController.userPostStat);
userRouter.get('/active', dashboardController.userActiveStat);
userRouter.get('/:id', userController.userInfoById);
userRouter.get('/', userController.userList);
userRouter.patch('/password', userController.resetPassword);
userRouter.patch('/', userController.editUser);
userRouter.delete('/', userController.deleteUser);


export default userRouter;