import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import DrawerNavigator from './src/navigations/drawerNav';
import AuthStack from './src/navigations/AuthStack';
import {connect} from 'react-redux';
import {KeepLogin, GetProductAction} from './src/redux/actions';

import Splashscreen from './src/screens/Splashscreen';
const App = ({dataUser, KeepLogin, GetProductAction}) => {
  // console.log(dataUser);
  // keep login feature
  useEffect(() => {
    KeepLogin();
    GetProductAction();
  }, []);

  if (dataUser.isloading) {
    return <Splashscreen />;
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
