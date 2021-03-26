import {combineReducers} from 'redux';
import AuthReducers from './authReducers';
import productReducers from './productReducers';
import DarkmodeReducers from './DarkmodeReducers';

export default combineReducers({
  Auth: AuthReducers,
  Products: productReducers,
  isDark: DarkmodeReducers,
});
