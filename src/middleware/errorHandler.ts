import { NextFunction, Request, Response } from 'express';
import { regenerateToken } from '../controllers/auth';
import { userInfo } from '../controllers/user';
import { User } from '../entity/User';
import { checkToRegenerate } from '../utils/jwt';

export const errorHandler = async (err, req: Request, res: Response, next: NextFunction) => {
  if (err === 'InvalidToken') {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).send('invalid Token');
    }

    const verified = await checkToRegenerate(refreshToken);
    if (!verified) {
      return res.status(401).send('invalid refresh token');
    }

    await User.update(verified.id, { refreshToken: verified.refreshToken });

    res.clearCookie('refreshToken');
    res.cookie('refreshToken', verified.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 14, // 14d
      httpOnly: true,
      secure: true,
    },)
    
    return res.status(401).send({ accessToken: verified.accessToken });
  }
  if (err === 'NotFoundTokenUser') {
    return res.status(401).send('cannot find Token user');
  }

  return res.status(400).send(err.message)
}