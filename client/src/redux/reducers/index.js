import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import codePostReducer from '../reducers/codePostReducer';
import adminReducer from '../reducers/adminReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  userReducer,
  codePostReducer,
  adminReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
