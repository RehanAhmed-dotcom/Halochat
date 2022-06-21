import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  View,
  Keyboard,
  SafeAreaView,
} from 'react-native';
// import myModal1 from '../components/modal1';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import IconArr from 'react-native-vector-icons/AntDesign';
import TermsFile from '../components/PhoneNo';
import {Halologin} from '../lib/api';
import Header from '../components/Header';
import Colors from '../styles';
const Terms = ({navigation}) => {
  // const [showModal, setShowModal] = useState(false);
  const USER = useSelector(({USER}) => USER);
  const {fcmtoken: fcm_token} = USER;
  console.log('token', fcm_token);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        LeftIcon={() => (
          <IconArr
            name={'arrowleft'}
            color={Colors.mainColor}
            size={28}
            onPress={() => navigation.goBack()}
          />
        )}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{height: 100, paddingHorizontal: 12}}>
          <Text
            style={{
              color: Colors.black,
              textAlign: 'center',
              fontFamily: Colors.Medium,
              fontSize: 16,
              marginTop: 50,
            }}>
            Terms and Conditions
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
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 4,
              //   backgroundColor: 'red',
              justifyContent: 'space-between',
            }}>
            <View style={{paddingHorizontal: 20}}>
              <Text style={{fontFamily: Colors.Regular}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </View>
            <Image
              source={require('../assets/bottom.png')}
              style={{
                height: 100,

                resizeMode: 'cover',
              }}
            />
          </View>
        </View>
      </ScrollView>
      {/* {myModal(showModal)} */}
    </SafeAreaView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
