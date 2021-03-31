import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';

import {Card, Icon, Header, SearchBar} from 'react-native-elements';
import {useSelector, connect} from 'react-redux';
import {GetProductAction, FilterProductAction} from '../redux/actions';
import {debounce} from 'throttle-debounce';
var trigger = false;

export default connect(null, {GetProductAction, FilterProductAction})(
  function NewsScreen({
    navigation,
    route,
    GetProductAction,
    FilterProductAction,
  }) {
    // tanpa destructuring props.route
    const [loading, setloading] = useState(false);
    const [Refresh, setrefresh] = useState(false);
    const [search, setSearch] = useState('');
    const Products = useSelector(state => state.Products);
    const IsdarkMode = useSelector(state => state.isDark);

    // const debaunce = (func, time) => {
    //   let timeout;

    //   clearTimeout(timeout);
    //   timeout = setTimeout(func, time);
    // };

    // set componentdidupdate pada saat serach berubah
    useEffect(() => {
      if (trigger) {
        const searchdata = async () => {
          setloading(true);

          if (search) {
            await FilterProductAction(search);
          } else {
            await GetProductAction();
          }
          setloading(false);
        };
        //setup debounce //biasanya digunakan untuk onchange
        const debauncefunc = debounce(1000, searchdata);

        debauncefunc();
        // searchdata();
      } else {
        trigger = true;
      }
    }, [search]);

    const ToDetailPress = data => {
      navigation.navigate('Detail', {data: data});
    };

    const renderItem = ({item}) => (
      <TouchableWithoutFeedback onPress={() => ToDetailPress(item)}>
        <Card
          containerStyle={{
            padding: 0,
            width: '42.5%',
            backgroundColor: IsdarkMode ? '#292929' : 'white',
            // borderWidth: 0,
            borderColor: IsdarkMode ? 'black' : 'white',
          }}>
          <Card.Image
            PlaceholderContent={<ActivityIndicator />}
            source={{uri: item.img}}></Card.Image>
          <View>
            <Text style={{color: IsdarkMode ? 'white' : 'black'}}>
              {item.name}
            </Text>
            <Text style={{color: IsdarkMode ? 'white' : 'black'}}>
              {item.price}
            </Text>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );

    const onRefreshpull = async () => {
      setrefresh(true);
      await GetProductAction();
      setrefresh(false);
    };
    return (
      <View
        style={{
          flex: 1,
          padding: 0,
          backgroundColor: IsdarkMode ? '#292929' : 'white',
        }}>
        <View style={{backgroundColor: '#ca2c37', padding: 1}}>
          <SearchBar
            inputContainerStyle={{width: '100%', backgroundColor: 'white'}}
            containerStyle={{
              backgroundColor: 'transparent',
              shadowColor: 'white',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
            }}
            inputStyle={{color: 'black', shadowColor: 'white'}}
            placeholder={'Search Products..'}
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        {loading ? (
          <View style={[styles.ketengah]}>
            <ActivityIndicator color={'#ca2c37'} size="large" />
          </View>
        ) : Products.length === 0 ? (
          <View style={[styles.ketengah]}>
            <Text>Products Kosong search lagi aja bro</Text>
          </View>
        ) : (
          <FlatList
            data={Products}
            style={{marginLeft: -5}}
            renderItem={renderItem}
            keyExtractor={val => val.id}
            // onEndReachedThreshold={0.2}
            // onEndReached={() => console.log('mau diujung')}
            // columnWrapperStyle={{justifyContent: 'space-between'}}
            onRefresh={onRefreshpull}
            refreshing={Refresh}
            numColumns={2}
          />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  ketengah: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
