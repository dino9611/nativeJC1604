import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeTab from './HomeTab';
import DetailScreen from '../screens/detailscreen';
import ReimbursementScreen from '../screens/ReimbursementScreen';
import ReqScreen from '../screens/ReqScreen';
const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Reim" component={ReimbursementScreen} />
      <Stack.Screen
        name="Detail"
        options={{headerShown: false}}
        component={DetailScreen}
      />
      <Stack.Screen
        name="Req"
        component={ReqScreen}
        initialParams={{nama: 'doni'}}
        options={({route}) => ({
          title: route.params.nama,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
