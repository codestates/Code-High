import {
  SIGNIN_USER,
  GITHUB_SIGNIN_USER,
  KAKAO_SIGNIN_USER,
  GOOGLE_SIGNIN_USER,
  SIGNOUT_USER,
  MODIFY_USER_INFO,
  DELETE_USER_INFO,
  MYPAGE_USER_INFO,
} from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';
// const serverUrl = 'http://localhost:4000';

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
      if (res.status === 200) {
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
      }
    })
    .catch((err) => {
      if (err.response.status === 401) return 401;
      if (err.response.status === 404) return 404;
    });

  return {
    type: SIGNIN_USER,
    payload: response,
  };
}

//2.깃헙로그인(완료)
export function githubSigninUser(authorizationCode) {
  const response = axios
    .post(`${serverUrl}/auth/github`, { authorizationCode })
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
    type: GOOGLE_SIGNIN_USER,
    payload: response,
  };
}

//5.로그아웃(완료)
export async function signoutUser() {
  return {
    type: SIGNOUT_USER,
    payload: {},
  };
}

//!6.회원탈퇴
export async function deleteUserInfo(data) {
  const response = axios
    .delete(`${serverUrl}/user`, {
      headers: {
        Authorization: `bearer ${data.accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    });

  return {
    type: DELETE_USER_INFO,
    payload: response,
  };
}

//!7.유저 정보 수정하기
export function modifyUserInfo(data) {
  const response = axios
    .patch(
      `${serverUrl}/user`,
      { name: data.modifyInfo.nickname },
      {
        headers: { Authorization: `bearer ${data.userInfo.accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => {
      return res.data;
    });

  return {
    type: MODIFY_USER_INFO,
    payload: response,
  };
}

// 8.mypageInfo
export const getMypageInfo = async (data) => {
  const response = axios
    .get(`${serverUrl}/user/active`, {
      headers: {
        Authorization: `bearer ${data.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.data;
    });

  return {
    type: MYPAGE_USER_INFO,
    payload: response,
  };
};
