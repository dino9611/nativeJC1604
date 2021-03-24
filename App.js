import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import DrawerNavigator from './src/navigations/drawerNav';
import AuthStack from './src/navigations/AuthStack';
import {connect} from 'react-redux';
import {KeepLogin, GetProductAction} from './src/redux/actions';
import {View, Text} from 'react-native';

const App = ({dataUser, KeepLogin, GetProductAction}) => {
  // console.log(dataUser);
  // keep login feature
  useEffect(() => {
    KeepLogin();
    GetProductAction();
  }, []);

  if (dataUser.isloading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'white',
        }}>
        <Text style={{fontSize: 35, color: 'white'}}>Splash Screen</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {dataUser.isLogin ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

const MapstatetoProps = ({Auth}) => {
  return {
    dataUser: Auth,
  };
};

export default connect(MapstatetoProps, {KeepLogin, GetProductAction})(App);
