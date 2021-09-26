import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export const checkRole = async (req: Request, res: Response, next: NextFunction) => {

  if (!req.body.authUserId) {
    req.body.userRole = 4;
  } else {
    const id = req.body.authUserId;
    const userInfo = await User.findOne({ select: ["authorityId"], where : { id }});
    if (!userInfo) {
      return res.status(401).send({ message: 'invalid user'});
    }
    req.body.userRole = userInfo.authorityId;
  }
  next();
}