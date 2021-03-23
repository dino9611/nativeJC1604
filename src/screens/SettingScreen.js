import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT} from '../redux/type';

const SettingSscreen = () => {
  const dispatch = useDispatch();
  const OnLogOutpress = async () => {
    try {
      await AsyncStorage.removeItem('username');
      dispatch({type: LOGOUT});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Setting Screen</Text>
      <Button title="LOGOUT" onPress={OnLogOutpress} />
    </View>
  );
};
export default SettingSscreen;
