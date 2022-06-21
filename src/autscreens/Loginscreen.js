import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  // Image,
  View,
  Keyboard,
  SafeAreaView,
} from 'react-native';
// import myModal1 from '../components/modal1';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PhoneNum from '../components/PhoneNo';
import {Halologin} from '../lib/api';
import Header from '../components/Header';
import Colors from '../styles';
const Loginscreen = ({navigation}) => {
  // const [showModal, setShowModal] = useState(false);
  const USER = useSelector(({USER}) => USER);
  const {fcmtoken: fcm_token} = USER;
  console.log('token', fcm_token);
  return (
    <SafeAreaView style={styles.container}>
      <Header LeftIcon={() => null} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{paddingHorizontal: 12}}>
          <Image
            source={require('../assets/MainLogo.png')}
            resizeMode="contain"
            style={{
              width: 100,
              alignSelf: 'center',
              height: 100,
              borderRadius: 50,
            }}
          />
          <Text
            style={{
              color: Colors.black,
              textAlign: 'center',
              fontFamily: Colors.Medium,
              fontSize: 16,
              marginTop: 50,
            }}>
            Please Enter Your Phone Number
          </Text>
          {/* <Text
            style={{
              color: Colors.black,
              textAlign: 'center',
              fontFamily: Colors.Regular,
              fontSize: 14,
              marginTop: 20,
            }}>
            Please confirm your country code and enter your phone number.
          </Text> */}
        </View>
        <PhoneNum navigation={navigation} />
      </ScrollView>
      {/* {myModal(showModal)} */}
    </SafeAreaView>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
