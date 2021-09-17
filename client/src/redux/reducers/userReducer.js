import { SIGNIN_USER, SIGNOUT_USER, GET_USER_INFO, DELETE_USER_INFO } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNIN_USER:
      return { ...state, userInfo: action.payload };
      break;
    case SIGNOUT_USER:
      return (state = {});
      break;
    case GET_USER_INFO:
      return { ...state, userInfo: action.payload };
      break;
    case DELETE_USER_INFO:
      return (state = {});
      break;
    default:
      return state;
  };
};
