import { Request, Response } from 'express'
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt'
import { generateEmailToken, verifyEmailToken } from '../utils/jwt';
import { sendPasswordEmail } from '../utils/mail';

// [admin] get userList
const userList = async (req: Request, res: Response) => {
  if (req.body.userRole !== 1) {
    return res.status(403).send({ message: 'forbidden user'});
  }
  const userList = await User.find({ select: ['id', 'name', 'phone', 'email', 'image', 'loginType', 'authorityId', 'createdAt', 'updatedAt']});
  
  res.status(200).send({ userList, message: 'ok'});
}

// get login user profile
const userInfo = async (req: Request, res: Response) => {
  if (req.body.userRole > 3) {
    return res.status(403).send({ message: 'forbidden user'});
  }
  
  const loginUserInfo = await User.findOne({ email: req.body.authUser }, { select: ['id', 'name', 'phone', 'email', 'image', 'loginType', 'authorityId', 'createdAt', 'updatedAt']});
  
  res.status(200).send({ userInfo: loginUserInfo, message: 'ok'});
}

// [admin] get user profile by id
const userInfoById = async (req: Request, res: Response) => {
  if (req.body.userRole !== 1) {
    return res.status(403).send({ message: 'forbidden user'});
  }

  const loginUserInfo = await User.findOne(req.params.id, { select: ['id', 'name', 'phone', 'email', 'image', 'loginType', 'authorityId', 'createdAt', 'updatedAt']});

  if (!loginUserInfo) {
    return res.status(404).send({ message: 'user not found'});
  }
  
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
  delete updateInfo.refreshToken;
  res.status(200).send({ userInfo: updateInfo, message: 'update success' })
}

// const editImage = async (req: Request, res: Response) => {
//   if (req.body.userRole > 3 ) {
//     return res.status(403).send({ message: 'forbidden user'})
//   }

//   if (!req.file) {
//     return res.status(422).send('fail');
//   }

//   const file: any = req.file;
//   await User.update({ id: req.body.authUserId}, { image: file.location })

//   res.status(200).send({ message: 'upload success'})
// }

const resetPassword = async (req: Request, res: Response) => {
  let password = req.body.password;
  let code: any = req.query.code;
  if (!req.query.code || !password) {
    return res.status(422).send({ message: 'cannot find password or code'});
  }
  
  const user: any = verifyEmailToken(code);
  if (!user) {
    return res.status(401).send({ message: 'unauthorized email code'});
  }

  password = await bcrypt.hash(password, 10);
  await User.update({ id: user.id }, { password });

  res.status(201).send({ message: 'set new password'});
}

const passwordEmail = async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await User.findOne({ email }, { select: ['id']});
  if (!user) {
    return res.status(200).send({ message: 'send email' })
  }

  const code = generateEmailToken({ email, id: user.id });
  // 메일 전송
  sendPasswordEmail(email, code);

  res.status(200).send({ message: 'send email' })
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
  resetPassword,
  passwordEmail,
  // editImage,
  deleteUser
};