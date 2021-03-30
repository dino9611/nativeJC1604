import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import NewsScreen from '../screens/newsscreen';
import Userscreen from '../screens/usersscreen';
import Cartscreen from '../screens/bookscreen';
import {Icon, Badge} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';

const BottomTab = createBottomTabNavigator();

const HomeTab = () => {
  const IsdarkMode = useSelector(state => state.isDark);
  const Userdata = useSelector(state => state.Auth);
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Products') {
              iconName = focused ? 'message' : 'message';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'add-shopping-cart' : 'add-shopping-cart';
              return (
                <View>
                  {Userdata.cart.length ? (
                    <Badge
                      value={Userdata.cart.length}
                      badgeStyle={{
                        position: 'absolute',
                        left: 18,
                        elevation: 2,
                        backgroundColor: '#ca2c37',
                      }}
                      textStyle={{
                        fontSize: 10,
                      }}
                    />
                  ) : null}
                  <Icon name={iconName} color={color} size={size} />
                </View>
              );
            } else {
              iconName = focused ? 'account-circle' : 'account-circle';
            }
            return <Icon name={iconName} color={color} size={size} />;
          },
          tabBarLabel: ({focused, color}) => {
            // You can return any component that you like here!
            return null;
          },
        };
      }}
      tabBarOptions={{
        inactiveTintColor: 'lightgray',
        activeTintColor: '#ca2c37',
        tabStyle: {
          backgroundColor: IsdarkMode ? '#292929' : 'white',
        },
      }}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Products" component={NewsScreen} />
      <BottomTab.Screen name="Cart" component={Cartscreen} />
      <BottomTab.Screen name="Users" component={Userscreen} />
    </BottomTab.Navigator>
  );
};

export default HomeTab;
