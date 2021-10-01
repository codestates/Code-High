// action types
// user
export const SIGNIN_USER = 'SIGNIN_USER';
export const GITHUB_SIGNIN_USER = 'GITHUB_SIGNIN_USER';
export const KAKAO_SIGNIN_USER = 'KAKAO_SIGNIN_USER';
export const GOOGLE_SIGNIN_USER = 'GOOGLE_SIGNIN_USER';
export const SIGNOUT_USER = 'SIGNOUT_USER';
export const MODIFY_USER_INFO = 'MODIFY_USER_INFO';
export const DELETE_USER_INFO = 'DELETE_USER_INFO';
export const MYPAGE_USER_INFO = 'MYPAGE_USER_INFO';

// codepost, codeComment
// 코드 저장소, 코드 올리기(코드 올리는 페이지에서), 코드 리뷰 포스트, 코드 검색, 코드 자세히 보기, 코드 수정, 코드 지우기
export const GET_CODESTORAGE_POST = 'GET_CODESTORAGE_POST';
export const GET_CODEREVIEW_POST = 'GET_CODEREVIEW_POST';
export const RESET_CODEREVIEW_POST = 'RESET_CODEREVIEW_POST';
export const GET_CODEREVIEW_FILTER = 'GET_CODEREVIEW_FILTER';
export const GET_CODESTORAGE_FILTER = 'GET_CODESTORAGE_FILTER';
export const GET_CODEPOST = 'GET_CODEPOST';
export const MODIFY_CODEPOST = 'MODIFY_CODEPOST';
export const DELETE_POST = 'DELETE_POST';
// 댓글 가져오기, 댓글 게시(댓글창에서), 댓글 삭제
export const GET_COMMENT = 'GET_COMMENT';
export const RESET_GET_COMMENT = 'RESET_GET_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const RESET_POST_COMMENT = 'RESET_POST_COMMENT';

// admin
export const GET_USERS_CHART = 'GET_USERS_CHART';
export const GET_USERS_POST = 'GET_USERS_POST';
export const GET_USERS_COMMENT = 'GET_USERS_COMMENT';
export const DELETE_USERS_POST = 'DELETE_USERS_POST';
export const DELETE_USERS_COMMENT = 'DELETE_USERS_COMMENT';