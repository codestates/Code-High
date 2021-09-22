import {
  GET_USERS_CHART,
  GET_USERS_POST,
  GET_USERS_COMMENT,
  DELETE_USERS_POST,
  DELETE_USERS_COMMENT
} from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;
const serverUrl = 'https://localhost:4000';

//1.유져 차트 정보 가져오기-------------------------------
export async function getUsersChart(accessToken, logintype) {
  axios
    .get(
      `${serverUrl}/chart`,{
        headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
        withCredentials: true,
      })
    .then((res) => {
      return {
        type: GET_USERS_CHART,
        payload: {
          message:res.data.message,
          totalUserCount: res.data.totalUserCount,
          totalPostCount: res.data.totalPostCount,
          countList: [
            res.data.countList.month, 
            res.data.countList.userCount, 
            res.data.countList.postCount
          ]
        },
      };
    });
}

//2.모든 게시글 가져오기: 권한도 같이 보내줘야하는건 아닌지..-------------------------------
export async function getUsersPost(id, accessToken, logintype) {
  axios
    .get(
      `${serverUrl}/post/:${id}`,{
        headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
        withCredentials: true,
      })
    .then((res) => {
      return {
        type: GET_USERS_POST,
        payload: {
          message:res.data.message,
          countList: res.data.commentList
        },
      };
    });
}

//3.모든 댓글 가져오기-------------------------------
export async function getUsersComment(accessToken, logintype) {
  axios
    .get(
      `${serverUrl}/comment`,{
        headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
        withCredentials: true,
      })
    .then((res) => {
      return {
        type: GET_USERS_COMMENT,
        payload: {
          message:res.data.message,
          countList: res.data.commentList
        },
      };
    });
}

//4.선택한 게시글 삭제하기-------------------------------
export async function deleteUsersPost(accessToken, logintype, postList) {
  axios
  .delete(`${serverUrl}/post`, {
    headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
    data: { postList: `${postList}`},
    withCredentials: true,
  })
    .then((res) => {
      return {
        type: DELETE_USERS_POST,
        payload: res.data.message,
      };
    });
}

//5.선택한 댓글 삭제하기-------------------------------
export async function deleteUsersComment(accessToken, logintype) {
  axios
    .delete(`${serverUrl}/comment`, {
      headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
      data: { commentList: `${commentList}`},
      withCredentials: true,
    })
    .then((res) => {
      return {
        type: DELETE_USERS_COMMENT,
        payload: res.data.message,
      };
    });
}
