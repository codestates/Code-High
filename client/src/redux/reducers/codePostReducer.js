import {
  GET_CODESTORAGE_POST,
  GET_CODEREVIEW_POST,
  GET_CODEREVIEW_FILTER,
  GET_CODEPOST,
  MODIFY_CODEPOST,
  DELETE_POST,
} from '../actions/types';

const codePostReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CODESTORAGE_POST:
      return Object.assign({}, state, {
        userPostList: [...state.userPostList, action.payload],
      });
    case GET_CODEREVIEW_POST:
      return Object.assign({}, state, {
        postList: action.payload,
      });
    case GET_CODEREVIEW_FILTER:
      return Object.assign({}, state, {
        postList: [...state.postList, action.payload],
      });
    case GET_CODEPOST:
      return Object.assign({}, state, {
        codePost: [...state.codePost, action.payload],
      });
    case MODIFY_CODEPOST:
      return Object.assign({}, state, {
        codePost: [...state.codePost, action.payload],
      });
    case DELETE_POST:
      return Object.assign({}, state, {});
    default:
      return state;
  }
}

export default codePostReducer;