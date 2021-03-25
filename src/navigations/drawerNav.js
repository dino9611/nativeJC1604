import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import StackNav from './stackNav';
import SettingSscreen from '../screens/SettingScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const DrawerNav = createDrawerNavigator();

export default DrawerNavigator = () => {
  return (
    <DrawerNav.Navigator
      drawerPosition="right"
      drawerType="slide"
      overlayColor={'transparent'}
      drawerContent={props => <CustomDrawerContent {...props} />}
      // screenOptions={({route}) => ({
      //   drawerIcon: ({focused, color, size}) => {
      //     let iconName;
      //     // console.log(route.name)
      //     if (route.name === 'Root') {
      //       iconName = focused ? 'user' : 'user';
      //       return null;
      //     } else if (route.name === 'Setting') {
      //       iconName = focused ? 'cog' : 'cog';
      //     }
      //     // You can return any component that you like here!
      //     // console.log(color)
      //     return (
      //       <Icon
      //         name={iconName}
      //         type="font-awesome"
      //         size={size}
      //         color={color}
      //       />
      //     );
      //   },
      //   drawerLabel: ({focused, color, size}) => {
      //     if (route.name === 'Root') {
      //       return null;
      //     }
      //     return <Text style={{color}}>{route.name}</Text>;
      //   },
      // })}
      drawerContentOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <DrawerNav.Screen
        name="Root"
        component={StackNav}
        options={{
          swipeEnabled: false,
          drawerIcon: () => null,
          drawerLabel: () => null,
        }}
      />
      <DrawerNav.Screen name="Setting" component={SettingSscreen} />
    </DrawerNav.Navigator>
  );
};
