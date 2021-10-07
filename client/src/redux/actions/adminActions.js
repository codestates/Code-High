import {
  GET_USERS_CHART,
  GET_USERS_POST,
  GET_USERS_COMMENT,
  DELETE_USERS_POST,
  DELETE_USERS_COMMENT,
} from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

//1.유져 차트 정보 가져오기-------------------------------
export const getUsersChart = async (data) => {
  const response = axios
    .get(`${serverUrl}/admin/stat/date`, {
      headers: {
        Authorization: `bearer ${data}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data.stat;
    });

  return {
    type: GET_USERS_CHART,
    payload: response,
  };
};

//2.모든 게시글 가져오기-------------------------------
export const getUsersPost = async (data) => {
  const response = axios
    .get(`${serverUrl}/post`, {
      headers: {
        Authorization: `bearer ${data}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data.postList;
    });

  return {
    type: GET_USERS_POST,
    payload: response,
  };
};

//3.모든 댓글 가져오기-------------------------------
export const getUsersComment = async (data) => {
  const response = axios
    .get(`${serverUrl}/comment`, {
      headers: {
        Authorization: `bearer ${data}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data.commentList;
    });
  return {
    type: GET_USERS_COMMENT,
    payload: response,
  };
};

//4.선택한 게시글 삭제하기-------------------------------
export async function deleteUsersPost(data) {
  const response = axios
    .delete(`${serverUrl}/post`, {
      data: { postList: data.postList },
      headers: {
        Authorization: `bearer ${data.accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data.message;
    });
  return {
    type: DELETE_USERS_POST,
    payload: response,
  };
}

// 5.선택한 댓글 삭제하기-------------------------------
export async function deleteUsersComment(data) {
  const response = axios
    .delete(`${serverUrl}/comment`, {
      data: { commentList: data.commentList },
      headers: {
        Authorization: `bearer ${data.accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      res.data.message;
    });
  return {
    type: DELETE_USERS_COMMENT,
    payload: response,
  };
}
