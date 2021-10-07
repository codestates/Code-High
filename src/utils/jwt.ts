import { sign, verify } from 'jsonwebtoken';
import { User } from '../entity/User';
import 'dotenv/config';

const generateAccessToken = (data: object) => {
  return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1d' });
}

const generateRefreshToken = (data: object) => {
  return sign(data, process.env.REFRESH_SECRET, { expiresIn: '14d' });
}

const generateEmailToken = (data: object) => {
  return sign(data, process.env.EMAIL_SECRET, { expiresIn: '5m' });
}

const generateloginToken = async (userInfo: User) => {
  const { id, email } = userInfo;
  const accessToken: string = generateAccessToken({ id, email });
  const refreshToken: string = generateRefreshToken({ email });

  await User.update(id, { refreshToken });

  return { accessToken, refreshToken }
}

const verifyAccessToken = (accessToken: string) => {
  try {
    return verify(accessToken, process.env.ACCESS_SECRET);
  } catch (err) {
    return null;
  }
}

const verifyRefreshToken = (refreshToken: string) => {
  try {
    return verify(refreshToken, process.env.REFRESH_SECRET);
  } catch (err) {
    return null;
  }
}

const verifyEmailToken = (emailToken: string) => {
  try {
    return verify(emailToken, process.env.EMAIL_SECRET);
  } catch (err) {
    return null;
  }
}

const checkToRegenerate = async (token: string) => {
  const tokenInfo: any = verifyRefreshToken(token);
  if (!tokenInfo) {
    return null;
  }

  const result = await User.findOne({ email: tokenInfo.email })
  if (!result || result.refreshToken !== token) {
    return null;
  }

  // 토큰 발급
  const { id, email } = result;
  const accessToken = generateAccessToken({ id, email });
  const refreshToken = generateRefreshToken({ email });
  return { id, accessToken, refreshToken };
}

export { 
  generateAccessToken, 
  generateRefreshToken, 
  generateEmailToken,
  generateloginToken,
  verifyAccessToken, 
  verifyRefreshToken, 
  verifyEmailToken,
  checkToRegenerate
};