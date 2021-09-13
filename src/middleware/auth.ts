import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../controllers/jwt';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];
    
  if (!authorization) {
    console.log('authorization header not found');
    return res.status(404).send({ message: '로그인해주세요'});
  }

  const accessToken = authorization.split('')[1];
  try {
    const decoded = await verifyAccessToken(accessToken);
    // 권한 확인
    req.body.authUser = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: 'unauthorized token' })
  }
}
