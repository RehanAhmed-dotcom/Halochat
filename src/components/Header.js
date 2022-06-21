import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import Colors from '../styles';
const Header = ({title, left = true, LeftIcon, navigation}) => {
  return (
    // <ImageBackground
    //   source={require('../assets/top.png')}
    //   resizeMode="stretch"
    //   style={{
    //     opacity: 1,
    //     // backgroundColor: 'red',
    //     // marginTop: 00,
    //     height: 100,
    //     width: '100%',
    //   }}>
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 12,
        height: 70,
        alignItems: 'center',
      }}>
      {left ? <View>{<LeftIcon navigation={navigation} />}</View> : null}
      <Text style={styles.titlstyle}>{title}</Text>
    </View>
    // </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  titlstyle: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: Colors.Medium,
    paddingLeft: 12,
  },
});
