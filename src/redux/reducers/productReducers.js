import {GETDATA} from '../type';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETDATA:
      return [...action.payload];

    default:
      return state;
  }
};
