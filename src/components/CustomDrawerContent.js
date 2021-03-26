import React from 'react';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, useColorScheme, Text, Switch} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {LIGHT, DARK} from '../redux/type';
export default props => {
  console.log(useColorScheme());
  const IsdarkMode = useSelector(state => state.isDark);
  console.log(IsdarkMode, 'isdark');

  const dispatch = useDispatch();
  const SwitchChange = () => {
    if (IsdarkMode) {
      dispatch({type: LIGHT});
    } else {
      dispatch({type: DARK});
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: IsdarkMode ? '#292929' : 'white'}}>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Setting"
          onPress={() => props.navigation.navigate('Setting')}
          activeTintColor={'tomato'}
          icon={() => {
            return (
              <Icon
                name={'cog'}
                type="font-awesome"
                // size={propssize}
                color={'gray'}
              />
            );
          }}
          activeBackgroundColor={'blue'}
        />
        <View>
          <View>
            <Text>{IsdarkMode ? 'Darkmode' : 'lightmode'}</Text>
          </View>
          <View>
            <Switch
              value={IsdarkMode}
              onValueChange={SwitchChange}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={IsdarkMode ? '#f5dd4b' : '#f4f3f4'}
              style={{
                alignSelf: 'flex-start',
                transform: [{scaleX: 1.5}, {scaleY: 1.5}],
                height: 50,
                marginLeft: 10,
              }}
              // style={{}}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
