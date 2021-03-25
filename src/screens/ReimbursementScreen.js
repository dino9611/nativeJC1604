import React from 'react';

import {View, Text, Button} from 'react-native';

function ReimbursementScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Reimbursement Screen</Text>
      <Button title="ke home" onPress={() => navigation.navigate('Home')} />
      <Button title="reim push" onPress={() => navigation.push('Reim')} />
      <Button
        title="reim navigate"
        onPress={() => navigation.navigate('Reim')}
      />
      <Button title="go Back navigate" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default ReimbursementScreen;
