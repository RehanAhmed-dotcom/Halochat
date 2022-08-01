import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import myModal1 from '../components/modal1';
import RadioButton from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useEffect, useState} from 'react';
import InputField from '../components/InputField';
import Colors from '../styles';
import {edit} from '../lib/api';
import Radio from '../components/RadioButton';
import {update} from '../redux/actions';
import ImagePicker from 'react-native-image-crop-picker';
import CameraIcon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import ScreensHeader from '../components/ScreensHeader';
import Arrow from 'react-native-vector-icons/AntDesign';
const EditProfile = ({navigation}) => {
  const {userdata, token} = useSelector(({USER}) => USER.userData);
  const dispatch = useDispatch();
  const [pic, setPic] = useState(userdata.image);
  const [fname, setFname] = useState(userdata.firstname);
  const [lname, setLname] = useState(userdata.lastname);
  const [gender, setGender] = useState(userdata.gender);
  const [number, setNumber] = useState(userdata.email);
  const [showDown, setShowDown] = useState(false);
  const [bio, setBio] = useState(userdata.bio);
  const [showModal, setShowModal] = useState(false);
  const choosePic = () => {
    ImagePicker.openPicker({
      width: 512,
      height: 512,
      cropping: true,
    }).then(image => {
      setPic(image.path);
    });
  };
  console.log('gender', gender);
  // console.log('pic', pic);
  // console.log('fnmae', fname);
  // console.log('auth', token);
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  return (
    <View style={styles.container}>
      <ScreensHeader
        navigation={navigation}
        title={'Edit Profile'}
        titlestyle={{
          bottom: 38,
        }}
        Icon={
          <Arrow
            name={'left'}
            onPress={() => navigation.goBack()}
            size={20}
            style={{marginLeft: 12, marginTop: 0}}
            color={Colors.mainColor}
          />
        }
      />
      <Wrapper behavior={'padding'}>
        <ScrollView>
          <View style={styles.subcontainer}>
            <TouchableOpacity onPress={choosePic} style={styles.ProfileView}>
              <Image
                source={
                  pic
                    ? {
                        uri: pic,
                        // ? 'file:///storage/emulated/0/Android/data/com.halochat/files/Pictures/3448096b-8334-4842-8dcd-085bcbb19fe2.jpg'
                        // : 'https://images.unsplash.com/photo-1602546005687-372f3c6455ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                      }
                    : require('../assets/dpIcon.png')
                }
                style={styles.imgstyle}
              />
              {!pic && (
                <>
                  <View
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      height: 100,
                      width: 100,
                      borderRadius: 100 / 2,
                      opacity: 0.3,
                      backgroundColor: '#000',
                    }}></View>
                  <View
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      top: 35,
                    }}>
                    <CameraIcon
                      name={'camera'}
                      size={26}
                      color={Colors.white}
                    />
                  </View>
                </>
              )}
            </TouchableOpacity>
            <View style={{marginTop: 20}}>
              <InputField
                placeholder={'John'}
                value={fname}
                onChangeText={text => setFname(text)}
                Style={styles.fieldstyle}
                placeholderTextColor={'black'}
              />
            </View>
            <View>
              <InputField
                placeholder={'Smith'}
                onChangeText={text => setLname(text)}
                value={lname}
                Style={styles.fieldstyle}
                placeholderTextColor={'black'}
              />
            </View>
            <View>
              <View
                style={{
                  height: 60,
                  backgroundColor: Colors.chatCardcolor,
                  borderRadius: 5,
                  elevation: 2,
                  paddingHorizontal: 12,
                  marginVertical: 4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>
                  {gender == 'Male'
                    ? 'Male'
                    : gender == 'Female'
                    ? 'Female'
                    : 'Select Gender'}
                </Text>
                <Arrow
                  name="caretdown"
                  size={20}
                  color={'black'}
                  onPress={() => setShowDown(!showDown)}
                />
              </View>
              {showDown && (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setGender('Male');
                      setShowDown(!showDown);
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: Colors.chatCardcolor,
                      paddingHorizontal: 12,
                      height: 60,
                      justifyContent: 'center',
                      paddingLeft: 10,
                    }}>
                    <Text>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setGender('Female');
                      setShowDown(!showDown);
                    }}
                    style={{
                      borderRadius: 5,
                      backgroundColor: Colors.chatCardcolor,
                      paddingHorizontal: 12,
                      marginTop: 4,
                      justifyContent: 'center',
                      paddingLeft: 10,
                      height: 60,
                    }}>
                    <Text>Female</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* <Text style={{fontSize: 16, color: 'black'}}>Gender</Text>
              {/* <Radio /> 
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <TouchableOpacity
                  onPress={() => setGender('Male')}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    color={Colors.mainColor}
                    size={20}
                    name={
                      gender == 'Male' ? 'radiobox-marked' : 'radiobox-blank'
                    }
                  />
                  <Text style={{marginLeft: 10, color: 'black'}}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender('Female')}
                  style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                    alignItems: 'center',
                  }}>
                  <RadioButton
                    color={Colors.mainColor}
                    size={20}
                    name={
                      gender == 'Female' ? 'radiobox-marked' : 'radiobox-blank'
                    }
                  />
                  <Text style={{marginLeft: 10, color: 'black'}}>Female</Text>
                </TouchableOpacity>
              </View>*/}
            </View>
            <View>
              <InputField
                placeholder={'+92333-5196316'}
                value={number}
                editable={false}
                Style={styles.fieldstyle}
                placeholderTextColor={'black'}
              />
            </View>
            <View>
              {/* <InputField
                placeholder={'Bio'}
                multiline
                numberOfLines={4}
                Style={{width:"100%"}}
                value={bio}
                onChangeText={text => setBio(text)}
                placeholderTextColor={'black'}
              /> */}
              <TextInput
                value={bio}
                placeholder={'Bios'}
                onChangeText={text => setBio(text)}
                multiline
                textAlignVertical="top"
                numberOfLines={5}
                style={{
                  elevation: 2,
                  paddingHorizontal: 12,
                  marginVertical: 4,
                  borderRadius: 5,
                  justifyContent: 'flex-start',
                  // alignItems: 'flex-start',
                  color: 'black',
                  backgroundColor: Colors.chatCardcolor,
                  height: 150,
                }}
                placeholderTextColor={'black'}
              />
            </View>
            <View style={{marginTop: '30%', marginBottom: 30}}>
              <Button
                title={'Save'}
                onPress={() => {
                  setShowModal(true);
                  const data = new FormData();
                  fname && data.append('firstname', fname);
                  lname && data.append('lastname', lname);
                  gender && data.append('gender', gender);
                  bio && data.append('bio', bio);
                  pic != null &&
                    data.append('image', {
                      uri: pic,
                      type: 'image/jpeg',
                      name: 'image' + new Date() + '.jpg',
                    });
                  edit({Auth: token}, data)
                    .then(res => {
                      console.log('res', res);
                      setShowModal(false);
                      update(res)(dispatch);
                      navigation.goBack();
                    })
                    .catch(e => {
                      setShowModal(false);
                      console.log('err', e);
                    });
                }}
                Style={{borderRadius: 10}}
              />
            </View>
          </View>
        </ScrollView>
      </Wrapper>
      {myModal1(showModal)}
    </View>
  );
};

export default EditProfile;

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
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 12,
    paddingVertical: 60,
    paddingTop: 20,
  },
  ProfileView: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: 'center',
  },
  fieldstyle: {
    elevation: 2,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 5,
    color: 'black',
    backgroundColor: Colors.chatCardcolor,
    height: 60,
  },
  imgstyle: {
    height: 100,

    width: 100,
    borderRadius: 100 / 2,
  },
  Biostyle: {
    elevation: 2,
    paddingHorizontal: 12,
    marginVertical: 4,
    textAlignVertical: 'top',
    borderRadius: 5,
    backgroundColor: Colors.chatCardcolor,
    height: 100,
  },
});
