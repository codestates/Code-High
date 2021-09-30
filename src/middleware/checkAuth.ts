import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { checkEmailUser, checkGithubUser, checkGoogleUser, checkKakaoUser } from './checkUserInfo';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : 'undefined';
  // const loginType = req.headers['login_type'];
  
  if (accessToken === 'undefined') {
    return next();
    // console.log('authorization header not found');
    // return res.status(404).send({ message: 'authorization header not found'});
  }


  // if (loginType === 'email') {
  //   req.body.authUser = await checkEmailUser(accessToken);
  // } else if (loginType === 'google') {
  //   req.body.authUser = await checkGoogleUser(accessToken);
  // } else if (loginType === 'kakao') {
  //   req.body.authUser = await checkKakaoUser(accessToken);
  // } else if (loginType === 'github') {
  //   req.body.authUser = await checkGithubUser(accessToken);
  // } else {
  //   return res.status(404).send({ message: 'invalid login-type'});
  // }

  req.body.authUser = await checkEmailUser(accessToken);

  if (!req.body.authUser) {
    return res.status(401).send({ message: 'unauthorized user'});
  }

  const user = await User.findOne({ email: req.body.authUser });
  if (!user) {
    return res.status(404).send({ message: 'user not found' });
  }
  req.body.authUserId = user.id;
  
  next();
}

