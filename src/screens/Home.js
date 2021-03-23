import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Image,
  Dimensions,
  View,
  Platform,
  RefreshControl,
  ToastAndroid,
  Alert,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon, Badge, ListItem} from 'react-native-elements';
import {styles} from '../styles';
import {MenuIcon} from '../components';
import {useSelector} from 'react-redux';
const windowHeight = Dimensions.get('screen').height;
var angka = 0;
const Home = props => {
  const [data] = useState([
    {
      name: 'account-balance-wallet',
      color: 'purple',
      text: 'wallet',
    },
    {
      name: 'description',
      color: 'salmon',
      text: 'article',
    },
    {
      name: 'add-shopping-cart',
      color: 'teal',
      text: 'cart',
    },
    {
      name: 'shop',
      color: '#ca2c37',
      text: 'shop',
    },
    {
      name: 'book',
      color: 'steelblue',
      text: 'book',
    },
    {
      name: 'bug-report',
      color: 'black',
      text: 'bug',
    },
    {
      name: 'credit-card',
      color: 'sandybrown',
      text: 'card',
    },
    {
      name: 'favorite',
      color: 'red',
      text: 'love',
    },
  ]);

  const backAction = () => {
    //using alert
    // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => ,
    //     style: 'cancel',
    //   },
    //   {text: 'YES', onPress: () => BackHandler.exitApp()},
    // ]);

    // using toast
    if (angka === 0) {
      angka = 1;
      ToastAndroid.show('1 click back again if you wanna back', 2000);
    } else {
      BackHandler.exitApp();
    }

    return true; //jangan lupa returnnya true
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      angka = 0;
      BackHandler.addEventListener('hardwareBackPress', backAction);
    });
    props.navigation.addListener('blur', () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    });

    return () => unsubscribe;
  }, [props.navigation]); //component didmount
  // console.log(back);

  const OnReimbursePress = () => {
    props.navigation.push('Reim');
  };

  const {username} = useSelector(state => state.Auth);

  const renderMenu = () => {
    return data.map((val, index) => {
      return <MenuIcon key={index} data={val} />;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ca2c37" barStyle="light-content" />
      <ScrollView>
        <View style={{height: windowHeight / 2, marginTop: 20}}>
          <Text style={{fontSize: 12, color: 'white', marginHorizontal: 10}}>
            Dundler Mifflin, Inc
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: Platform.OS === 'android' ? 10 : 5,
              paddingHorizontal: 10,
            }}>
            <View>
              <Text style={{fontSize: 30, color: 'white', fontWeight: '700'}}>
                {username}
              </Text>
              <Text style={{color: 'white'}}>General Manager</Text>
            </View>
            <View>
              <Image
                style={{height: 70, width: 70, borderRadius: 35}}
                source={{
                  uri:
                    'https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png',
                }}
              />
            </View>
          </View>
          <View
            style={{
              height: 150,
              backgroundColor: 'white',
              borderRadius: 5,
              flexWrap: 'wrap',
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: 25,
              marginHorizontal: 10,
            }}>
            {renderMenu()}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={OnReimbursePress}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 60,
                  width: 200,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'gray'}}>Rp</Text>
                </View>
                <View style={{flex: 5, justifyContent: 'center'}}>
                  <Text style={{fontSize: 12}}>Request</Text>
                  <Text>Reimbursement</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate('Req', {nama: 'willy'})}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 60,
                  width: 200,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="today" color="gray" />
                </View>
                <View style={{flex: 5, justifyContent: 'center'}}>
                  <Text style={{fontSize: 12}}>Request</Text>
                  <Text>Time Off</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                height: 60,
                width: 200,
                marginHorizontal: 5,
                flexDirection: 'row',
                borderRadius: 5,
              }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="alarm" color="gray" />
              </View>
              <View style={{flex: 5, justifyContent: 'center'}}>
                <Text style={{fontSize: 12}}>Request</Text>
                <Text>Overtime</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            // height: windowHeight / 3,
            backgroundColor: 'white',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 14,
              paddingVertical: 10,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 19, fontWeight: '600'}}>Announcement</Text>
            <Text style={{marginTop: 5, color: 'steelblue'}}>View All</Text>
          </View>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>New Family member</ListItem.Title>
              <ListItem.Subtitle>Pam Beesly</ListItem.Subtitle>
            </ListItem.Content>
            <Badge containerStyle={{marginTop: -15, marginRight: -10}} />
            <ListItem.Subtitle style={{marginTop: -15}}>
              12 August 2021
            </ListItem.Subtitle>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>New Family member</ListItem.Title>
              <ListItem.Subtitle>Pam Beesly</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Subtitle style={{marginTop: -15}}>
              12 August 2021
            </ListItem.Subtitle>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>New Family member</ListItem.Title>
              <ListItem.Subtitle>Pam Beesly</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Subtitle style={{marginTop: -15}}>
              12 August 2021
            </ListItem.Subtitle>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>New Family member</ListItem.Title>
              <ListItem.Subtitle>Pam Beesly</ListItem.Subtitle>
            </ListItem.Content>

            <ListItem.Subtitle style={{marginTop: -15}}>
              12 August 2021
            </ListItem.Subtitle>
          </ListItem>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
