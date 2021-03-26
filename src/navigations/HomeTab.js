import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import NewsScreen from '../screens/newsscreen';
import Userscreen from '../screens/usersscreen';
import Bookscreen from '../screens/bookscreen';
import {Icon, Badge} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';

const BottomTab = createBottomTabNavigator();

const HomeTab = () => {
  const IsdarkMode = useSelector(state => state.isDark);

  return (
    <BottomTab.Navigator
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'News') {
              iconName = focused ? 'message' : 'message';
            } else if (route.name === 'Books') {
              iconName = focused ? 'book' : 'book';
              return (
                <View>
                  <Badge
                    value={99}
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
                  <Icon name={iconName} color={color} size={size} />
                </View>
              );
            } else {
              iconName = focused ? 'account-circle' : 'account-circle';
            }
            return <Icon name={iconName} color={color} size={size} />;
          },
          // tabBarLabel: ({focused, color}) => {
          //   // You can return any component that you like here!
          //   return null;
          // },
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
      <BottomTab.Screen name="News" component={NewsScreen} />
      <BottomTab.Screen name="Books" component={Bookscreen} />
      <BottomTab.Screen name="Users" component={Userscreen} />
    </BottomTab.Navigator>
  );
};

export default HomeTab;
