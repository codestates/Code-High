import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (err === 'InvalidToken') {
    return res.status(401).send('invalid Token');
  }
  if (err === 'NotFoundTokenUser') {
    return res.status(401).send('cannot find Token user');
  }

  return res.status(400).send(err.message)
}