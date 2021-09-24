import {
  GET_CODESTORAGE_POST,
  GET_CODEREVIEW_POST,
  RESET_CODEREVIEW_POST,
  GET_CODEREVIEW_FILTER,
  GET_CODEPOST,
  MODIFY_CODEPOST,
  DELETE_POST,
  GET_COMMENT,
  DELETE_COMMENT,
} from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

//1.코드 저장소 내가 쓴 글들-------------------------------
export async function getCodestoragePost(data) {
  axios
    .get(`${serverUrl}/user/post`, {
      headers: {
        login_type: `${data.logintype}`,
        Authorization: `bearer ${data.accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return {
        type: GET_CODESTORAGE_POST,
        payload: {
          message: res.data.message,
          postList: res.data.postList,
        },
      };
    });
}

//2.코드 리뷰 공개글만 가져오기(완료)-------------------------------
export function getReviewPost(page) {
  const response = axios
    .get(`${serverUrl}/post/?page=${page}`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      return res.data.postList;
    });

  return {
    type: GET_CODEREVIEW_POST,
    payload: response,
  };
}

export function resetCodereviewPost() {
  const response = axios
    .get(`${serverUrl}/post/?page=1`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      return res.data.postList;
    });
    console.log(response)
  return {
    type: RESET_CODEREVIEW_POST,
    payload: response,
  };
}

//!3.검색 기능------------------------------
export async function getReviewFilter(keyword) {
  const response = axios
    .get(`${serverUrl}/post`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      const filter = res.data.postList.filter((el) => el.title === `${keyword}` || el.codeContent === `${keyword}` || el.textcontent === `${keyword}`)
      return filter;
    });

  return {
    type: GET_CODEREVIEW_POST,
    payload: response,
  };
}

//4.코드 자세히 보기-------------------------------
export async function getCodepost(id, accessToken, logintype) {
  axios
    .get(`${serverUrl}/post/:${id}`, {
      headers: {
        loginType: `${logintype}`,
        Authorization: `bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return {
        type: GET_COMMENT,
        payload: {
          message: res.data.message,
          post: res.data.post,
        },
      };
    });
}

//!5.게시글 수정-------------------------------

//6.게시글 삭제-------------------------------
export async function deleteUsersPost(id, accessToken, logintype) {
  axios
    .delete(`${serverUrl}/post/:${id}`, {
      headers: {
        loginType: `${logintype}`,
        Authorization: `bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return {
        type: DELETE_POST,
        payload: res.data.message,
      };
    });
}

//7.댓글 가져오기-------------------------------
export async function getCommentPost(id, accessToken, logintype) {
  axios
    .get(`${serverUrl}/post/:${id}/comment`, {
      headers: {
        loginType: `${logintype}`,
        Authorization: `bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return {
        type: GET_COMMENT_POST,
        payload: {
          message: res.data.message,
          commentList: res.data.commentList,
        },
      };
    });
}

//8.댓글 삭제-------------------------------
export async function deleteComment(id, accessToken, logintype) {
  axios
    .delete(`${serverUrl}/comment/:${id}`, {
      headers: {
        loginType: `${logintype}`,
        Authorization: `bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return {
        type: DELETE_COMMENT,
        payload: res.data.message,
      };
    });
}
