import {
  GET_USERS_CHART,
  GET_USERS_POST,
  GET_USERS_COMMENT,
  DELETE_USERS_POST,
  DELETE_USERS_COMMENT,
} from '../actions/types';

//객체 복사하기
const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_CHART:
      return Object.assign({}, state, {
        userChart: [...state.userChart, action.payload],
      });
    case GET_USERS_POST:
      return Object.assign({}, state, {
        usersPost: [...state.usersPost, action.payload],
      });
    case GET_USERS_COMMENT:
      return Object.assign({}, state, {
        usersComment: [...state.usersComment, action.payload],
      });
    case DELETE_USERS_POST:
      return Object.assign({}, state, {});
    case DELETE_USERS_COMMENT:
      return Object.assign({}, state, {});
    default:
      return state;
  }
}

export default adminReducer;