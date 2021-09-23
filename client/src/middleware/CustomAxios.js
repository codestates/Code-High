import axios from 'axios';

const END_POINT = 'https://api.codehigh.club';

export const customAxios = axios.create({
  baseURL: END_POINT,
  withCredentials: true,
  credential: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});