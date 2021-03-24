import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN, SETLOADING} from '../type';
import axios from 'axios';
import {API_URL} from '../../helper';
export const KeepLogin = () => {
  return async dispatch => {
    try {
      const username = await AsyncStorage.getItem('username');

      if (username) {
        const {data} = await axios.get(`${API_URL}/users`, {
          //params pengganti tanda tanya
          params: {
            username: username,
          },
        });

        dispatch({type: LOGIN, payload: data[0]});
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({type: SETLOADING});
    }
  };
};
