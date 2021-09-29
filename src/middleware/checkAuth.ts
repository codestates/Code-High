import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { generateloginToken, verifyRefreshToken } from '../utils/jwt';
import { checkEmailUser, checkGithubUser, checkGoogleUser, checkKakaoUser, checkToRegenerate } from './checkUserInfo';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let accessToken = req.headers['authorization'].split(' ')[1];

  // access token 있음
    // access token 유효성 검사

    // 유효하다
      // 그대로 진행
    // 유효하지 않다
      // refresh 있는지 확인하러 가기
  // access token 없음
    // refresh token 있음
      // refresh 유효성 검사 -> 만료된건지? DB에 존재하는지?
      // 유효성 검사 실패
        // 401 에러 
      // 유효성 검사 성공
        // access refrest 토큰 재발급
    // refresh token 없음
      // 401 에러 

  if (accessToken !== '') {

  }



  
  // // access refresh 둘다 없으면
  // if (!authorization && !req.body.refreshToken) {
  //   return next();
  // }

  // req.body.authUser = await checkEmailUser(accessToken);


  // // access token 유효하지 않음
  // if (!req.body.authUser) {
  //   // refreshtoken 없으면
  //   if (!req.cookies.refreshToken) {
  //     return res.status(401).send({ message: 'unauthorized user'});
  //   }
  //   // 있으면
  //   // refresh token 유효성 확인
  //   const token = await checkToRegenerate(req.cookies.refreshToken);
  //   // refresh token 만료
  //   if (!token) {
  //     return res.status(401).send({ message: 'unauthorized user'});
  //   }
  //   // 재발급 받고난 뒤
  //   accessToken = token.accessToken;
  //   req.cookies.refreshToken = token.refreshToken;
  //   req.body.authUser = token.email;
  //   console.log(req.cookies.refreshToken, req.body.authUser);
  // }
  
  // access token 유효
  const user = await User.findOne({ email: req.body.authUser });
  if (!user) {
    return res.status(404).send({ message: 'user not found' });
  }
  req.body.authUserId = user.id;
  
  next();
}

