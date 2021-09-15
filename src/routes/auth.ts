import { Router } from 'express';
import * as authController from '../controllers/authController'
const authRouter = Router();

authRouter.post('/email', authController.emailLogin);
authRouter.post('/kakao', authController.kakaoLogin);
authRouter.post('/google', authController.googleLogin);
authRouter.post('/github', authController.githubLogin);
authRouter.post('/signup', authController.signUpEmail);
authRouter.get('/logout', authController.logout);
authRouter.post('/checkemail', authController.checkEmailCode);

export default authRouter;