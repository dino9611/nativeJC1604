import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN} from '../redux/type';
import axios from 'axios';
import {API_URL} from '../helper';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const [focus, setfocus] = useState('');
  const [secure, setsecure] = useState(true);
  const [Logindata, setlogindata] = useState({
    username: '',
    password: '',
  });

  const onLoginPress = async () => {
    try {
      const {data} = await axios.get(`${API_URL}/users`, {
        params: {
          username: Logindata.username,
          password: Logindata.password,
        },
      });
      if (data.length) {
        await AsyncStorage.setItem('username', data[0].username);
        dispatch({type: LOGIN, payload: data[0]});
      } else {
        Alert.alert('Login', 'User tidak ditemukan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const oninputChange = (text, props) => {
    setlogindata({...Logindata, [props]: text});
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      <StatusBar backgroundColor="#ca2c37" barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 30, color: '#ca2c37'}}> LOGIN</Text>
          <Input
            // placeholder="username"
            label="Username"
            value={Logindata.username}
            onChangeText={text => oninputChange(text, 'username')}
            // errorMessage="dasdasd"
            labelStyle={{color: focus === 'username' ? '#ca2c37' : 'gray'}}
            leftIcon={{
              name: 'account-circle',
              color: focus === 'username' ? '#ca2c37' : 'gray',
            }}
            inputContainerStyle={{
              borderColor: focus === 'username' ? '#ca2c37' : 'gray',
              borderBottomWidth: focus === 'username' ? 2 : 1,
            }}
            onFocus={() => setfocus('username')}
          />
          <Input
            label="Password"
            value={Logindata.password}
            onChangeText={text => oninputChange(text, 'password')}
            labelStyle={{color: focus === 'password' ? '#ca2c37' : 'gray'}}
            leftIcon={{
              name: 'lock',
              color: focus === 'password' ? '#ca2c37' : 'gray',
            }}
            secureTextEntry={secure}
            inputContainerStyle={{
              borderColor: focus === 'password' ? '#ca2c37' : 'gray',
              borderBottomWidth: focus === 'password' ? 2 : 1,
            }}
            rightIcon={
              <Icon
                name={secure ? 'visibility-off' : 'visibility'}
                color={secure ? 'lightgray' : '#ca2c37'}
                onPress={() => setsecure(!secure)}
              />
            }
            onFocus={() => setfocus('password')}
          />
          <Button
            title={'Login'}
            type="outline"
            containerStyle={{width: '100%'}}
            titleStyle={{color: '#ca2c37'}}
            buttonStyle={{borderColor: '#ca2c37'}}
            raised
            onPress={onLoginPress}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
