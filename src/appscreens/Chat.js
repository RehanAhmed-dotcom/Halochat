import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
// import {} from 'react-native-vector-icons/';
import moment from 'moment';
import React, {useEffect, useState, useCallback} from 'react';
import database from '@react-native-firebase/database';
import Colors from '../styles';
import {updateToken, fcmUpdateChat} from '../lib/api';
import {firebaseArray} from '../redux/actions';
import myModal from '../components/modal';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import MenuIcon from 'react-native-vector-icons/Entypo';
import SearchIcon from 'react-native-vector-icons/EvilIcons';
import CartIcon from 'react-native-vector-icons/EvilIcons';
import ScreensHeader from '../components/ScreensHeader';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

const Chat = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const {userdata, token} = useSelector(({USER}) => USER.userData);
  const {fbArray} = useSelector(({USER}) => USER);
  const [list, setList] = useState(fbArray);

  // const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [value, setValue] = useState('');
  const [extra, setExtra] = useState(fbArray);

  // const [extra, setExtra] = useState([]);
  // const [a,setA] = useState([])
  // item?.latestMessage[0]?.date
  // ? item.latestMessage[0].date
  // :
  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    // console.log('token', fcmToken);
    updateToken({Auth: token, fcm_token: fcmToken});
    messaging().onTokenRefresh(tokens => {
      updateToken({Auth: token, fcm_token: tokens});
    });
  };
  // console.log('array', fbArray);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowModal(true);
      _usersList();
    });
    return unsubscribe;
  }, [navigation]);

  const deleteConversation = (id, number) => {
    console.log(
      'userdata',
      userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
    );
    console.log('guestData', number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''));
    database()
      .ref('users/' + userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
      .remove();
    database()
      .ref('users/' + number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
      .remove();
  };

  const userData2 = {
    Name: userdata.firstname ? userdata.firstname : `USER${new Date()}`,
    Image: userdata.image,
    Number: userdata.email,
  };
  const _usersList = useCallback(async () => {
    try {
      database()
        .ref(
          'users/' + userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
        )
        .orderByChild('timestamp')
        .on('value', dataSnapshot => {
          let users = [];
          dataSnapshot.forEach(child => {
            users.push({...child.val(), key: child.key});
          });
          if (users) {
            firebaseArray(users)(dispatch);
          }
          setList(users);
          setExtra(users.reverse());
          setShowModal(false);
        });
    } catch (error) {
      setShowModal(false);
    }
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    // setLoadAble(true);
    // setLoading(true);
    _usersList()
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
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
  // console.log('list', list);
  // console.log(moment(new Date()).format('YYYY-MM-DD'));
  // console.log('list', moment(list[0].time).format('YYYY-MM-DD'));
  const searchText = e => {
    console.log('e', e);
    let filteredName = [];
    // if (e) {
    filteredName = list.filter(item => {
      // console.log(item);
      return item.user.Name.toLowerCase().includes(`${e.toLowerCase()}`);
    });
    setExtra(filteredName);
    // filteredName = [];
    // }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScreensHeader
        search={searchBar}
        imageShow={false}
        val={value}
        onChange={txt => {
          setValue(txt);
          searchText(txt);
        }}
        toggle={() => setSearchBar(!searchBar)}
        titlview={{
          justifyContent: 'center',
          width: '60%',
          alignItems: 'center',
        }}
        // Icon3={
        //   // <SearchIcon
        //   //   name={'search'}
        //   //   size={32}
        //   //   color={Colors.white}
        //   //   style={{marginRight: 12, marginTop: 0}}
        //   // />
        // }
        Icon2={
          // <CartIcon
          //   name={'cart'}
          //   size={32}
          //   color={Colors.white}
          //   style={{marginRight: 0, marginTop: 0}}
          // />
          <Image
            source={require('../assets/cart-svgrepo-com.png')}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />
          // <SearchIcon
          //   name={'search'}
          //   size={32}
          //   color={Colors.white}
          //   style={{marginRight: 12, marginTop: 0}}
          // />
        }
        title={'HaloChats'}
        titlestyle={{bottom: 35}}
        Icon={
          <Image
            source={require('../assets/search.png')}
            style={{height: 20, width: 20, marginLeft: 12}}
          />
        }
      />
      <View style={{flex: 1, backgroundColor: Colors.mainColor}}>
        <View style={styles.Card}>
          {/* <TextInput
            placeholder="Search..."
            placeholderTextColor={'#ccc'}
            style={{height: 100}}
            // value={index}
            // onChangeText={text => {
            //   // setIndex(text);
            //   // // searchText(text);
            //   // filter(text);
            // }}
          /> */}
          {list.length > 0 ? (
            <FlatList
              data={extra}
              onRefresh={onRefresh}
              refreshing={refreshing}
              contentContainerStyle={{marginHorizontal: 10}}
              renderItem={({item}) => {
                // console.log('item', item);
                return (
                  <GestureHandlerRootView>
                    <Swipeable
                      overshootLeft={false}
                      friction={2}
                      renderLeftActions={(progress, dragX) => {
                        const val = dragX.interpolate({
                          inputRange: [0, 40],
                          outputRange: [1, 1.15],
                        });
                        return (
                          <View
                            style={{
                              backgroundColor: 'red',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 20,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                // deleteConversation(item.key, item.user.Number)
                                deleteConversation(
                                  item.user.Number,
                                  item.user.Number,
                                )
                              }>
                              <Animated.Text
                                style={[
                                  {color: 'white', fontWeight: '600'},
                                  {transform: [{scale: val}]},
                                ]}>
                                Delete
                              </Animated.Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}>
                      <TouchableOpacity
                        // style={{backgroundColor: 'red'}}
                        onPress={() => {
                          setShowModal(true);
                          fcmUpdateChat({
                            Auth: token,
                            number: item.user.Number,
                          }).then(res => {
                            if (res) {
                              setShowModal(false);
                              navigation.navigate('Singlechatscreen', {
                                name: item.user.Name,
                                image: item.user.Image,
                                number: item.user.Number,
                                fname: item.user.Fname,
                                lname: item.user.Lname,
                                gender: item.user.Gender,
                                bio: item.user.Bio,
                                fcm: res.fcm_token,
                              });
                            } else {
                              setShowModal(false);
                              navigation.navigate('Singlechatscreen', {
                                name: item.user.Name,
                                image: item.user.Image,
                                number: item.user.Number,
                                fname: item.user.Fname,
                                lname: item.user.Lname,
                                gender: item.user.Gender,
                                bio: item.user.Bio,
                                fcm: item.user.Fcm,
                              });
                            }
                          });

                          // navigation.navigate('Singlechatscreen', {
                          //   name: item.user.Name,
                          //   image: item.user.Image,
                          //   number: item.user.Number,
                          //   fname: item.user.Fname,
                          //   lname: item.user.Lname,
                          //   gender: item.user.Gender,
                          //   bio: item.user.Bio,
                          //   fcm: item.user.Fcm,
                          // });
                          // console.log('item of chat', item);
                          // console.log('date', Date.now());
                        }}
                        style={{
                          paddingVertical: 10,
                          borderBottomWidth: 0.3,
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          backgroundColor: item.counter ? '#ccc' : 'white',
                          borderBottomColor: '#ccc',
                          paddingHorizontal: 2,
                        }}>
                        <View style={styles.profileStruction}>
                          <View style={styles.profileView}>
                            <Image
                              source={
                                item.user.Image
                                  ? {uri: item.user.Image}
                                  : require('../assets/dp.png')
                              }
                              style={{height: 50, width: 50, borderRadius: 25}}
                            />
                          </View>
                          <View style={{paddingLeft: 12}}>
                            <View style={styles.userNameandTime}>
                              <View style={styles.nameandTimeView}>
                                <View style={styles.name}>
                                  <Text style={styles.nameTxt}>
                                    {item.user.Name ? item.user.Name : 'user'}
                                  </Text>
                                  {item.counter ? (
                                    <View
                                      style={{
                                        backgroundColor: Colors.mainColor,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 30,
                                        width: 20,
                                        marginLeft: 10,
                                        height: 20,
                                      }}>
                                      <Text
                                        style={{color: 'white', fontSize: 12}}>
                                        {item.counter}
                                      </Text>
                                    </View>
                                  ) : null}
                                </View>
                                <View style={styles.TimeView}>
                                  {moment(new Date()).format('YYYY-MM-DD') ==
                                  moment(item.time).format('YYYY-MM-DD') ? (
                                    <Text
                                      style={[
                                        styles.MsgTxt,
                                        {
                                          fontSize: 12,
                                          fontFamily: Colors.Regular,
                                        },
                                      ]}>
                                      {moment(item.time).format('h:mm a')}
                                    </Text>
                                  ) : (
                                    <Text
                                      style={[
                                        styles.MsgTxt,
                                        {
                                          fontSize: 12,
                                          fontFamily: Colors.Regular,
                                        },
                                      ]}>
                                      {moment(item.time).format('DD-MM-YYYY')}
                                    </Text>
                                  )}
                                  {/* <Text
                              style={[
                                styles.MsgTxt,
                                {fontSize: 12, fontFamily: Colors.Regular},
                              ]}>
                              {moment(
                                item?.latestMessage[0]?.date
                                  ? item.latestMessage[0].date
                                  : item.time,
                              ).format('h:mm a')}
                            </Text> */}
                                </View>
                              </View>
                            </View>
                            <View
                              style={{
                                height: 30,
                                width: 100,
                                // backgroundColor: 'red',
                              }}>
                              <Text numberOfLines={1} style={styles.MsgTxt}>
                                {item?.latestMessage[0].msg
                                  ? item.latestMessage[0].msg
                                  : item.latestMessage.slice(-4) === '.jpg'
                                  ? 'Image'
                                  : item.latestMessage}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Swipeable>
                  </GestureHandlerRootView>
                );
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Contact')}
              style={{width: '100%', alignItems: 'center', marginTop: 100}}>
              <Text
                style={{
                  color: Colors.mainColor,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Start Chat
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {myModal(showModal)}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  Card: {
    height: '100%',
    // margin: 10,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 40,
    paddingVertical: 15,

    borderBottomRightRadius: 40,
  },
  nameandTimeView: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  name: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    height: 30,
  },

  nameTxt: {
    fontSize: 14,
    fontFamily: Colors.Medium,
    color: Colors.black,
  },
  MsgTxt: {
    fontSize: 14,
    fontFamily: Colors.Regular,
    color: 'grey',
  },
  TimeView: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    flexDirection: 'row',
    height: 40,
  },
  HeaderrightSide: {
    flexDirection: 'row',
    paddingRight: 12,
  },
  chatCard: {
    height: 60,

    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
    paddingVertical: 0,
    // backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  profileStruction: {
    alignItems: 'center',

    flexDirection: 'row',
  },
  profileView: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    // borderWidth: 1
  },
  userNameandTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
