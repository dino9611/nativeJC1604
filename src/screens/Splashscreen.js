import React from 'react';

import {View, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#292929',
      }}>
      <Animatable.View
        easing={'ease-in'}
        animation="zoomIn"
        duration={700}
        useNativeDriver={true}>
        <Image
          source={require('./../image/Cartgo.png')}
          style={{height: 200}}
        />
      </Animatable.View>
    </View>
  );
};
