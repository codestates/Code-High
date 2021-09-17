import {
  GET_CODEREVIEW_POST,
  GET_CODEPOST_FILTER,
  GET_CODESTORAGE_POST,
  GET_TAG_POST,
  GET_COMMENT_POST,
  DELETE_POST,
  GET_POST_QUANTITY
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CODEREVIEW_POST:
      return { ...state, codeReviewPost: action.payload };
      break;
    case GET_CODEPOST_FILTER:
      return { ...state, codeReviewPost: action.payload };
      break;
    case GET_CODESTORAGE_POST:
      return { ...state, codeStoragePost: action.payload };
      break;
    case GET_TAG_POST:
      return { ...state, codeTag: action.payload };
      break;
    case GET_COMMENT_POST:
      return { ...state, postComment: action.payload };
      break;
    case DELETE_POST:
      return (state = {});
      break;
    case GET_POST_QUANTITY:
      return { ...state, postQuantity: action.payload };
      break;
    default:
      return state;
  };
};

