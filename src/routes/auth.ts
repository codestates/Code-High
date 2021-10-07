import { Router } from 'express';
import * as authController from '../controllers/auth';
import * as userController from '../controllers/user';
import { checkAuth } from '../middleware/checkAuth';
import { checkRole } from '../middleware/checkRole';
const authRouter = Router();

authRouter.post('/email', authController.emailLogin);
authRouter.post('/kakao', authController.kakaoLogin);
authRouter.post('/google', authController.googleLogin);
authRouter.post('/github', authController.githubLogin);
authRouter.post('/signup', authController.signUpEmail);
authRouter.get('/logout', checkAuth, checkRole, authController.logout);
authRouter.post('/checkemail', authController.checkEmailCode);
authRouter.post('/refresh', authController.regenerateToken)
authRouter.post('/password', userController.passwordEmail);

export default authRouter;