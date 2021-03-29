import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import DrawerNavigator from './src/navigations/drawerNav';
import AuthStack from './src/navigations/AuthStack';
import {connect} from 'react-redux';
import {KeepLogin, GetProductAction} from './src/redux/actions';
import messaging from '@react-native-firebase/messaging';
import Splashscreen from './src/screens/Splashscreen';
import PushNotification from 'react-native-push-notification';
const App = ({dataUser, KeepLogin, GetProductAction}) => {
  // console.log(dataUser);
  // keep login feature
  useEffect(() => {
    KeepLogin();
    GetProductAction();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      PushNotification.localNotification({
        title: 'coba foreground',
        message: 'tes foreground',
      });
    });

    messaging()
      .requestPermission()
      .then(authStatus => {
        console.log('APN Status', authStatus);
        if (
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          messaging()
            .getToken()
            .then(token => {
              console.log('messaging.token', token);
            });
          messaging().onTokenRefresh(token => {
            console.log('messaging.onTokenRefresh: ', token);
            // PushNotification.localNotification({
            //   title: 'coba foreground',
            //   message: 'tes foreground',
            // });
          });
          messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
              'Notification caused app to open from background state:',
              remoteMessage,
            );
            messaging()
              .getInitialNotification()
              .then(remoteMessage => {
                if (remoteMessage) {
                  console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage,
                  );
                }
              });
            //this.forwardToSearchPage(remoteMessage.data.word);
          });
        }
      })
      .catch(err => {
        console.log('messageing.requestPermission :', err);
      });

    return unsubscribe;
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
