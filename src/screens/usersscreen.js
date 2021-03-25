import React, {useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
export default function Userscreen({navigation, route}) {
  // tanpa destructuring props.route
  const [image, setimage] = useState(null);
  const {username} = useSelector(state => state.Auth);

  // const openCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   })
  //     .then(image => {
  //       console.log(image);
  //       setimage(image);
  //     })
  //     .catch(err => {
  //       alert('errfoto');
  //     });
  // };

  // const sendImage = async () => {
  //   try {
  //     const options = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: 'Client-ID 25fcb0c43671f22',
  //       },
  //     };

  //     const data = new FormData();
  //     const img = {
  //       uri: image.path,
  //       type: 'image/jpeg',
  //       name: 'photo.jpg',
  //     };
  //     data.append('image', img);
  //     // data.append('data', JSON.stringify({ caption:'dari native' }))
  //     // console.log(userid)
  //     // console.log(img)
  //     const res = await axios.post(
  //       `https://api.imgur.com/3/image`,
  //       data,
  //       options,
  //     );
  //     console.log(res.data);
  //     alert('berhasil');
  //   } catch (error) {
  //     console.log(error);
  //     alert('gagal');
  //   }
  // };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text>{username}'s Screen </Text>
      {/* <Image
        source={{uri: image ? image.path : null}}
        style={{height: 350, width: '100%'}}
      /> */}
      {/* <Button title="open Camera" onPress={openCamera} /> */}
      {/* <Button title="kirim" onPress={sendImage} /> */}
      <Button title="buka drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
}
