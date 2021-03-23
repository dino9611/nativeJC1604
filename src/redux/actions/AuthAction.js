import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN, SETLOADING} from '../type';

export const KeepLogin = () => {
  return async dispatch => {
    try {
      const username = await AsyncStorage.getItem('username');

      if (username) {
        let data = {username, password: '123'};
        dispatch({type: LOGIN, payload: data});
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({type: SETLOADING});
    }
  };
};
