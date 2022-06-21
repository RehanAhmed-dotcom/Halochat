import React from 'react';
import {SafeAreaView, Image, ImageBackground} from 'react-native';
import {StackActions, NavigationActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
const Splash = ({navigation}) => {
  const {isLoggedIn} = useSelector(({USER}) => USER);
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('Loginscreen');
      if (isLoggedIn) {
        navigation.dispatch(StackActions.replace('Tabs'));
      } else {
        navigation.dispatch(StackActions.replace('Auth'));
      }
    }, 2500);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        resizeMode="stretch"
        source={require('../assets/full.png')}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}>
        <Image
          resizeMode="contain"
          source={require('../assets/MainLogoApp.png')}
          style={{height: 150, width: 150}}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Splash;
