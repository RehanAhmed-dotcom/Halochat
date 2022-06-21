import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  View,
  NativeModules,
} from 'react-native';
import {logged} from '../redux/actions';
import CountryPicker from 'react-native-country-picker-modal';
import myModal1 from '../components/modal1';
import {StackActions, NavigationActions} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {Halologin} from '../lib/api';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../styles';
import Colors from '../styles';
import Button from './Button';
export default function LoginSelectorScreen({navigation}) {
  const [cca2, setCca2] = useState('PK'); // you can set ur country here
  const [callingCode, setCallingCode] = useState('44');
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('GB');
  const [country, setCountry] = useState(null);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);
  const [onOpen, setonOpen] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log('withCallingCode', +callingCode);

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
    setCca2(country.cca2);
    setCallingCode(country.callingCode);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 4,
          // backgroundColor: 'red',
          justifyContent: 'space-between',
        }}>
        <View style={styles.cardstyle}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{flexDirection: 'row', marginTop: 0}}>
              <View style={styles.countryPickerContainer}>
                <View style={styles.countryPicker}>
                  <CountryPicker
                    {...{
                      countryCode,
                      withFilter,
                      withFlag,
                      withAlphaFilter,
                      withCallingCode,
                      withEmoji,
                      onSelect,
                    }}
                  />
                  <Text
                    style={{
                      color: 'black',

                      fontFamily: Colors.Regular,
                    }}>
                    +{callingCode}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.inputContainer,
                  {borderColor: phoneErr ? 'red' : Colors.mainColor},
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Your Phone"
                  placeholderTextColor="lightgrey"
                  returnKeyType="done"
                  value={phoneNumber}
                  onFocus={e => {
                    console.log('eee', e);
                  }}
                  onChangeText={text => {
                    setPhoneNumber(text);
                    phoneErr && setPhoneErr(false);
                  }}
                  keyboardType={'phone-pad'}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.BUttonparent}>
            {/* <Button
            textstyle={styles.Titletextstyle}
            title={'Cancel'}
            Style={styles.nextyButtonstyle}
          /> */}
            <Button
              title={'Sign Up'}
              onPress={() => {
                if (phoneNumber) {
                  setShowModal(true);
                  Halologin({number: `+${callingCode}${phoneNumber}`})
                    .then(res => {
                      console.log('res', res);
                      setShowModal(false);

                      if (res.validate == '1') {
                        logged(res)(dispatch);
                        navigation.dispatch(StackActions.replace('Tabs'));
                      } else {
                        navigation.navigate('Codescreen', {
                          code: callingCode,
                          number: phoneNumber,
                        });
                      }
                    })
                    .catch(e => {
                      setShowModal(false);
                      console.log('err', e);
                    });
                } else {
                  setPhoneErr(true);
                }
              }}
              Style={{width: '100%', borderRadius: 5}}
              textstyle={{color: Colors.white}}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            {/* <TouchableOpacity> */}
            <Text style={{color: 'black', fontFamily: Colors.Regular}}>
              By signing up, you agree to our
            </Text>
            {/* </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://halochats.com/privacy-policy/')
              }>
              <Text
                style={{color: Colors.mainColor, fontSize: 16, marginTop: 20}}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://halochats.com/terms-of-service/')
              }>
              <Text
                style={{color: Colors.mainColor, fontSize: 16, marginTop: 20}}>
                Terms of use
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://intechsol.co')}
          style={{marginTop: 30, width: '100%', alignItems: 'center'}}>
          <Text style={{color: 'black', fontFamily: Colors.Regular}}>
            Designed & Developed By
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Image
              resizeMode="contain"
              source={require('../assets/InTechSol-logo.png')}
              style={{width: 50, height: 50}}
            />
            <Text
              style={{
                marginLeft: 10,
                color: 'black',
                fontFamily: Colors.Regular,
                marginTop: 5,
                fontSize: 16,
              }}>
              IntechSol
            </Text>
          </View>
          <Text
            style={{
              marginTop: 10,
              color: 'black',
              fontFamily: Colors.Regular,
              marginBottom: 20,
            }}>
            www.intechsol.co
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Image
        source={require('../assets/bottom.png')}
        style={{
          height: 100,

          resizeMode: 'cover',
        }}
      /> */}
      {myModal1(showModal)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageback: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  BUttonparent: {
    flexDirection: 'row',
    padding: 20,
    top: 0,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewicon: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  logostyle: {
    height: 150,
    width: 150,
  },
  logotext: {
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  Titletextstyle: {
    color: Colors.mainColor,
    fontSize: 16,
  },
  nextyButtonstyle: {
    width: '40%',
    borderColor: Colors.mainColor,
    backgroundColor: null,
    borderWidth: 1,
    borderRadius: 5,
  },
  textlogo: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  cardstyle: {
    backgroundColor: null,
    margin: 15,
    borderRadius: 10,
  },
  countryPickerContainer: {
    width: 100,
    backgroundColor: null,
    borderWidth: 1,
    borderColor: Colors.mainColor,
    justifyContent: 'center',
    height: 50,
    margin: 10,
    borderRadius: 5,
  },
  countryPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    // borderWidth: 0.5,
    width: '60%',
    paddingHorizontal: 5,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: null,
    borderWidth: 1,
    borderColor: Colors.mainColor,
  },
  input: {
    fontFamily: Colors.Regular,
    flex: 1,

    color: 'black',
  },
  btnContainer: {
    height: 45,
    backgroundColor: 'green',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnLogo: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
});
