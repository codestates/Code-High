import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';

export const generateAccessToken = (data: object) => {
  return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1h'});
}

export const generateRefreshToken = (data: object) => {
  return sign(data, process.env.REFRESH_SECRET, { expiresIn: '3d'});
}

export const verifyAccessToken = (accessToken: string) => {
  try {
    return verify(accessToken, process.env.ACCESS_SECRET);
  } catch (err) {
    return null;
  }
}

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return verify(refreshToken, process.env.REFRESH_SECRET);
  } catch (err) {
    return null;
  }
}