import {
  SIGNIN_ADMIN,
  SIGNOUT_ADMIN,
  GET_USERS_NUMBER,
  GET_USERS_POST,
  GET_USERS_COMMENT,
  DELETE_USERS_POST,
  DELETE_USERS_COMMENT
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNIN_ADMIN:
      return { ...state, adminInfo: action.payload };
      break;
    case SIGNOUT_ADMIN:
      return (state = {});
      break;
    case GET_USERS_NUMBER:
      return { ...state, manageDatas: action.payload };
      break;
    case GET_USERS_POST:
      return { ...state, manageDatas: action.payload };
      break;
    case GET_USERS_COMMENT:
      return { ...state, manageDatas: action.payload };
      break;
    case DELETE_USERS_POST:
      return (state = {});
      break;
    case DELETE_USERS_COMMENT:
      return (state = {});
      break;
    default:
      return state;
  };
};
