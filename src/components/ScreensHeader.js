import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ScreensHeader = ({
  title,
  imageShow,
  Icon,
  headerheight,
  titlestyle,
  guestData,
  val,
  onChange,
  search,
  navigation,
  titlview,
  image,
  Icon2,
  toggle,
  Icon3,
}) => {
  const {bottom, top} = useSafeAreaInsets();
  return (
    <View style={[styles.headerStyle, {...headerheight, marginTop: top}]}>
      {search && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            height: '100%',
            zIndex: 100,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            width: '100%',
          }}>
          <TouchableOpacity onPress={toggle}>
            <Image
              source={require('../assets/search.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="search"
            value={val}
            onChangeText={onChange}
            placeholderTextColor={'#ccc'}
            style={{paddingLeft: 10, color: 'black', width: '90%'}}
          />
        </View>
      )}

      <View
        style={[
          styles.headerTitle,
          {
            ...titlview,
            // alignItems: 'center',
            // justifyContent: 'center',
            // backgroundColor: 'red',
          },
        ]}>
        {/* {imageShow && ( */}
        <TouchableOpacity
          onPress={() =>
            guestData?.Number && navigation.navigate('UserProfile', {guestData})
          }
          activeOpacity={1}
          style={{alignItems: 'center'}}>
          <Image
            source={
              image
                ? {uri: image}
                : imageShow
                ? require('../assets/dp.png')
                : null
            }
            style={styles.image}
          />
          {/* )} */}

          <Text numberOfLines={1} style={[styles.titleStyle, {...titlestyle}]}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={1}
        style={{
          position: 'absolute',
          // backgroundColor: 'red',
          height: '100%',
          justifyContent: 'center',
        }}>
        {Icon}
      </TouchableOpacity>
      {Icon3 ? (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            backgroundColor: 'white',
            alignSelf: 'flex-end',
            // backgroundColor: 'red',
            // top: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 25,
            right: 10,
            height: '100%',
            // width: 40,
          }}>
          {Icon2}
          {Icon3}
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            backgroundColor: Icon2 ? Colors.mainColor : 'white',
            alignSelf: 'flex-end',
            top: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 25,
            right: 10,
            height: 40,
            width: 40,
          }}>
          {Icon2}
          {Icon3}
        </View>
      )}
      {/* <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          backgroundColor: Icon2 ? Colors.mainColor : 'white',
          alignSelf: 'flex-end',
          top: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 25,
          right: 10,
          height: 40,
          width: 40,
        }}>
        {Icon2}
        {Icon3}
      </View> */}
    </View>
  );
};

export default ScreensHeader;

const styles = StyleSheet.create({
  headerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 100,
    // backgroundColor: 'red',
    width: 200,
  },
  image: {
    height: 40,
    width: 40,
    top: 0,
    borderRadius: 20,
  },
  headerStyle: {
    height: 60,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 5,
    backgroundColor: 'white',
    // elevation: 5,
    shadowColor: Colors.mainColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  titleStyle: {
    color: Colors.mainColor,
    fontSize: 16,
    bottom: 3,
    fontFamily: Colors.Medium,
  },
});
