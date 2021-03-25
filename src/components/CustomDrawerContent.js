import React from 'react';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';

export default props => {
  return (
    <View style={{flex: 1}}>
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
      </DrawerContentScrollView>
    </View>
  );
};
