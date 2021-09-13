import { Router } from 'express';
import * as signController from '../controllers/signController'
const signRouter = Router();

signRouter.get('/email', signController.emailLogin);
signRouter.post('/kakao', signController.kakaoLogin);
signRouter.post('/google', signController.googleLogin);
signRouter.post('/github', signController.githubLogin);
signRouter.post('/signup', signController.signUpEmail);
signRouter.get('/logout', signController.logout);
signRouter.post('/checkemail?', signController.checkEmail);

export default signRouter;