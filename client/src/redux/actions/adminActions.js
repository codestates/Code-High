import {
  GET_USERS_CHART,
  GET_USERS_POST,
  GET_USERS_COMMENT,
  DELETE_USERS_POST,
  DELETE_USERS_COMMENT
} from './types';
import axios from 'axios';
import serverUrl from '../../App';

axios.defaults.withCredentials = true;
// const serverUrl = 'https://api.codehigh.club';

//1.유져 차트 정보 가져오기-------------------------------

export const getUsersChart = async (data) => {
  const response = axios
    .get(`${serverUrl}/admin/stat/date`, {
      headers: {
        Authorization: `bearer ${data}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data)
    });

  return {
    type: GET_USERS_CHART,
    payload: response,
  };
}

//2.모든 게시글 가져오기-------------------------------
export async function getUsersPost(data) {
  const response = axios
    .get(`${serverUrl}/post`, {
      headers: {
        Authorization: `bearer ${data}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      // console.log(res.data.postList)
      return res.data.postList
    });

  return {
    type: GET_USERS_POST,
    payload: response,
  };
}

//3.모든 댓글 가져오기-------------------------------
export async function getUsersComment(data) {
  axios
    .get(
      `${serverUrl}/comment`,{
        headers: {
          loginType: `${logintype}`,
          Authorization: `bearer ${accessToken}`
        },
        withCredentials: true,
      })
    .then((res) => {
      return res.data.commentList
    })
      return {
        type: GET_USERS_COMMENT,
        payload:response,
      };
}




//4.선택한 게시글 삭제하기-------------------------------
// export async function deleteUsersPost(accessToken, logintype, postList) {
//   axios
//   .delete(`${serverUrl}/post`, {
//     headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
//     data: { postList: `${postList}`},
//     withCredentials: true,
//   })
//     .then((res) => {
//       return {
//         type: DELETE_USERS_POST,
//         payload: res.data.message,
//       };
//     });
// }

//5.선택한 댓글 삭제하기-------------------------------
// export async function deleteUsersComment(accessToken, logintype, commentList) {
//   axios
//     .delete(`${serverUrl}/comment`, {
//       data: { commentList: `${commentList}`},
//       headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
//       withCredentials: true,
//     })
//     .then((res) => {
//       return {
//         type: DELETE_USERS_COMMENT,
//         payload: res.data.message,
//       };
//     });
// }

