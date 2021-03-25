import React from 'react';

import {View, Text, Button} from 'react-native';

function ReqScreen({navigation, route}) {
  // tanpa destructuring props.route
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Req Screen {route.params?.nama} </Text>
      <Button title="ke home" onPress={() => navigation.navigate('Home')} />
      <Button
        title="reim navigate"
        onPress={() => navigation.navigate('Reim')}
      />
      <Button
        title="news navigate"
        onPress={() =>
          navigation.navigate('HomeTab', {screen: 'News', params: {id: 3}})
        }
      />
    </View>
  );
}

export default ReqScreen;
