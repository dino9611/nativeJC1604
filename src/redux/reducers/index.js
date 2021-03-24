import {combineReducers} from 'redux';
import AuthReducers from './authReducers';
import productReducers from './productReducers';

export default combineReducers({
  Auth: AuthReducers,
  Products: productReducers,
});
