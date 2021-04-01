import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {ListItem, BottomSheet} from 'react-native-elements';
import {API_URL, formatDate, currencyFormatter} from '../helper';

export default ({route, navigation}) => {
  const [bankid, setbankid] = useState(0);
  const [visible, setvisible] = useState(false);
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);
  const RenderBankpilihan = () => {
    if (bankid) {
      if (bankid === 1) {
        return (
          <View>
            <Text>Bank Mandiri ke rek:00011100</Text>
            <Button title="ganti Bank ?" onPress={() => setvisible(true)} />
          </View>
        );
      } else {
        return (
          <View>
            <Text>Bank Mandiri ke rek:00011100</Text>
            <Button title="ganti Bank ?" onPress={() => setvisible(true)} />
          </View>
        );
      }
    } else {
      return (
        <Button title="belum pilih bank" onPress={() => setvisible(true)} />
      );
    }
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    })
      .then(image => {
        console.log(image);
        setimage(image);
      })
      .catch(err => {
        alert('errfoto');
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    })
      .then(image => {
        console.log(image);
        setimage(image);
      })
      .catch(err => {
        alert('errfoto');
      });
  };

  const UploadPembayaran = async () => {
    try {
      if (!bankid) {
        alert('pilih bank dulu');
      } else {
        setloading(true);
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

        const res = await axios.post(
          `https://api.imgur.com/3/image`,
          data,
          options,
        );
        console.log(res.data.data.link);
        const idtrx = route.params.data.id;
        const UpdateData = {
          status: 'Berhasil',
          tanggal: new Date(),
          bukti: res.data.data.link,
          bankId: bankid,
        };
        await axios.patch(`${API_URL}/transactions/${idtrx}`, UpdateData);
        alert('berhasil bayar');
        navigation.navigate('HomeTab', {
          screen: 'History',
        });
      }
    } catch (error) {
      console.log(error);
      alert('gagal');
    } finally {
      setloading(false);
    }
  };

  const TotalTransaksi = () => {
    return route.params.data.products.reduce((prevval, val) => {
      return prevval + val.qty * val.price;
    }, 0);
  };

  const PilihBank = idbank => {
    setbankid(idbank);
    setvisible(false);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {image ? (
          <>
            <Image
              style={{width: '100%', height: 400}}
              source={{uri: image.path}}
            />
            <TouchableOpacity onPress={() => setimage(null)}>
              <View
                style={{
                  borderColor: '#ca2c37',
                  borderWidth: 1,
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  borderStyle: 'dashed',
                  borderRadius: 1, // harus tambah ini jika mau ada dotted atau dashed
                }}>
                <Text>Hapus FOTO</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={UploadPembayaran}>
              <View
                style={{
                  borderColor: '#ca2c37',
                  borderWidth: 1,
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  borderStyle: 'dashed',
                  borderRadius: 1, // harus tambah ini jika mau ada dotted atau dashed
                }}>
                {loading ? (
                  <ActivityIndicator color="#ca2c37" />
                ) : (
                  <Text>Upload Pembayaran</Text>
                )}
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={openGallery}>
              <View
                style={{
                  borderColor: '#ca2c37',
                  borderWidth: 1,
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  borderStyle: 'dashed',
                  borderRadius: 1, // harus tambah ini jika mau ada dotted atau dashed
                }}>
                <Text>Upload from Gallery</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
              <View
                style={{
                  borderColor: '#ca2c37',
                  borderWidth: 1,
                  marginTop: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  borderStyle: 'dashed',
                  borderRadius: 1, // harus tambah ini jika mau ada dotted atau dashed
                }}>
                <Text>Upload from Camera</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text>TOTAL : {currencyFormatter(TotalTransaksi())}</Text>
      {RenderBankpilihan()}
      <BottomSheet
        isVisible={visible}
        modalProps={{onRequestClose: () => setvisible(false)}}>
        <ListItem onPress={() => PilihBank(1)}>
          <ListItem.Title>Bank Mandiri</ListItem.Title>
        </ListItem>
        <ListItem onPress={() => PilihBank(2)}>
          <ListItem.Title>Bank BCA</ListItem.Title>
        </ListItem>
        <ListItem
          onPress={() => setvisible(false)}
          containerStyle={{backgroundColor: 'red'}}>
          <ListItem.Content>
            <ListItem.Title style={{color: 'white'}}>Close</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </View>
  );
};
