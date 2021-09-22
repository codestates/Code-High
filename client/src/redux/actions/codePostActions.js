import {
  GET_CODESTORAGE_POST,
  GET_CODEREVIEW_POST,
  GET_CODEREVIEW_FILTER,
  GET_CODEPOST,
  MODIFY_CODEPOST,
  DELETE_POST,
  GET_COMMENT,
  DELETE_COMMENT
} from './types';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';  
const dispatch = useDispatch();

//1.코드 저장소 내가 쓴 글들-------------------------------
export async function getCodestoragePost(data) {
  axios
    .get(
      `${serverUrl}/user/post`,{
        headers: { login_type: `${data.logintype}`, Authorization: `bearer ${data.accessToken}` },
        withCredentials: true,
      })
    .then((res) => {
      return {
        type: GET_CODESTORAGE_POST,
        payload: {
          message: res.data.message,
          postList: res.data.postList
        },
      };
    });
}

//2.코드 리뷰 공개글만 가져오기-------------------------------
export function getReviewPost(data) {
  axios
    .get(
      `${serverUrl}/post`,{
        headers: { login_type: `${data.logintype}`, Authorization: `bearer ${data.accessToken}` },
        withCredentials: true,
      })
    .then((res) => {
      console.log('action', res.data.postList)
      return {
        type: GET_CODEREVIEW_POST,
        payload: {
          message: res.data.message,
          postList: res.data.postList
        },
      };
    });
}

//!3.검색 기능------------------------------
export async function getReviewFilter(accessToken, logintype, keyword) {
  axios
    .get(
      `${serverUrl}/post`,{
        headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
        withCredentials: true,
      })
    .then((res) => {
      //제목과 내용에서 keyword와 같은 내용이 있으면 그것만 출력
      //연결해서 해보면서 하기!
    })
    .then((res) => {
      return {
        type: GET_CODEREVIEW_FILTER,
        payload: {
          message:res.data.message,
          postList: res.data.postList
        },
      };
    });
}

//4.코드 자세히 보기-------------------------------
export async function getCodepost(id, accessToken, logintype) {
  axios
    .get(
      `${serverUrl}/post/:${id}`,{
        headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
        withCredentials: true,
      })
    .then((res) => {
      return {
        type: GET_COMMENT,
        payload: {
          message:res.data.message,
          post: res.data.post
        },
      };
    });
}

//!5.게시글 수정-------------------------------

//6.게시글 삭제-------------------------------
export async function deleteUsersPost(id, accessToken, logintype) {
  axios
  .delete(`${serverUrl}/post/:${id}`, {
    headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
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
    .get(
      `${serverUrl}/post/:${id}/comment`,{
        headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
        withCredentials: true,
      })
    .then((res) => {
      return {
        type: GET_COMMENT_POST,
        payload: {
          message:res.data.message,
          commentList: res.data.commentList
        },
      };
    });
}

//8.댓글 삭제-------------------------------
export async function deleteComment(id, accessToken, logintype) {
  axios
  .delete(`${serverUrl}/comment/:${id}`, {
    headers: { loginType: `${logintype}`, Authorization: `bearer ${accessToken}` },
    withCredentials: true,
  })
    .then((res) => {
      return {
        type: DELETE_COMMENT,
        payload: res.data.message,
      };
    });
}