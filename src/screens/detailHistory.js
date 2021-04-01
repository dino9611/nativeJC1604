import React from 'react';
import {View, Text, Button, Image, FlatList} from 'react-native';

import {ListItem} from 'react-native-elements';
import {currencyFormatter} from '../helper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default ({route, navigation}) => {
  const renderItem = ({item, index}) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Detail', {data: item, islook: true})}>
      <ListItem bottomDivider>
        <ListItem.Title>{index + 1}</ListItem.Title>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>
            {currencyFormatter(item.price)} X {item.qty} pcs
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Subtitle>
          {currencyFormatter(item.qty * item.price)}
        </ListItem.Subtitle>
      </ListItem>
    </TouchableWithoutFeedback>
  );

  const TotalTransaksi = () => {
    return route.params.data.products.reduce((prevval, val) => {
      return prevval + val.qty * val.price;
    }, 0);
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        keyExtractor={val => val.id}
        data={route.params.data.products}
        renderItem={renderItem}
      />
      <ListItem bottomDivider>
        <ListItem.Title></ListItem.Title>
        <ListItem.Content>
          <ListItem.Title>TOTAL</ListItem.Title>
        </ListItem.Content>
        <ListItem.Title>{currencyFormatter(TotalTransaksi())}</ListItem.Title>
      </ListItem>
      {route.params.data.status === 'belum bayar' ? (
        <View>
          <Button
            title="Bayar"
            color="#ca2c37"
            onPress={() =>
              navigation.navigate('Payment', {data: route.params.data})
            }
          />
        </View>
      ) : null}
    </View>
  );
};
