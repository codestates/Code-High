import {
  SIGNIN_USER,
  SIGNOUT_USER,
  GET_USER_INFO,
  DELETE_USER_INFO,
  GET_MENU,
} from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

//-------------------------------1.로그인-------------------------------
export function signinUser(loginInfo) {
  const { email, password } = loginInfo;

  const response = axios
    .post(
      `${serverUrl}/auth/email`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((res) => {
      const { id, email, image, name, phone, authorityId } = res.data.userInfo;
      console.log('axios', res.data);
      return {
        message: res.data.message,
        accessToken: res.data.accessToken,
        id: id,
        email: email,
        image: image,
        name: name,
        phone: phone,
        authority: authorityId,
      };
    });
  console.log('response', response);

  return {
    type: SIGNIN_USER,
    payload: response,
  };
}

//-------------------------------2.로그아웃-------------------------------
export async function signoutUser() {
  const response = axios
    .get(`${serverUrl}/auth/logout`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      res.data.message
    });

  return {
    type: SIGNOUT_USER,
    payload: response,
  };
}

//-------------------------------3.유저 정보 가져오기-------------------------------
export async function getUserInfo(accessToken) {
  axios
    .get(`${serverUrl}/user/info`, {
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

//-------------------------------4.회원탈퇴-------------------------------
export async function deleteUserInfo(accessToken) {
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

//------------------------------5.메뉴 가져오기-------------------------------
export async function getMenu(accessToken) {
  axios
    .get(`${serverUrl}/menu`, {
      headers: { Authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      return {
        type: GET_MENU,
        payload: res.data.menuList,
      };
    });
}
