import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import codePostReducer from '../reducers/codePostReducer';
import adminReducer from '../reducers/adminReducer';

const rootReducer = combineReducers({
  userReducer,
  codePostReducer,
  adminReducer
});

export default rootReducer;
