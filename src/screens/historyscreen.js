import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';

import axios from 'axios';
import {HeaderComp} from '../components';
import {API_URL, formatDate} from '../helper';
import {ListItem} from 'react-native-elements';

export default function HistoryScreen({navigation, route}) {
  // tanpa destructuring props.route

  const {id} = useSelector(state => state.Auth);
  const [History, setHistory] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await setloading(true);
        const iduser = id;
        const transaction = await axios.get(`${API_URL}/transactions`, {
          params: {
            userId: iduser,
          },
        });
        setHistory(transaction.data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      fetchData();
    });
    navigation.addListener('blur', () => {});

    return () => unsubscribe;
  }, []); //component didmount

  const renderItem = ({item, index}) => (
    <ListItem bottomDivider>
      <ListItem.Title>{index + 1}</ListItem.Title>

      <ListItem.Content>
        <ListItem.Title>{formatDate(item.tanggal)}</ListItem.Title>
        <ListItem.Subtitle>{item.status}</ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailHist', {data: item})}>
        <View
          style={{
            backgroundColor: 'white',
            borderColor: '#ca2c37',
            borderWidth: 2,
            paddingHorizontal: 15,
            paddingVertical: 5,
          }}>
          <Text style={{color: '#ca2c37', fontWeight: '700'}}>Detail</Text>
        </View>
      </TouchableOpacity>
    </ListItem>
  );
  if (loading) {
    return (
      <>
        <HeaderComp>History</HeaderComp>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color="#ca2c37" size="large" />
        </View>
      </>
    );
  }
  return (
    <View
      style={{
        flex: 1,
      }}>
      <HeaderComp>History</HeaderComp>
      <FlatList
        keyExtractor={val => val.id}
        data={History}
        renderItem={renderItem}
      />

      <View style={{paddingHorizontal: 10}}></View>
    </View>
  );
}
