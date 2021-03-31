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
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {HeaderComp} from '../components';
import {API_URL, formatDate} from '../helper';
import {ListItem} from 'react-native-elements';

export default function HistoryScreen({navigation, route}) {
  // tanpa destructuring props.route
  const [image, setimage] = useState(null);
  const {username, id} = useSelector(state => state.Auth);
  const [History, setHistory] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
    fetchData();
  }, []);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        console.log(image);
        setimage(image);
      })
      .catch(err => {
        alert('errfoto');
      });
  };

  const sendImage = async () => {
    try {
      const options = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Client-ID 21e15627cc57fae',
        },
      };

      const data = new FormData();
      // membuat file
      const img = {
        uri: image.path,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      // file dikirimkan
      data.append('image', img);

      // const res= await axios.get('https://api.thecatapi.com/v1/images/search',{
      //   headers:{
      //     'x-api-key':'b8c7007f-fde3-40b6-997d-4f508b8b25c4'
      //   },
      //   params:{
      //     limit:10
      //   }
      // })

      const res = await axios.post(
        `https://api.imgur.com/3/image`,
        data,
        options,
      );
      console.log(res.data);
      alert('berhasil');
    } catch (error) {
      console.log(error);
      alert('gagal');
    }
  };

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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color="#ca2c37" size="large" />
      </View>
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
