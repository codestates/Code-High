import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export const checkRole = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.authUser;

  const userInfo = await User.findOne({ select: ["authorityId"], where : { email }});
  if (!userInfo) {
    return res.status(401).send({ message: 'invalid user'});
  }

  req.body.userRole = userInfo.authorityId;
  next();
}