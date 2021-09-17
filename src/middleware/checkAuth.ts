import { NextFunction, Request, Response } from 'express';
import { checkEmailUserInfo, checkGithubUserInfo, checkGoogleUserInfo, checkKakaoUserInfo } from './checkUserInfo';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];
  const loginType = req.headers['login-type'];
  
  if (!authorization) {
    console.log('authorization header not found');
    return res.status(404).send({ message: 'authorization header not found'});
  }

  const accessToken = authorization.split(' ')[1];

  if (loginType === 'email') {
    req.body.authUser = await checkEmailUserInfo(accessToken);
  } else if (loginType === 'google') {
    req.body.authUser = await checkGoogleUserInfo(accessToken);
  } else if (loginType === 'kakao') {
    req.body.authUser = await checkKakaoUserInfo(accessToken);
  } else if (loginType === 'github') {
    req.body.authUser = await checkGithubUserInfo(accessToken);
  } else {
    return res.status(404).send({ message: 'invalid login-type'});
  }

  if (!req.body.authUser) {
    return res.status(401).send({ message: 'unauthorized user'});
  }
  
  next();
}

