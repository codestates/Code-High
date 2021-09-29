import axios from 'axios';
import { access } from 'fs';
import { verifyAccessToken } from '../utils/jwt';
import { User } from '../entity/User';

const checkEmailUser = async (accessToken: string) => {
  const tokenInfo: any = await verifyAccessToken(accessToken);
  
  if (!tokenInfo) {
    return null;
  }

  const result = await User.findOne({ where: { email: tokenInfo.email }});
  if (!result) {
    return null;
  }
  
  return tokenInfo.email;
}

const checkGithubUser = async (accessToken: string) => {
  try {
    const url = 'https://api.github.com/user'
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const githubEmail = `${result.data.id}@github.com`;
    return githubEmail;

  } catch (err) {
    console.log(err);
    return null;
  }
}

const checkGoogleUser = async (accessToken: string) => {
  try {
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const googleEmail = `${result.data.sub}@gmail.com`;
    return googleEmail;

  } catch (err) {
    console.log(err);
    return null;
  }
}

const checkKakaoUser = async (accessToken: string) => {
  try {
    const url = '';
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const kakaoEmail = `${result.data.id}@kakao.com`;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { 
  checkEmailUser,
  checkGithubUser,
  checkGoogleUser,
  checkKakaoUser
 };