import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { generateloginToken, verifyAccessToken, verifyRefreshToken } from '../utils/jwt';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let accessToken = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

  // 로그인하지않은 사용자
  if (!accessToken) return next();

  const tokenInfo: any = verifyAccessToken(accessToken);
  if (!tokenInfo) return res.status(401).send('invalid token');

  const result = await User.findOne({ email: tokenInfo.email }, { select: ['id', 'email']});
  if (!result) return res.status(401).send('cannot find token owner');
  
  req.body.authUser = result.email;
  req.body.authUserId = result.id;
  
  next();
}

