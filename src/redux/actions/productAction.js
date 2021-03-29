import axios from 'axios';
import {API_URL} from '../../helper';
import {GETDATA} from '../type';

export const GetProductAction = () => {
  return async dispatch => {
    const products = await axios.get(`${API_URL}/products`);
    // console.log(products.data);
    dispatch({type: GETDATA, payload: products.data});
  };
};

export const FilterProductAction = Keyword => {
  return async dispatch => {
    const products = await axios.get(`${API_URL}/products`, {
      params: {
        name_like: Keyword,
      },
    });
    // console.log(products.data.length);
    dispatch({type: GETDATA, payload: products.data});
  };
};
