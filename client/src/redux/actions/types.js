// action types
// user
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNOUT_USER = 'SIGNOUT_USER';
export const GET_USER_INFO = 'GET_USER_INFO';
export const DELETE_USER_INFO = 'DELETE_USER_INFO';
export const GET_MENU = 'GET_MENU';

// codepost
// 공개된 게시물, 비공개 포함 개인 게시물, 코드 검색, 게시물 지우기, 게시물 개수, 댓글, 태그
export const GET_CODEREVIEW_POST = 'GET_CODEREVIEW_POST';
export const GET_CODEREVIEW_FILTER = 'GET_CODEREVIEW_FILTER';
export const GET_CODESTORAGE_POST = 'GET_CODESTORAGE_POST';
export const DELETE_POST = 'DELETE_POST';

// codeComment
// 댓글 게시, 댓글 삭제
export const GET_COMMENT_POST = 'GET_COMMENT_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// admin - 보류
export const GET_USERS_CHART = 'GET_USERS_CHART';
export const GET_USERS_POST = 'GET_USERS_POST';
export const GET_USERS_COMMENT = 'GET_USERS_COMMENT';
export const DELETE_USERS_POST = 'DELETE_USERS_POST';
export const DELETE_USERS_COMMENT = 'DELETE_USERS_COMMENT';

//메뉴 가져오기