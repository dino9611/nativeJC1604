import {DARK, LIGHT} from '../type';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DARK:
      return true;
    case LIGHT:
      return false;
    default:
      return state;
  }
};
