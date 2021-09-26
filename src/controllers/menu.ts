import { Request, Response } from 'express'
import { Menu } from '../entity/Menu';

const menuList = (req: Request, res: Response) => {
  res.status(200).send({ message: 'menu'})
}

export { menuList }