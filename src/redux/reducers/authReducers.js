import {LOGIN, SETLOADING, LOGOUT, UPDATECART} from '../type';

const INITIAL_STATE = {
  username: '',
  cart: [],
  role: 'user',
  isLogin: false,
  isloading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, ...action.payload, isLogin: true};
    case SETLOADING:
      return {...state, isloading: false};
    case UPDATECART:
      return {...state, cart: action.cart};
    case LOGOUT:
      return {...state, username: '', isLogin: false};
    default:
      return state;
  }
};
