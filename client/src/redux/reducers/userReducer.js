import {
  SIGNIN_USER,
  SIGNOUT_USER,
  GET_USER_INFO,
  DELETE_USER_INFO,
} from '../actions/types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return Object.assign({}, state, {
        userInfo: action.payload,
      });
    case SIGNOUT_USER:
      return Object.assign({});
    case GET_USER_INFO:
      return Object.assign({}, state, {
        userInfo: [...state.userInfo, action.payload],
      });
    case DELETE_USER_INFO:
      return Object.assign({}, state, {});
    default:
      return state;
  }
}

export default userReducer;