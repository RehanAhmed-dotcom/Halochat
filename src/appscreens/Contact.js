import {
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
  View,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Contacts from 'react-native-contacts';
import {getUserContacts, getdata} from '../lib/api';
// import Colors from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../styles';
import ScreensHeader from '../components/ScreensHeader';
import {PermissionsAndroid} from 'react-native';
const Contact = ({navigation}) => {
  const [MainArr, setMainArr] = useState([]);
  const [contact, setContact] = useState([]);
  const [index, setIndex] = useState('');
  const [filtredList, setFiltredList] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [extraUsers, setExtraUsers] = useState([]);
  const [dbUsers, setDbUsers] = useState([]);
  // const [loadAble, setLoadAble] = useState < boolean > true;
  const [duplicatearr, setDuplicateArr] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {userdata, token} = useSelector(({USER}) => USER.userData);
  // console.log('token', token);
  const start = async () => {
    let status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
    if (status === 'denied' || status === 'never_ask_again') {
      throw Error('Permissions not granted to access Contacts');
    }
    Contacts.getAll().then(contacts => {
      // console.log('con', contacts);
      setFiltredList(contacts);
      const arr = [];
      contacts.forEach(item => {
        if (item.phoneNumbers.length > 0) {
          arr.push(item?.phoneNumbers[0]?.number);
        }
      });
      // arr = contacts.forEach(item => {
      // });
      setNumbers(arr);
      // setNumbers();
    });
  };
  // console.log('number', numbers);
  useEffect(() => {
    if (numbers.length) {
      // const data = new FormData();
      let emptyArr = [];
      numbers.forEach(item => {
        // data.append('user_number[]', item.replace(/\D/gm, ''));
        emptyArr.push(item.replace(/\D/gm, ''));
      });
      const data = {
        user_number: emptyArr,
      };
      getUserContacts({Auth: token}, data)
        .then(res => {
          console.log('we are the responce', res);
          setDbUsers(res.data);
          // var arr = filtredList.slice(0, 1).filter(function (obj) {
          //   return res.data
          //     .slice(0, 1)
          //     .filter(
          //       item =>

          //         item.email.slice(-10) ==
          //     );
          // });
          const arr = [];
          const results = filtredList.filter(obj =>
            res.data.some(item => {
              if (
                obj.phoneNumbers.length > 0 &&
                obj.phoneNumbers[0].number.replace(/\D/gm, '').slice(-10) ===
                  item.email.slice(-10).replace(/\D/gm, '')
              ) {
                // if ('3145354460' === '3145354460')
                arr.push({
                  name: obj.displayName
                    ? obj.displayName
                    : `${obj.givenName} ${obj.familyName}`,
                  fname: item.firstname,
                  lname: item.lastname,
                  number:
                    obj.phoneNumbers.length > 0 &&
                    obj.phoneNumbers[0].number.replace(/\D/gm, ''),
                  image: item.image,
                  gender: item.gender,
                  bio: item.bio,
                  fcm: item.fcm_token,
                });
              }
            }),
          );

          // setDuplicateArr(results);
          setDuplicateArr(arr);
          setMainArr(arr);
        })
        .catch(err => {
          console.log('err in contact', err);
        });
    }
  }, [numbers]);

  const filter = e => {
    // const filterArrs = contact.filter(prodItem =>
    //   prodItem.products.find(i =>
    //     i.name.toLowerCase().includes(`${e.toLowerCase()}`),
    //   ),
    // );
    // setViewFilter(filterArrs);
    let filteredName = [];
    filteredName = duplicatearr.filter(item => {
      if (Platform.OS == 'android') {
        return item.name.toLowerCase().includes(`${e.toLowerCase()}`);
      } else {
        return item.name.toLowerCase().includes(`${e.toLowerCase()}`);
      }
    });
    setMainArr(filteredName);
  };
  // const myNumber = '34234[2332]32sdfsdfdsf[][]]Z.WEPJO32./SFD323';
  // console.log('nubmer', myNumber.replace(/\D/gm, ''));
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getdata({Auth: token})
        .then(res => {
          console.log('data', res.userdata);
          setExtraUsers(res.userdata);
        })
        .catch(err => {
          console.log('err', err);
        });
      Platform.OS === 'android'
        ? start()
        : Contacts.getAll()
            .then(contacts => {
              setContact(contacts.sort());
              setFiltredList(contacts);
              // setNumbers(contacts.phoneNumbers[0].number);
              // setNumbers(contacts.forEach(item=>(

              // )))
              // console.log('contact', contacts.length);
              const arr = [];
              contacts.forEach((item, index) => {
                if (
                  item.phoneNumbers.length > 0 &&
                  item?.phoneNumbers[0]?.number.length > 10
                ) {
                  console.log('index', index);
                  arr.push(item?.phoneNumbers[0]?.number.replace(/\D/gm, ''));
                }
                // arr.push.replace('(' ,''));
              });
              // arr = contacts.forEach(item => {
              //   return
              // });
              setNumbers(arr);
            })
            .catch(e => {});
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        // navigation.navigate('Singlechatscreen', {
        //   name: item.firstname
        //     ? `${item.firstname} ${item.lastname}`
        //     : item.email,
        //   image: item.image,
        //   number: item.email,
        //   fname: item.firstname,
        //   lname: item.lastname,
        //   gender: item.gender,
        //   bio: item.bio,
        //   fcm: item.fcm_token,
        // })
        // navigation.navigate('Singlechatscreen', {
        //   name: item.displayName
        //     ? item.displayName
        //     :
        //   image: item.thumbnailPath,
        //   number:,
        // })
        navigation.navigate('Singlechatscreen', {
          name: item.name,
          image: item.image,
          number: item.number,
          fname: item.fname,
          lname: item.lname,
          gender: item.gender,
          bio: item.bio,
          fcm: item.fcm,
        })
      }
      style={{
        borderBottomWidth: 0.3,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',

        paddingVertical: 20,
      }}>
      <Image
        source={item.image ? {uri: item.image} : require('../assets/dp.png')}
        style={{height: 40, width: 40, borderRadius: 20}}
      />
      <Text
        style={{
          fontSize: 14,
          marginLeft: 10,
          fontFamily: Colors.Regular,
          color: Colors.black,
        }}>
        {Platform.OS == 'android' ? item.name : item.name}
        {/* {item.firstname ? `${item.firstname} ${item.lastname}` : item.email} */}
      </Text>
    </TouchableOpacity>
  );
  const onRefresh = () => {
    setRefreshing(true);
    // setLoadAble(true);
    // setLoading(true);
    if (Platform.OS == 'ios') {
      Contacts.getAll()
        .then(contacts => {
          setContact(contacts.sort());
          setFiltredList(contacts);
          // setNumbers(contacts.phoneNumbers[0].number);
          // setNumbers(contacts.forEach(item=>(

          // )))
          const arr = [];
          contacts.forEach(item => {
            if (item.phoneNumbers.length > 0) {
              arr.push(item.phoneNumbers[0].number.replace(/\D/gm, ''));
            }
          });
          // arr = contacts.forEach(item => {
          // });
          setNumbers(arr);
          setRefreshing(false);
        })
        .catch(e => {
          setRefreshing(false);
          console.log(e);
        });
    } else {
      start().then(res => {
        setRefreshing(false);
      });
    }
    //
    // getHomeData_API(1)
    //   .then((res) => {
    //     if (res) {
    //       const { homebanner, status, newsfeedlist } = res;
    //       if (status === "success") {
    //         Array.isArray(homebanner) && setHeading(homebanner[0]);
    //         Array.isArray(newsfeedlist) && setList(newsfeedlist);
    //       }
    //     }
    //   })
    //   .catch((e) => {})
    //   .finally(() => {
    //     setPage(2);
    //     setRefreshing(false);
    //     // setLoading(false);
    //   });
  };
  return (
    <View style={styles.container}>
      <ScreensHeader
        headerheight={{
          height: 60,
        }}
        titlestyle={{
          bottom: 38,
        }}
        title={'Contacts'}
        imageShow={false}
      />
      <View style={{backgroundColor: Colors.mainColor, flex: 1}}>
        <View style={styles.subcontainer}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor={'#ccc'}
            style={styles.input}
            value={index}
            onChangeText={text => {
              setIndex(text);
              // searchText(text);
              filter(text);
            }}
          />
          {/* <FlatList
            data={extraUsers}
            renderItem={renderItem}
            // onRefresh={onRefresh}
            // refreshing={refreshing}
            keyExtractor={item => item.number}
          /> */}
          {duplicatearr.length > 0 ? (
            <FlatList
              data={MainArr}
              renderItem={renderItem}
              // ListHeaderComponent={extraUsers}
              onRefresh={onRefresh}
              refreshing={refreshing}
              keyExtractor={item => item.number}
            />
          ) : (
            <TouchableOpacity
              // onPress={() => navigation.navigate('Contact')}
              style={{width: '100%', alignItems: 'center', marginTop: 100}}>
              <Text
                style={{
                  color: Colors.mainColor,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Invite friends
              </Text>
            </TouchableOpacity>
          )}
          <FlatList
            data={extraUsers}
            renderItem={renderItem}
            // onRefresh={onRefresh}
            // refreshing={refreshing}
            keyExtractor={item => item.number}
          />
        </View>
      </View>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  headerstyle: {
    backgroundColor: Colors.mainColor,
    height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  input: {
    height: 50,
    color: 'black',
    fontFamily: Colors.Regular,
    width: '100%',
    // borderWidth: 0.5,
    borderColor: 'grey',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  container: {flex: 1, backgroundColor: Colors.white},
  headerTitle: {
    fontSize: 16,
    fontFamily: Colors.Medium,
    color: Colors.white,
    top: 4,
  },
  subcontainer: {
    backgroundColor: 'white',
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
    padding: 12,
    // alignItems: 'center',
    // justifyContent: 'center',
    height: '100%',
    paddingVertical: 20,
    // flex: 1,
    paddingTop: 20,
  },
});
