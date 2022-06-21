import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {StackActions, NavigationActions} from '@react-navigation/native';
import {logged} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Styles from '../styles';
import {HaloVerify} from '../lib/api';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '../components/Button';
import Header from '../components/Header';
import myModal from '../components/modal';
import IconArr from 'react-native-vector-icons/AntDesign';
import Colors from '../styles';
const CELL_COUNT = 4;

const Code = ({navigation, route}) => {
  const [value, setValue] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [codeErr, setCodeErr] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();
  const {code} = route.params;
  const {number} = route.params;
  const {top, bottom} = useSafeAreaInsets();
  const height = Dimensions.get('screen').height;
  console.log('heightt', height);

  const width = Dimensions.get('screen').width;
  console.log('width', width);
  const [field, setfield] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  console.log('fieldd', code, number, value);
  return (
    <View
      behaviour={'padding'}
      style={{
        backgroundColor: '#ECF0F1',
        // paddingBottom: 60,
        flex: 1,
        // height: '100%',
        // Platform.OS === 'android' ? height - top : height - (top + bottom),
        marginTop: Platform.OS === 'android' ? 0 : top,
      }}>
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

      <View
        style={{
          flex: 1.5,
          // height: 150,
          alignItems: 'center',
          // backgroundColor: 'red',
          // bottom: 100,
          justifyContent: 'center',
        }}>
        <View style={{marginTop: 0}}>
          <Text
            style={{
              color: Colors.black,
              textAlign: 'center',
              fontFamily: Colors.Medium,
              fontSize: 16,
              marginTop: 50,
            }}>
            Verification Code
          </Text>
          <Text
            style={{
              color: Colors.black,
              textAlign: 'center',
              fontFamily: Colors.Regular,
              fontSize: 14,
              marginTop: 20,
            }}>
            Please type the verification code
          </Text>
          <Text
            style={{
              color: Colors.black,
              textAlign: 'center',
              fontFamily: Colors.Regular,
              fontSize: 14,
              marginTop: 20,
            }}>
            sent to your phone.
          </Text>
        </View>
      </View>
      <View style={styles.verTextsty}>
        <View>
          <View style={{marginHorizontal: 10}}>
            <View>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType={'number-pad'}
                // returnKeyType="done"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  setfield(isFocused),
                  (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )
                )}
              />
            </View>
          </View>
        </View>
      </View>
      {codeErr && (
        <Text
          style={{marginLeft: 10, fontFamily: Colors.Regular, color: 'red'}}>
          Wrong code entered! Please try again
        </Text>
      )}

      <View
        style={{
          flex: 1.5,
          paddingHorizontal: 12,
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          Style={{
            borderRadius: 5,
          }}
          title={'Verify'}
          onPress={() => {
            if (value) {
              setShowModal(true);
              setCodeErr(false);
              HaloVerify({code: value, number: `+${code}${number}`})
                .then(res => {
                  console.log('res', res);
                  if (res.status == 'success') {
                    setCodeErr(false);
                    logged(res)(dispatch);
                    navigation.dispatch(StackActions.replace('Tabs'));
                  }
                  setShowModal(false);
                })
                .catch(eerr => {
                  console.log('error', eerr);
                  setCodeErr(true);
                  setShowModal(false);
                });
            }

            //
          }}
        />
      </View>
      {Platform.OS == 'ios' ? (
        <Image
          source={require('../assets/bottom.png')}
          style={{
            height: 100,
            // width: '100%',
            // bottom: 0,
            // position: 'absolute',
            resizeMode: 'cover',
          }}
        />
      ) : (
        keyboardStatus != 'Keyboard Shown' && (
          <Image
            source={require('../assets/bottom.png')}
            style={{
              height: 100,

              width: '100%',
              // bottom: 0,
              // position: 'absolute',
              resizeMode: 'stretch',
            }}
          />
        )
      )}
      {/* */}
      {myModal(showModal)}
    </View>
  );
};

export default Code;

const styles = StyleSheet.create({
  root: {flex: 1, paddingVertical: 16},
  title: {textAlign: 'center', fontSize: 16, color: 'black'},
  codeFieldRoot: {marginTop: 20},
  verTextsty: {
    flex: 1.5,
    paddingHorizontal: 12,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  cell: {
    width: 60,
    height: 60,
    borderRadius: 30,
    lineHeight: 60,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#979797',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  focusCell: {
    borderColor: Colors.mainColor,
  },
  fieldStyle: {marginHorizontal: 24},
  emailText: {
    fontSize: 16,
    fontFamily: Styles.Regular,
    textAlign: 'center',
    paddingVertical: 12,
    color: '#000',
  },
});
