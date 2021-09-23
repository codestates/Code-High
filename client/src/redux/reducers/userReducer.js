import {
  SIGNIN_USER,
  SIGNOUT_USER,
  GET_USER_INFO,
  DELETE_USER_INFO,
  GET_MENU
} from '../actions/types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return Object.assign({}, state, {
        userInfo: [...state.userInfo, action.payload],
      });
    case SIGNOUT_USER:
      return Object.assign({}, state, {});
    case GET_USER_INFO:
      return Object.assign({}, state, {
        userInfo: [...state.userInfo, action.payload],
      });
    case DELETE_USER_INFO:
      return Object.assign({}, state, {});
    case GET_MENU:
      return Object.assign({}, state, {
        menu: [...state.menu, action.payload],
      });
    default:
      return state;
  }
}

export default userReducer;