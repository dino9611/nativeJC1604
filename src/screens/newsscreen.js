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

const DATA = [
  {
    id: 1,
    name: 'Nike Air Brown',
    img:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80',
    price: 1987000,
    stock: 8,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor vitae purus faucibus. In fermentum et sollicitudin ac orci phasellus egestas tellus. Eget sit amet tellus cras. ',
  },
  {
    id: 2,
    name: 'Nike Air Jordan',
    img:
      'https://images.unsplash.com/photo-1597248881519-db089d3744a5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    price: 2543000,
    stock: 9,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor vitae purus faucibus. In fermentum et sollicitudin ac orci phasellus egestas tellus. Eget sit amet tellus cras. ',
  },
  {
    id: 3,
    name: 'Nike Revolt',
    img:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    price: 1765000,
    stock: 6,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor vitae purus faucibus. In fermentum et sollicitudin ac orci phasellus egestas tellus. Eget sit amet tellus cras. ',
  },
  {
    id: 4,
    name: 'Nike Green',
    img:
      'https://images.unsplash.com/photo-1596568359553-a56de6970068?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1028&q=80',
    price: 2143000,
    stock: 7,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor vitae purus faucibus. In fermentum et sollicitudin ac orci phasellus egestas tellus. Eget sit amet tellus cras. ',
  },
  {
    id: 5,
    name: 'Nike Air Brown',
    img:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80',
    price: 1987000,
    stock: 8,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor vitae purus faucibus. In fermentum et sollicitudin ac orci phasellus egestas tellus. Eget sit amet tellus cras. ',
  },
  {
    id: 6,
    name: 'Nike Air Jordan',
    img:
      'https://images.unsplash.com/photo-1597248881519-db089d3744a5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    price: 2543000,
    stock: 9,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor vitae purus faucibus. In fermentum et sollicitudin ac orci phasellus egestas tellus. Eget sit amet tellus cras. ',
  },
  {
    id: 7,
    name: 'Nike Revolt',
    img:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    price: 1765000,
    stock: 6,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor vitae purus faucibus. In fermentum et sollicitudin ac orci phasellus egestas tellus. Eget sit amet tellus cras. ',
  },
  {
    id: 8,
    name: 'Nike Green',
    img:
      'https://images.unsplash.com/photo-1596568359553-a56de6970068?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1028&q=80',
    price: 2143000,
    stock: 7,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor vitae purus faucibus. In fermentum et sollicitudin ac orci phasellus egestas tellus. Eget sit amet tellus cras. ',
  },
];

export default function NewsScreen({navigation, route}) {
  // tanpa destructuring props.route
  // check orientation
  const isPortrait = () => {
    const dim = Dimensions.get('window');

    return dim.height >= dim.width;
  };
  const [orientation, setorientation] = useState(
    isPortrait() ? 'portrait' : 'landscape',
  );
  const [Refresh, setrefresh] = useState(false);
  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setorientation(isPortrait() ? 'portrait' : 'landscape');
    });

    return () => {
      Dimensions.removeEventListener('change');
    }; // component willunmount
  }, []); // component didmount

  const ToDetailPress = data => {
    navigation.navigate('Detail', {data: data});
  };

  const renderItem = ({item}) => (
    <TouchableWithoutFeedback onPress={() => ToDetailPress(item)}>
      <Card containerStyle={{padding: 0, flex: 1}}>
        <Card.Image source={{uri: item.img}}></Card.Image>
        <View>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );

  const onRefreshpull = () => {
    setrefresh(true);
    setTimeout(() => {
      setrefresh(false);
    }, 2000);
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={val => val.id}
        onEndReachedThreshold={0.2}
        onEndReached={() => console.log('mau diujung')}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        onRefresh={onRefreshpull}
        refreshing={Refresh}
        numColumns={2}
      />
    </View>
  );
}

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
