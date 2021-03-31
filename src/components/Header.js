import React from 'react';
import {View, Text} from 'react-native';
export const HeaderComp = ({children}) => {
  return (
    <View
      style={{
        backgroundColor: '#ca2c37',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
      }}>
      <Text style={{color: 'white', fontSize: 24, fontWeight: '700'}}>
        {children}
      </Text>
    </View>
  );
};
