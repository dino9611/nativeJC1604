import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import {
  Container,
  Header,
  Content,
  Icon,
  List,
  ListItem,
  Button,
  SwipeRow,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {currencyFormatter, API_URL} from '../helper';
import {UPDATECART} from '../redux/type';
export default function Bookscreen({navigation, route}) {
  // tanpa destructuring props.route
  const dispatch = useDispatch();
  const datauser = useSelector(state => state.Auth);
  const [idxloading, setidxloading] = useState(-1);
  useEffect(() => {
    // axios
    //   .get('http://43b1fc811a29.ngrok.io/users')
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }, []);

  const deletecart = async index => {
    try {
      await setidxloading(index);

      let cart = datauser.cart;

      cart.splice(index, 1);
      let iduser = datauser.id;
      // refresh cart
      const {data} = await axios.patch(`${API_URL}/users/${iduser}`, {
        cart: cart,
      });
      dispatch({type: UPDATECART, cart: data.cart});
      alert('berhasil hapus cart');
    } catch (error) {
      console.log(error);
    } finally {
      await setidxloading(-1);
    }
  };

  const renderItem = ({item, index}) => (
    <SwipeRow
      rightOpenValue={-75}
      disableRightSwipe={true}
      body={
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: item.img}}
              style={{
                height: 80,
                width: 80,
              }}
            />
            <Text style={{alignSelf: 'center', marginHorizontal: 15}}>
              {item.name}
            </Text>
          </View>
          <View>
            <Text style={{alignSelf: 'center'}}>
              {currencyFormatter(item.price)}
            </Text>
            <Text>qty:{item.qty}</Text>
          </View>
        </View>
      }
      right={
        <Button danger onPress={() => deletecart(index)}>
          {idxloading == index ? (
            <ActivityIndicator color="white" />
          ) : (
            <Icon active name="trash" />
          )}
          {/* <ActivityIndicator color="white" /> */}
        </Button>
      }
    />
  );

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#ca2c37',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <Text style={{color: 'white', fontSize: 24, fontWeight: '700'}}>
          Cart
        </Text>
      </View>
      {datauser.cart.length ? (
        <FlatList
          data={datauser.cart}
          renderItem={renderItem}
          keyExtractor={val => val.id}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Cart kosong pencet untuk mulai belanja</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    color: 'black',
    marginBottom: 36,
  },
});
