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
import {API_URL} from '../helper';
const windowHeight = Dimensions.get('window').height;

class DetailScreen extends Component {
  state = {
    loading: false,
  };

  onAddTocartPress = async () => {
    try {
      this.setState({loading: true});
      const products = this.props.route.params.data;
      const iduser = this.props.dataUser.id;
      const res = await axios.get(`${API_URL}/users/${iduser}`);

      const cart = res.data.cart;
      cart.push(products);
      var updatePRoduct = await axios.patch(`${API_URL}/users/${iduser}`, {
        cart: cart,
      });
      console.log(updatePRoduct.data);
      Alert.alert('cart berhasil dimasukkan');
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({loading: false});
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
          <View>
            <Text style={{fontSize: 30, fontWeight: '600'}}> {name}</Text>
            <Text style={{fontSize: 20, fontWeight: '600'}}> {price}</Text>
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
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>{price}</Text>
          </View>
          <Button
            title="Add cart"
            containerStyle={{flex: 2}}
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
export default connect(MapstatetoProps)(DetailScreen);
