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
  Button as ButtonNb,
  SwipeRow,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {currencyFormatter, API_URL} from '../helper';
import {UPDATECART} from '../redux/type';
import {FlatList} from 'react-native';
import {HeaderComp} from '../components';
export default function Bookscreen({navigation, route}) {
  // tanpa destructuring props.route
  const dispatch = useDispatch();
  const datauser = useSelector(state => state.Auth);
  const [idxloading, setidxloading] = useState(-1);
  const [checkload, setcheckload] = useState(false);
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

  const onCheckoutPress = async () => {
    try {
      setcheckload(true);
      let iduser = datauser.id;
      //* data input to transaksi
      let data = {
        userId: iduser,
        tanggal: new Date(),
        status: 'belum bayar',
        products: datauser.cart,
        bankId: 0,
        bukti: '',
      };
      //* post transaksi
      await axios.post(`${API_URL}/transactions`, data);
      //* edit stok products
      var cart = datauser.cart;
      // get all product
      const products = await axios.get(`${API_URL}/products`);
      var Productsadmin = products.data;
      for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < Productsadmin.length; j++) {
          if (cart[i].id === Productsadmin[j].id) {
            let stokakhir = Productsadmin[j].stock - cart[i].qty;
            await axios.patch(`${API_URL}/products/${Productsadmin[j].id}`, {
              stok: stokakhir,
            });
          }
        }
      }
      // kosongin cart
      var res1 = await axios.patch(`${API_URL}/users/${iduser}`, {cart: []});
      // refresh cart dan beri alert
      dispatch({type: UPDATECART, cart: res1.data.cart});
      alert('berhasil checkout');
    } catch (error) {
      console.log(error);
      alert('network error');
    } finally {
      setcheckload(false);
    }
  };

  const Isibutton = () => {
    if (checkload) {
      return <ActivityIndicator color="white" />;
    } else {
      return <Text style={{fontWeight: 'bold', color: 'white'}}>ChekOut</Text>;
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
        <ButtonNb danger onPress={() => deletecart(index)}>
          {idxloading == index ? (
            <ActivityIndicator color="white" />
          ) : (
            <Icon active name="trash" />
          )}
        </ButtonNb>
      }
    />
  );

  const total = () => {
    const cart = datauser.cart;
    const arr = [];

    return cart.reduce((prevval, val) => {
      return prevval + val.price * val.qty;
    }, 0);
  };
  if (datauser.cart.length) {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <HeaderComp>Cart</HeaderComp>
        <FlatList
          data={datauser.cart}
          renderItem={renderItem}
          keyExtractor={val => val.id}
        />
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            elevation: 4,
          }}>
          <View style={{flex: 1, padding: 10}}>
            <Text>Total biaya :</Text>
            <Text style={{fontWeight: 'bold'}}>
              {currencyFormatter(total())}
            </Text>
          </View>
          <View style={{flex: 1, padding: 10}}>
            <ButtonNb
              style={{
                width: '100%',
                backgroundColor: '#ca2c37',
                justifyContent: 'center',
              }}
              onPress={onCheckoutPress}
              disabled={checkload}>
              {Isibutton()}
            </ButtonNb>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Cart kosong pencet untuk mulai belanja</Text>
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
