import axios from 'axios';
import {API_URL} from '../../helper';
import {GETDATA} from '../type';

export const GetProductAction = () => {
  return async dispatch => {
    const products = await axios.get(`${API_URL}/products`);
    dispatch({type: GETDATA, payload: products.data});
  };
};
