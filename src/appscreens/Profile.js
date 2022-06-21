import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputField from '../components/InputField';
import Colors from '../styles';
import Button from '../components/Button';
import {StackActions, NavigationActions} from '@react-navigation/native';
import LogoutIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import ScreensHeader from '../components/ScreensHeader';
import {logoutuser} from '../redux/actions';
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const [firsrName, setfirstName] = useState('');
  const {userdata, token} = useSelector(({USER}) => USER.userData);
  console.log('token', userdata);
  return (
    <View style={styles.container}>
      <ScreensHeader
        imageShow={false}
        headerheight={{
          height: 60,
        }}
        Icon2={
          <LogoutIcon
            name={'logout'}
            onPress={() => {
              console.log('logout');
              logoutuser(false)(dispatch);
              navigation.dispatch(StackActions.replace('Auth'));
            }}
            color={'white'}
            size={20}
            style={{marginRight: 0}}
          />
        }
        titlestyle={{
          bottom: 38,
        }}
        title={'Profile'}
      />
      <View style={{backgroundColor: Colors.mainColor, flex: 1}}>
        <View style={styles.subcontainer}>
          <ScrollView>
            <View style={styles.ProfileView}>
              <Image
                source={
                  userdata.image
                    ? {uri: userdata.image}
                    : require('../assets/dp.png')
                }
                style={styles.imgstyle}
              />

              {/* <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
                style={{
                  position: 'absolute',
                  left: 180,
                  top: 10,
                  height: 40,
                  width: 40,
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                }}>
                <Text
                  style={{
                    color: firsrName != '' ? Colors.black : 'grey',
                    fontSize: 12,

                    fontFamily: Colors.Medium,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                marginTop: 20,
                // backgroundColor: 'red',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Colors.Medium,
                  color: 'black',
                }}>{`${userdata.firstname ? userdata.firstname : ''} ${
                userdata.lastname ? userdata.lastname : ''
              }`}</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Colors.Regular,
                  color: 'black',
                }}>
                {userdata.email}
              </Text>
              <Text
                style={{
                  marginTop: 30,
                  color: 'black',
                  fontFamily: Colors.Regular,
                }}>
                {userdata.bio}
              </Text>
              <Button
                title={'Edit'}
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}
                Style={{borderRadius: 10, marginTop: 30}}
              />
              {/* <InputField
                placeholder={'First name'}
                editable={false}
                value={userdata.firstname}
                onChangeText={text => setfirstName(text)}
                Style={styles.fieldstyle}
                placeholderTextColor={'grey'}
              /> */}
            </View>
            {/* <View>
              <InputField
                placeholder={'Last name'}
                editable={false}
                value={userdata.lastname}
                Style={styles.fieldstyle}
                placeholderTextColor={'grey'}
              />
            </View> */}
            {/* <View>
              <InputField
                placeholder={'Gender'}
                value={userdata.gender}
                editable={false}
                Style={styles.fieldstyle}
                placeholderTextColor={'grey'}
              />
            </View> */}
            {/* <View>
              <InputField
                placeholder={'+92333-5196316'}
                value={userdata.email}
                editable={false}
                Style={styles.fieldstyle}
                placeholderTextColor={'black'}
              />
            </View> */}
            {/* <View>
              <InputField
                placeholder={'Bio'}
                editable={false}
                Style={styles.Biostyle}
                value={userdata.bio}
                placeholderTextColor={'grey'}
              />
            </View> */}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerstyle: {
    backgroundColor: Colors.mainColor,
    height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  container: {flex: 1, backgroundColor: Colors.white},
  headerTitle: {
    fontSize: 18,
    fontFamily: Colors.Medium,
    color: Colors.white,
    top: 4,
  },
  subcontainer: {
    backgroundColor: 'white',
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
    padding: 12,
    // paddingVertical: 120,
    flex: 1,
    paddingTop: 20,
  },
  ProfileView: {
    height: 120,
    width: 120,
    alignItems: 'center',
    // backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
  },
  fieldstyle: {
    elevation: 2,
    paddingHorizontal: 12,
    marginVertical: 4,
    color: Colors.black,
    borderRadius: 5,
    backgroundColor: Colors.chatCardcolor,
    height: 60,
  },
  imgstyle: {
    height: 120,
    resizeMode: 'cover',
    width: 120,
    // borderRadius: 40,
    borderRadius: 60,
  },
  Biostyle: {
    elevation: 2,
    paddingHorizontal: 12,
    marginVertical: 4,
    color: Colors.black,
    textAlignVertical: 'top',
    borderRadius: 5,
    backgroundColor: Colors.chatCardcolor,
    height: 100,
  },
});
