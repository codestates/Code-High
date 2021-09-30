import {
  SIGNIN_USER,
  GITHUB_SIGNIN_USER,
  KAKAO_SIGNIN_USER,
  GOOGLE_SIGNIN_USER,
  SIGNOUT_USER,
  GET_USER_INFO,
  MODIFY_USER_INFO,
  DELETE_USER_INFO,
} from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

//1.로그인(완료)
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
      const { id, email, image, name, phone, authorityId, loginType } =
        res.data.userInfo;
      return {
        message: res.data.message,
        accessToken: res.data.accessToken,
        id: id,
        email: email,
        image: image,
        name: name,
        phone: phone,
        authority: authorityId,
        loginType: loginType,
      };
    });

  return {
    type: SIGNIN_USER,
    payload: response,
  };
}

//2.깃헙로그인(완료)
export function githubSigninUser(authorizationCode) {
  const response = axios
    .post(
      `${serverUrl}/auth/github`,
      { authorizationCode },
    )
    .then((res) => {
      const { id, email, image, name, authorityId, loginType } =
        res.data.userInfo;
      return {
        message: res.data.message,
        accessToken: res.data.accessToken,
        id: id,
        email: email,
        image: image,
        name: name,
        phone: null,
        authority: authorityId,
        loginType: loginType,
      };
    });
  
  return {
    type: GITHUB_SIGNIN_USER,
    payload: response,
  };
}

//3.카카오로그인(완료)
export function kakaoSigninUser(authorizationCode) {
  const response = axios
    .post(
      `${serverUrl}/auth/kakao`,
      { authorizationCode },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((res) => {
      const { id, email, image, name, authorityId, loginType } =
        res.data.userInfo;
      return {
        message: res.data.message,
        accessToken: res.data.accessToken,
        id: id,
        email: email,
        image: image,
        name: name,
        phone: null,
        authority: authorityId,
        loginType: loginType,
      };
    });

  return {
    type: KAKAO_SIGNIN_USER,
    payload: response,
  };
}

//4.구글로그인(완료)
export function googleSigninUser(authorizationCode) {
  const response = axios
    .post(
      `${serverUrl}/auth/google`,
      { authorizationCode},
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((res) => {
      const { id, email, image, name, authorityId, loginType } =
        res.data.userInfo;
      return {
        message: res.data.message,
        accessToken: res.data.accessToken,
        id: id,
        email: email,
        image: image,
        name: name,
        phone: null,
        authority: authorityId,
        loginType: loginType,
      };
    });

  return {
    type: GOOGLE_SIGNIN_USER,
    payload: response,
  };
}

//5.로그아웃(완료)
export async function signoutUser(accessToken) {
  const response = axios
    .get(`${serverUrl}/auth/logout`, { 
      headers: { 
        Authorization: `bearer ${accessToken}`,
        'Content-Type': 'application/json' 
      },
    })
    .then((res) => {
      res.data.message;
    });

  return {
    type: SIGNOUT_USER,
    payload: response,
  };
}

//6.회원탈퇴(마이페이지 구현 후)
export async function deleteUserInfo(data) {
  axios
    .delete(`${serverUrl}/user`, {
      headers: {
        login_type: `${data.logintype}`,
        Authorization: `bearer ${data.accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return {
        type: DELETE_USER_INFO,
        payload: res.data.message,
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