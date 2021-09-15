import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { sendEmail } from './mail';
import * as bcrypt from 'bcrypt';
import { generateEmailToken, verifyEmailToken } from './jwt';

export const emailLogin = () => {
  
}

export const kakaoLogin = () => {

}

export const googleLogin = () => {

}

export const githubLogin = () => {

}

export const logout = () => {

}

export const signUpEmail = async (req: Request, res: Response) => {
  const { email, password, name, phone } = req.body;
  
  // 필수 정보 확인
  if (!email || !password || !name) {
    return res.status(422).send({ message: 'Unprocessable Ent' });
  }

  try {
    // 중복 이메일 확인
    const userEmail = await User.findOne({ where: { email } })
    if (userEmail) {
        return res.status(409).send({ message: 'Email Conflict' });
    }
    const hashPwd = await bcrypt.hash(password, 10);
    const token = generateEmailToken({
      email,
      password: hashPwd,
      name,
      phone,
    });
    sendEmail(email, name, token);
    return res.status(200).send('send email');

  } catch (err) {
    return res.send(err);
  }
  
}

// 이메일 인증 링크 접속 시.
export const checkEmailCode = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const user: any = await verifyEmailToken(code);
    if (!user) {
      return res.status(401).send({ message: 'unauthorized code'});
    }
   
    // 중복으로 눌렀을 경우
    const email = user.email;
    const userEmail = await User.findOne({ where: { email } })
    if (userEmail) {
        return res.status(409).send({ message: 'Email Conflict'});
    }
    
    const userRepository = await getRepository(User);
    const userInfo = await userRepository.create({  
      loginType: 'email',
      ...user,
    })
    const result = await userRepository.save(userInfo);
  
    return res.status(201).send({ message: 'signup success' });

  } catch (err) {
    return res.status(400).send(err);
  }
}