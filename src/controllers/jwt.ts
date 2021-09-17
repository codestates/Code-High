import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';

const generateAccessToken = (data: object) => {
  return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1h' });
}

const generateRefreshToken = (data: object) => {
  return sign(data, process.env.REFRESH_SECRET, { expiresIn: '3d' });
}

const generateEmailToken = (data: object) => {
  return sign(data, process.env.EMAIL_SECRET, { expiresIn: '5m' });
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

export { 
  generateAccessToken, 
  generateRefreshToken, 
  generateEmailToken,
  verifyAccessToken, 
  verifyRefreshToken, 
  verifyEmailToken
};