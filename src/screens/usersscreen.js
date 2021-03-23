import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector} from 'react-redux';
export default function Userscreen({navigation, route}) {
  // tanpa destructuring props.route

  const {username} = useSelector(state => state.Auth);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text>{username}'s Screen </Text>
      <Button title="buka drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
}
