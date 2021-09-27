import { Request, Response } from 'express'
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt'

// [admin] get userList
const userList = async (req: Request, res: Response) => {
  if (req.body.userRole !== 1) {
    return res.status(403).send({ message: 'forbidden user'});
  }
  const userList = await User.find();
  
  res.status(200).send({ userList, message: 'ok'});
}

// get login user profile
const userInfo = async (req: Request, res: Response) => {
  
  const loginUserInfo = await User.findOne({ where: { email: req.body.authUser } });
  
  delete loginUserInfo.password;
  delete loginUserInfo.verified;
  res.status(200).send({ userInfo: loginUserInfo, message: 'ok'});
}

// [admin] get user profile by id
const userInfoById = async (req: Request, res: Response) => {
  if (req.body.userRole !== 1) {
    return res.status(403).send({ message: 'forbidden user'});
  }

  const loginUserInfo = await User.findOne({ where: { id: req.params.id } });
  if (!loginUserInfo) {
    return res.status(404).send({ message: 'user not found'});
  }
  delete loginUserInfo.password;
  delete loginUserInfo.verified;
  res.status(200).send({ userInfo: loginUserInfo, message: 'ok'});
}

// update login user profile
const editUser = async (req: Request, res: Response) => {
  if (req.body.userRole > 3 ) {
    return res.status(403).send({ message: 'forbidden user'})
  }
  
  const loginType = req.headers['login-type'];
  const { name, image, phone } = req.body;
  let password = req.body.password;
  
  if (loginType === 'email' && password !== undefined) {
    password = await bcrypt.hash(password, 10);
  }
  
  const updateInfo = await User.findOne(req.body.authUserId);
  User.merge(updateInfo, { name, password, image, phone });
  await User.save(updateInfo);
  
  delete updateInfo.password;
  delete updateInfo.verified;
  res.status(200).send({ userInfo: updateInfo, message: 'update success' })
}

// delete login user account
const deleteUser = async (req: Request, res: Response) => {
  if (req.body.userRole > 3 ) {
    return res.status(403).send({ message: 'forbidden user'})
  }

  const userInfo = await User.findOne(req.body.authUserId);
  await User.remove(userInfo);
  res.status(200).send({ message: 'delete account successfully'});
}

export {
  userList,
  userInfo,
  userInfoById,
  editUser,
  deleteUser
};