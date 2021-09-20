import {
  SIGNIN_USER,
  SIGNOUT_USER,
  GET_USER_INFO,
  DELETE_USER_INFO,
} from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;
const serverUrl = 'https://localhost:4000';

//로그인
export async function signinUser(data) {
  axios
    .post(
      `${serverUrl}/login`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((res) => {
      const { id, email, image, name, phone, authority } = res.data.userInfo;
      return {
        type: SIGNIN_USER,
        payload: {
          message: res.data.message,
          accessToken: res.data.accessToken,
          id: id,
          email: email,
          image: image,
          name: name,
          phone: phone,
          authority: authority,
        },
      };
    });
}

//로그아웃
export async function signoutUser(data) {
  axios
    .get(`${serverUrl}/logout`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      return {
        type: SIGNOUT_USER,
        payload: res.data.message,
      };
    });
}

//유저 정보 가지고 오기
export async function getUserInfo(data) {
  axios
    .post(`${serverUrl}/user/info`, {
      headers: { Authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      const { id, email, image, name, phone, authorityId, loginType } =
        res.data.userInfo;
      return {
        type: GET_USER_INFO,
        payload: {
          message: res.data.message,
          id: id,
          email: email,
          image: image,
          name: name,
          phone: phone,
          authorityId: authorityId,
          loginType: loginType,
        },
      };
    });
}

//회원탈퇴
export async function deleteUserInfo(data) {
  axios
    .delete(`${serverUrl}/user`, {
      headers: { Authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      return {
        type: DELETE_USER_INFO,
        payload: res.data.message,
      };
    });
}
