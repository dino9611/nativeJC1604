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
  //   const [error, seterror] = useState('');
  const [secureconf, setsecureconf] = useState(true);
  const [Regisdata, setRegisdata] = useState({
    username: '',
    password: '',
    confpass: '',
  });

  const onRegisPress = async () => {
    try {
      if (Regisdata.password === Regisdata.confpass) {
        const {data} = await axios.get(`${API_URL}/users`, {
          params: {
            username: Regisdata.username,
          },
        });
        if (data.length) {
          Alert.alert('Register', 'Username Sudah ada');
        } else {
          const data = {
            username: Regisdata.username,
            password: Regisdata.password,
            cart: [],
            role: 'user',
          };
          const res = await axios.post(`${API_URL}/users`, data);
          //! menggunakan ngrok.com
          await AsyncStorage.setItem('username', res.data.username);
          dispatch({type: LOGIN, payload: res.data});
          // ! tanpa ngrok
          //? disclaimer karena json-servernya nggak tetap jadi anggapsa ja klo statusnya 200an itu berhasil
          //? dan data yang disimpan annti adalah axios yang didapa dari id 1
          // if (res.status >= 200 && res.status < 300) {
          //   const userdata = await axios.get(`${API_URL}/users/1`);
          //   await AsyncStorage.setItem('username', userdata.data.username);
          //   dispatch({type: LOGIN, payload: userdata.data});
          // }
        }
      } else {
        Alert.alert('Register', 'confirmasi password salah');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const oninputChange = (text, props) => {
    setRegisdata({...Regisdata, [props]: text});
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
          <Text style={{fontSize: 30, color: '#ca2c37'}}>Register</Text>
          <Input
            // placeholder="username"
            label="Username"
            value={Regisdata.username}
            onChangeText={text => oninputChange(text, 'username')}
            // errorMessage={error}
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
            value={Regisdata.password}
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
          <Input
            label="Confirm password"
            value={Regisdata.confpass}
            onChangeText={text => oninputChange(text, 'confpass')}
            labelStyle={{color: focus === 'confpass' ? '#ca2c37' : 'gray'}}
            leftIcon={{
              name: 'lock',
              color: focus === 'confpass' ? '#ca2c37' : 'gray',
            }}
            secureTextEntry={secureconf}
            inputContainerStyle={{
              borderColor: focus === 'confpass' ? '#ca2c37' : 'gray',
              borderBottomWidth: focus === 'confpass' ? 2 : 1,
            }}
            rightIcon={
              <Icon
                name={secureconf ? 'visibility-off' : 'visibility'}
                color={secureconf ? 'lightgray' : '#ca2c37'}
                onPress={() => setsecureconf(!secureconf)}
              />
            }
            onFocus={() => setfocus('confpass')}
          />
          <Button
            title={'Register'}
            type="outline"
            containerStyle={{width: '100%'}}
            titleStyle={{color: '#ca2c37'}}
            buttonStyle={{borderColor: '#ca2c37'}}
            raised
            onPress={onRegisPress}
          />
          <Text>Or</Text>
          <Button
            title={'To Login'}
            containerStyle={{width: '100%'}}
            // titleStyle={{color: '#ca2c37'}}
            buttonStyle={{backgroundColor: '#ca2c37'}}
            raised
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
