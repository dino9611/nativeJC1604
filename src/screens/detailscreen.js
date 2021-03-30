import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  //   TouchableOpacity,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon, Button} from 'react-native-elements';
import {connect} from 'react-redux';

import axios from 'axios';
import {API_URL, currencyFormatter} from '../helper';
import {UpdateCartAction} from '../redux/actions';
const windowHeight = Dimensions.get('window').height;

class DetailScreen extends Component {
  state = {
    loading: false,
    description: false,
    qty: 1,
  };

  onAddTocartPress = async () => {
    try {
      this.setState({loading: true});
      const products = this.props.route.params.data;
      const iduser = this.props.dataUser.id;
      const res = await axios.get(`${API_URL}/users/${iduser}`);
      const qty = this.state.qty;
      const cart = res.data.cart;

      let idx = cart.findIndex(val => val.id === products.id);
      if (idx < 0) {
        var productcart = {
          ...products,
          qty: qty,
        };
        cart.push(productcart);
        var updatePRoduct = await axios.patch(`${API_URL}/users/${iduser}`, {
          cart: cart,
        });
        this.props.UpdateCartAction(updatePRoduct.data.cart);
        alert('cart berhasil dimasukkan');
      } else {
        // cart[idx].qty+=qty
        let qtysudahditambah = cart[idx].qty + qty;
        if (qtysudahditambah > products.stock) {
          var qtyablebuy = products.stock - cart[idx].qty;
          alert('product melebihi stock hanya bisa beli ' + qtyablebuy);
        } else {
          cart[idx].qty = qtysudahditambah;
          const usersdata = await axios.patch(`${API_URL}/users/${iduser}`, {
            cart: cart,
          }); // ?ekspektasi data yang dikrim harus object
          this.props.UpdateCartAction(usersdata.data.cart);
          alert('cart berhasil dimasukkan');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({loading: false});
    }
  };

  minusqty = () => {
    let aftermin = this.state.qty - 1;
    if (aftermin === 0) {
      alert('qty tidak boleh kosong');
    } else {
      this.setState({qty: aftermin});
    }
  };

  addQty = () => {
    let {stock} = this.props.route.params.data;
    let afteradd = this.state.qty + 1;
    if (afteradd > stock) {
      alert('qty melebihi stock');
    } else {
      this.setState({qty: afteradd});
    }
  };

  render() {
    // console.log(this.props.route.params.data);
    const {img, name, price, description} = this.props.route.params.data;
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{height: windowHeight * (9 / 10)}}>
          <ImageBackground
            source={{uri: img}}
            style={{height: windowHeight / 2}}>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.goBack()}>
              <View
                style={{
                  backgroundColor: '#EDEDEDA6',
                  position: 'absolute',
                  borderRadius: 20,
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: 20,
                  left: 10,
                  elevation: 2,
                  //   padding: 5,
                }}>
                <Icon name="arrow-back" color="#ca2c37" size={30} />
              </View>
            </TouchableWithoutFeedback>
          </ImageBackground>
          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontSize: 30, fontWeight: '600'}}>{name}</Text>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              {currencyFormatter(price)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Button
                title="-"
                buttonStyle={{marginHorizontal: 10, borderRadius: 20}}
                onPress={this.minusqty}
              />
              <Text style={{paddingVertical: 10}}>{this.state.qty}</Text>
              <Button
                title="+"
                buttonStyle={{marginHorizontal: 10, borderRadius: 20}}
                onPress={this.addQty}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            height: windowHeight * (1 / 10),
            shadowColor: '#000',
            backgroundColor: 'white',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.3,

            elevation: 13,
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>{currencyFormatter(price)}</Text>
          </View>
          <Button
            title="Add cart"
            containerStyle={{flex: 3}}
            buttonStyle={{height: '100%', backgroundColor: '#ca2c37'}}
            titleStyle={{fontSize: 18}}
            loading={this.state.loading}
            onPress={this.onAddTocartPress}
          />
        </View>
      </View>
    );
  }
}

const MapstatetoProps = ({Auth}) => {
  return {
    dataUser: Auth,
  };
};
export default connect(MapstatetoProps, {UpdateCartAction})(DetailScreen);
