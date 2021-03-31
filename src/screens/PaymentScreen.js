import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {ListItem, BottomSheet} from 'react-native-elements';
import {API_URL, formatDate, currencyFormatter} from '../helper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default ({route}) => {
  const [bankid, setbankid] = useState(0);
  const [visible, setvisible] = useState(false);

  const RenderBankpilihan = () => {
    if (bankid) {
      if (bankid === 1) {
        return <Text>Bank Mandiri ke rek:00011100</Text>;
      } else {
        return <Text>Bank BCA ke rek:00011100</Text>;
      }
    } else {
      return (
        <Button title="belum pilih bank" onPress={() => setvisible(true)} />
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      {RenderBankpilihan()}

      <Text>TOTAL</Text>
      <Text>UPLOAD Pembayaran</Text>
      <BottomSheet
        isVisible={visible}
        modalProps={{onRequestClose: () => setvisible(false)}}>
        <ListItem>
          <ListItem.Title>Bank Mandiri</ListItem.Title>
        </ListItem>
        <ListItem>
          <ListItem.Title>Bank BCA</ListItem.Title>
        </ListItem>
        <ListItem
          onPress={() => setvisible(false)}
          containerStyle={{backgroundColor: 'red'}}>
          <ListItem.Content>
            <ListItem.Title style={{color: 'white'}}>Close</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </View>
  );
};
