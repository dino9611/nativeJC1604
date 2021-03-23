import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  //   TouchableOpacity,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
const windowHeight = Dimensions.get('screen').height;

class DetailScreen extends Component {
  state = {};

  render() {
    // console.log(this.props.route.params.data);
    const {img, name, price} = this.props.route.params.data;
    return (
      <View style={{flex: 1}}>
        <ImageBackground source={{uri: img}} style={{height: windowHeight / 2}}>
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
              <Icon name="arrow-back" color="black" size={30} />
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
        <View>
          <Text style={{fontSize: 30, fontWeight: '600'}}> {name}</Text>
          <Text style={{fontSize: 20, fontWeight: '600'}}> {price}</Text>
        </View>
      </View>
    );
  }
}

export default DetailScreen;
