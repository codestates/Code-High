import {
  GET_CODESTORAGE_POST,
  GET_CODEREVIEW_POST,
  RESET_CODEREVIEW_POST,
  GET_CODEREVIEW_FILTER,
  GET_CODESTORAGE_FILTER,
  GET_CODEPOST,
  MODIFY_CODEPOST,
  DELETE_POST,
  GET_COMMENT,
  RESET_GET_COMMENT,
  DELETE_COMMENT,
  RESET_POST_COMMENT,
} from './types';
import axios from 'axios';
import serverUrl from '../../App';

axios.defaults.withCredentials = true;
// const serverUrl = 'https://api.codehigh.club';

//1.코드 저장소(완료)
export async function getCodestoragePost(data) {
  const response = axios
    .get(`${serverUrl}/user/post`, {
      headers: {
        Authorization: `bearer ${data.accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data.postList;
    });

  return {
    type: GET_CODESTORAGE_POST,
    payload: response,
  };
}

//2.코드 리뷰 공개글만 가져오기(완료)
export function getReviewPost(page) {
  const response = axios
    .get(`${serverUrl}/post?page=${page}`, {
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
    .get(`${serverUrl}/post?page=1`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.data.postList;
    });

  return {
    type: RESET_CODEREVIEW_POST,
    payload: response,
  };
}

//!3.검색 기능(완료)
export async function getReviewFilter(data) {
  const response = axios
    .get(`${serverUrl}/post?search=${data.search}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.data.postList) {
        return res.data.postList;
      }
      return;
    });

  return {
    type: GET_CODEREVIEW_FILTER,
    payload: response,
  };
}

export async function getStorageFilter(data) {
  const response = axios
    .get(`${serverUrl}/user/post?search=${data.search}`, {
      headers: {
        Authorization: `bearer ${data.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.data.postList;
    });

  return {
    type: GET_CODESTORAGE_FILTER,
    payload: response,
  };
}

//4.코드 자세히 보기(완료)
export async function getCodepost(data) {
  const response = axios
    .get(`${serverUrl}/post/${data.postId}`, {
      headers: {
        Authorization: `bearer ${data.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data.post;
    });

  return {
    type: GET_CODEPOST,
    payload: response,
  };
}

//!5.게시글 수정
export async function modifyCodePost(data) {
  const response = axios
    .patch(`${serverUrl}/post/${data.postId}`, data.codeEditInfo, {
      headers: {
        Authorization: `bearer ${data.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data.message;
    });

  return {
    type: MODIFY_CODEPOST,
    payload: response,
  };
}

//!6.게시글 삭제
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

//------------------------------------------------------------댓글-----------------------------------------------------------
//!7.댓글 가져오기(완료)
export async function getCommentPost(data) {
  const response = axios
    .get(`${serverUrl}/post/${data.postId}/comment?page=${data.count}`, {
      headers: {
        Authorization: `bearer ${data.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data.commentList;
    });

  return {
    type: GET_COMMENT,
    payload: response,
  };
}

export async function resetGetCommentPost(data) {
  const response = axios
    .get(`${serverUrl}/post/${data.postId}/comment?page=1`, {
      headers: {
        Authorization: `bearer ${data.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data.commentList;
    });

  return {
    type: RESET_GET_COMMENT,
    payload: response,
  };
}

//!8.댓글 수정

//9.댓글 삭제
export async function deleteComment(data) {
  const response = axios
    .delete(`${serverUrl}/comment/${data.id}`, {
      headers: {
        login_type: `${data.logintype}`,
        Authorization: `bearer ${data.accessToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
    });

  return {
    type: DELETE_COMMENT,
    payload: response,
  };
}

//10.로그아웃 시 모든 정보 리셋
export async function resetPostCommet() {
  return {
    type: RESET_POST_COMMENT,
    payload: {},
  };
}
