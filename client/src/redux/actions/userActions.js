import {
  SIGNIN_USER,
  SIGNOUT_USER,
  GET_USER_INFO,
  MODIFY_USER_INFO,
  DELETE_USER_INFO,
  GET_MENU,
} from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

//-------------------------------1.로그인(완료)-------------------------------
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
      const { id, email, image, name, phone, authorityId, loginType } = res.data.userInfo;
      return {
        message: res.data.message,
        accessToken: res.data.accessToken,
        id: id,
        email: email,
        image: image,
        name: name,
        phone: phone,
        authority: authorityId,
        loginType: loginType
      };
    });

  return {
    type: SIGNIN_USER,
    payload: response,
  };
}

//-------------------------------2.로그아웃(완료)-------------------------------
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

//-------------------------------3.유저 정보 가져오기(없어도될듯)-------------------------------
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

//------------------------------5.유저 정보 수정하기-------------------------------

export function modifyUser(loginInfo) {
  const { email, password, name } = loginInfo;

  const response = axios
    .put(
      `${serverUrl}/user/info`,
      { password, name },
      {
        headers: { Authorization: `bearer ${accessToken}` },
        withCredentials: true,
      })
    .then((res) => {
      const { name, password } = res.data.userInfo;
      return {
        name: name,
        email: email,
        password: password,
      };
    });
  }