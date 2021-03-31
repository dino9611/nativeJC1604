import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeTab from './HomeTab';
import DetailScreen from '../screens/detailscreen';
import ReimbursementScreen from '../screens/ReimbursementScreen';
import ReqScreen from '../screens/ReqScreen';
import DetailHistory from '../screens/detailHistory';
import PaymentScreen from '../screens/PaymentScreen';
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
        name="DetailHist"
        component={DetailHistory}
        options={({route}) => ({
          title: 'Transaksi id ' + route.params.data.id,
          headerStyle: {
            backgroundColor: '#ca2c37',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={({route}) => ({
          title: 'Payment',
          headerStyle: {
            backgroundColor: '#ca2c37',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        })}
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
