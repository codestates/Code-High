import {
  SIGNIN_USER,
  GITHUB_SIGNIN_USER,
  KAKAO_SIGNIN_USER,
  GOOGLE_SIGNIN_USER,
  SIGNOUT_USER,
  DELETE_USER_INFO,
} from '../actions/types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return Object.assign({}, state, {
        userInfo: action.payload,
      });
    case GITHUB_SIGNIN_USER:
      return Object.assign({}, state, {
        userInfo: action.payload
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
    case DELETE_USER_INFO:
      return Object.assign({}, state, {});
    default:
      return state;
  }
};

export default userReducer;
