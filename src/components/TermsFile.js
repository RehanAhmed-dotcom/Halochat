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
  View,
  NativeModules,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import myModal1 from '../components/modal1';
import Feather from 'react-native-vector-icons/Feather';
import {Halologin} from '../lib/api';
import colors from '../styles';
import Colors from '../styles';
import Button from './Button';
export default function LoginSelectorScreen({navigation}) {
  const [cca2, setCca2] = useState('PK'); // you can set ur country here
  const [callingCode, setCallingCode] = useState('44');
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

  // const _validate = () => {
  //   if (!phoneNumber) {
  //     setPhoneErr(true);
  //     return false;
  //   }
  //   return true;
  // };

  // const _getTwitterUser = async (data: SocialUserData) => {
  //   try {
  //     const res: any = await getTwitterUser(data.id);
  //     if (res) {
  //       const twitterUser = {
  //         ...data,
  //         image: res.profile_image_url,
  //         name: res.name,
  //       };
  //       _loginUser(twitterUser);
  //     }
  //   } catch (error) {}
  // };

  // const LoginApiHandler = async () => {
  //   if (_validate()) {
  //     try {
  //       const PhoneNum = '+' + callingCode + phoneNumber;
  //       const res: any = await SignupWithPhone({
  //         phone_number: PhoneNum,
  //         resend: 1,
  //       });

  //       if (res && res.status === 'success') {
  //         navigation.navigate('CodeVerification', {PhoneNum});
  //       } else {
  //         Alert.alert('Something Went Wrong');
  //       }
  //     } catch (error: any) {
  //       Alert.alert('Something Went Wrong');
  //     }
  //   }
  // };

  // const FBLogin = async () => {
  //   LoginManager.logOut();
  //   LoginManager.setLoginBehavior('web_only');
  //   LoginManager.logInWithPermissions(['email', 'public_profile']).then(
  //     function (result) {
  //       if (result.isCancelled) {
  //       } else {
  //         AccessToken.getCurrentAccessToken().then(data => {
  //           const {accessToken}: any = data;
  //           initUser(accessToken);
  //         });
  //       }
  //     },
  //     function (error) {},
  //   );
  // };

  // const twitterSignIn = () => {
  //   RNTwitterSignIn.init(
  //     Constants.TWITTER_COMSUMER_KEY,
  //     Constants.TWITTER_CONSUMER_SECRET,
  //   );
  //   RNTwitterSignIn.logIn()
  //     .then((res: any) => {
  //       const {authToken, authTokenSecret} = res;
  //       if (authToken && authTokenSecret) {
  //         const data = {
  //           email: res.email,
  //           id: res.userID,
  //           loginVia: 'twitter',
  //           image: '',
  //           name: '',
  //         };
  //         _getTwitterUser(data);
  //       }
  //     })
  //     .catch((error: any) => {});
  // };

  // const initUser = (token: string) => {
  //   fetch(
  //     'https://graph.facebook.com/v2.5/me?fields=email,name,picture.height(480),friends&access_token=' +
  //       token,
  //   )
  //     .then(response => response.json())
  //     .then(res => {
  //       const data = {
  //         email: res.email,
  //         name: res.name,
  //         id: res.id,
  //         image: res.picture.data.url,
  //         loginVia: 'facebook',
  //       };
  //       // setSocialLoginCredentials(data)(dispatch);
  //       _loginUser(data);
  //     })
  //     .catch(() => {});
  // };

  // const _loginUser = async (data: SocialUserData) => {
  //   try {
  //     const res: any = await loginUser({email: data.email, password: data.id});

  //     if (res && res.status == 'success') {
  //       setToken(res.token)(dispatch);
  //       logged(res.userdata)(dispatch);
  //     } else {
  //       _registerUser(data);
  //     }
  //   } catch (error) {}
  // };

  // const _registerUser = async (user: SocialUserData) => {
  //   try {
  //     setLoader(true);
  //     const data = new FormData();
  //     data.append('name', user.name);
  //     data.append('email', user.email);
  //     data.append('password', user.id);
  //     data.append('confirm_password', user.id);
  //     data.append('image_url', user.image);
  //     const res: any = await registerUser(data);
  //     setLoader(false);
  //     if (res && res.status == 'success') {
  //       setToken(res.message.token)(dispatch);
  //       logged(res.message.user)(dispatch);
  //     } else {
  //       Alert.alert('Something Went Wrong');
  //     }
  //   } catch (error) {
  //     setLoader(false);
  //   }
  // };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 4}}>
        <View style={styles.cardstyle}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{flexDirection: 'row', marginTop: 0}}>
              <View style={styles.countryPickerContainer}>
                <TouchableOpacity style={styles.countryPicker}>
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
                </TouchableOpacity>
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
        </View>
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
                    if (res) {
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
            By up, you agree to our
          </Text>
          {/* </TouchableOpacity> */}
          <TouchableOpacity>
            <Text
              style={{color: Colors.mainColor, fontSize: 16, marginTop: 20}}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{color: Colors.mainColor, fontSize: 16, marginTop: 20}}>
              Terms of use
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={require('../assets/bottom.png')}
        style={{
          height: 100,

          resizeMode: 'cover',
        }}
      />
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
