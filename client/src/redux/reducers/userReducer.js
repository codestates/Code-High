import {
  SIGNIN_USER,
  GITHUB_SIGNIN_USER,
  KAKAO_SIGNIN_USER,
  GOOGLE_SIGNIN_USER,
  SIGNOUT_USER,
  MODIFY_USER_INFO,
  DELETE_USER_INFO,
  MYPAGE_USER_INFO,
} from '../actions/types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return Object.assign({}, state, {
        userInfo: action.payload,
      });
    case GITHUB_SIGNIN_USER:
      return Object.assign({}, state, {
        userInfo: action.payload,
      });
    case KAKAO_SIGNIN_USER:
      return Object.assign({}, state, {
        userInfo: action.payload,
      });
    case GOOGLE_SIGNIN_USER:
      return Object.assign({}, state, {
        userInfo: action.payload,
      });
    case SIGNOUT_USER:
      return Object.assign({});
    case MODIFY_USER_INFO:
      return Object.assign({}, state, {
        userInfo: [...state.userInfo, ...action.payload],
      });
    case MYPAGE_USER_INFO:
      return Object.assign({}, state, {
        mypageInfo: action.payload,
      });
    case DELETE_USER_INFO:
      return Object.assign({});

    default:
      return state;
  }
};

export default userReducer;
