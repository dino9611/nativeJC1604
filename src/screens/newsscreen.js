import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {useSelector, connect} from 'react-redux';
import {GetProductAction} from '../redux/actions';

export default connect(null, {GetProductAction})(function NewsScreen({
  navigation,
  route,
  GetProductAction,
}) {
  // tanpa destructuring props.route

  const [Refresh, setrefresh] = useState(false);
  const Products = useSelector(state => state.Products);
  const ToDetailPress = data => {
    navigation.navigate('Detail', {data: data});
  };

  const renderItem = ({item}) => (
    <TouchableWithoutFeedback onPress={() => ToDetailPress(item)}>
      <Card containerStyle={{padding: 0, width: '42.5%'}}>
        <Card.Image source={{uri: item.img}}></Card.Image>
        <View>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );

  const onRefreshpull = async () => {
    setrefresh(true);
    await GetProductAction();
    setrefresh(false);
  };
  return (
    <View style={{flex: 1, padding: 0}}>
      <FlatList
        data={Products}
        style={{marginLeft: -5}}
        renderItem={renderItem}
        keyExtractor={val => val.id}
        onEndReachedThreshold={0.2}
        onEndReached={() => console.log('mau diujung')}
        // columnWrapperStyle={{justifyContent: 'space-between'}}
        onRefresh={onRefreshpull}
        refreshing={Refresh}
        numColumns={2}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
