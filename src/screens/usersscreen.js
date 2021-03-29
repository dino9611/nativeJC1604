import React, {useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
export default function Userscreen({navigation, route}) {
  // tanpa destructuring props.route
  const [image, setimage] = useState(null);
  const {username} = useSelector(state => state.Auth);

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

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text>{username}'s Screen </Text>
      {image ? (
        <Image
          source={{uri: image.path}}
          style={{height: 350, width: '100%'}}
        />
      ) : null}
      <Button title="open Camera" onPress={openCamera} />
      <Button title="kirim" onPress={sendImage} />
      <Button title="buka drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
}
