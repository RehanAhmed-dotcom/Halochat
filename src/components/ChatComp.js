import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  View,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../styles';
import myModal1 from '../components/modal1';
import {useSelector, useDispatch} from 'react-redux';
import CrossIcon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import database from '@react-native-firebase/database';

import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
const ChatComp = ({item, onDelete}) => {
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {userdata, token} = useSelector(({USER}) => USER.userData);
  const myModal1 = () => {
    // showModal && console.log('i awake after the transaction', showModal);
    // <Modal animationType="slide" transparent={true} visible={showModal}>

    return (
      showModal === true && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setShowModal(!showModal);
          }}>
          <View
            style={{
              flex: 1,
              // height: hp(100),
              backgroundColor: '#000000',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 200,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              // position: 'absolute',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => setShowModal(!showModal)}
                style={{
                  height: 30,
                  width: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CrossIcon color={'white'} size={25} name="squared-cross" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: '85%',
                width: '100%',
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'red',
                // borderRadius: 25,
              }}>
              <Image
                source={{uri: modalImage}}
                style={{height: '100%', width: '100%'}}
                resizeMode="contain"
              />
              {/* <ActivityIndicator size="small" color="black" /> */}
            </View>
          </View>
        </Modal>
      )
    );

    // </Modal>
  };

  // console.log('items', item);

  return (
    <View style={styles.chatContainerHeights}>
      <GestureHandlerRootView>
        <Swipeable
          overshootLeft={false}
          friction={2}
          renderLeftActions={(progress, dragX) => {
            const val = dragX.interpolate({
              inputRange: [0, 40],
              outputRange: [1, 1.1],
            });
            return (
              <View
                style={{
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                }}>
                <TouchableOpacity onPress={() => onDelete(item.key, item.msg)}>
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
          {item.sendBy !=
          userdata.email.slice(-10).replace(/[^a-zA-Z0-9 ]/g, '') ? (
            <View style={[styles.chatP]}>
              <View
                style={[
                  styles.user1View,
                  {
                    paddingVertical: item.msg.slice(-4) === '.jpg' ? 2 : 20,
                    paddingHorizontal: item.msg.slice(-4) === '.jpg' ? 2 : 12,
                  },
                ]}>
                {item.msg.slice(-4) === '.jpg' ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModalImage(item.msg);
                      setShowModal(true);
                    }}
                    activeOpacity={1}
                    style={{
                      height: 150,
                      width: '100%',
                    }}>
                    <Image
                      source={{uri: item.msg}}
                      style={{
                        height: 150,
                        width: '100%',
                        borderTopRightRadius: 30,
                        borderBottomLeftRadius: 30,
                        borderBottomEndRadius: 30,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                      fontFamily: Colors.Regular,
                    }}>
                    {item.msg}
                  </Text>
                )}
              </View>
              <Text style={styles.timesetting}>
                {moment(item.date).format('h:mm a')}
              </Text>
            </View>
          ) : (
            <View style={styles.chatP}>
              <Text style={styles.timesetting}>
                {moment(item.date).format('h:mm a')}
              </Text>
              <View
                style={[
                  styles.user2View,
                  {
                    paddingVertical: item.msg.slice(-4) === '.jpg' ? 2 : 20,
                    paddingHorizontal: item.msg.slice(-4) === '.jpg' ? 2 : 12,
                  },
                ]}>
                {item.msg.slice(-4) === '.jpg' ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModalImage(item.msg);
                      setShowModal(true);
                    }}
                    activeOpacity={1}
                    style={{
                      height: 150,
                      width: '100%',
                    }}>
                    <Image
                      source={{
                        uri: item.msg,
                      }}
                      style={{
                        height: 150,
                        width: '100%',
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30,
                        // borderBottomEndRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.white,
                      fontFamily: Colors.Regular,
                    }}>
                    {item.msg}
                  </Text>
                )}
              </View>
            </View>
          )}
        </Swipeable>
      </GestureHandlerRootView>
      {myModal1(showModal, modalImage)}
    </View>
  );
};

export default ChatComp;

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  chatcontainer: {
    flex: 5,
  },
  chatContainerHeights: {margin: 0, marginHorizontal: 12, paddingTop: 20},
  chatP: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 20,
    justifyContent: 'space-between',
  },
  timesetting: {
    color: 'grey',
    fontFamily: Colors.Regular,
    fontSize: 14,
    margin: 5,
  },
  iconsview: {flexDirection: 'row', alignItems: 'center'},
  user2View: {
    backgroundColor: Colors.mainColor,
    alignSelf: 'flex-end',
    // paddingHorizontal: 0,

    flexDirection: 'row',
    height: null,
    paddingHorizontal: 12,
    // paddingTop: 6,
    paddingVertical: 20,
    width: '75%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  user1View: {
    backgroundColor: Colors.chatCardcolor,
    // elevation:3,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    flexDirection: 'row',
    // paddingVertical: 20,
    height: null,
    width: '75%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomEndRadius: 30,
  },
  parentChat: {paddingHorizontal: 6, marginTop: 20},
});
