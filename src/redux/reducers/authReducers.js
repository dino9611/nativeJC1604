import {LOGIN, SETLOADING, LOGOUT} from '../type';

const INITIAL_STATE = {
  username: '',
  isLogin: false,
  isloading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, ...action.payload, isLogin: true};
    case SETLOADING:
      return {...state, isloading: false};
    case LOGOUT:
      return {...state, username: '', isLogin: false};
    default:
      return state;
  }
};
