import React, {useEffect, useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  Alert,
  View,
  Dimensions,
} from 'react-native';
import Colors from '../styles';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('screen');

// import RTcEngine from 'react-native-agora';
const Jitsi = ({navigation, route}) => {
  const [videoCall, setVideoCall] = useState(true);
  const {callType, guestData, channel, Name, Number} = route.params;
  const [callConnected, setCallConnected] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const {userdata, token} = useSelector(({USER}) => USER.userData);

  console.log('channel', channel);
  // RTcEngine
  const rtcProps = {
    appId: '1cdd89a3923d40b0a2e31ab50e6395d2',
    channel: `${channel}`,
    // appCertificate: '93eb8c694ab74924a3589cfe551ef7e9',
    // secured: false,

    //
    // '006610e09a264ba41158f7fdeaf67f0f033IAAUVzCYq4wG13qquy+uA2CqtaTfzI9KVwx+zXMVZ4V9kvU+y2EAAAAAEABznkU8C0InYgEAAQALQidi',
    // '006610e09a264ba41158f7fdeaf67f0f033IADX8BPL6+lhot1stBECLBzOFs+I97t0loNYSDxOcgB8WaQWgFsAAAAAEABznkU8QPAmYgEAAQBA8CZi',

    // token:
    //   '006610e09a264ba41158f7fdeaf67f0f033IADSZofMQmH4dwPUxBvuo85LdFip+LD9RZHMNa12zKMA+E+klSAAAAAAEAAD1/lOb/UjYgEAAQBv9SNi',
  };

  const EndCall = () => {
    Alert.alert('Call was ended', '', [
      {text: 'Ok', onPress: navigation.goBack()},
    ]);
  };

  useEffect(() => {
    if (callConnected) {
      AsyncStorage.removeItem('callData').then(() =>
        console.log('call cache cleared'),
      );
    }

    setTimeout(() => {
      setTimedOut(true);
    }, 35000);
  }, [callConnected]);

  useEffect(() => {
    console.log(userdata);
    if (timedOut && !callConnected) {
      Alert.alert('Call Failed', 'User did not pick up the call', [
        {text: 'Ok', onPress: navigation.goBack()},
      ]);
    }
  }, [timedOut]);

  const callbacks = {
    EndCall: () => navigation.goBack(),
    ConnectionStateChanged: state => console.log('state changed to ' + state),
    UserOffline: uid => EndCall(),
    UserJoined: uid => setCallConnected(true),
  };
  return callType == 'video' ? (
    <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
  ) : (
    <>
      <View
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          zIndex: 1000,
        }}>
        <ImageBackground
          resizeMode="cover"
          style={{
            width: width,
            position: 'absolute',
            height: height + height / 7,
            justifyContent: 'space-between',
            alignItems: 'center',
            top: -100,
            left: 0,
            right: 0,
            bottom: 0,
            paddingVertical: height / 7,
          }}
          source={
            guestData.Image
              ? {uri: guestData.Image}
              : require('../assets/dp.png')
          }>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
          />
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: Colors.Medium,
                color: Colors.white,
                marginTop: 20,
              }}>
              {Number == userdata.email
                ? guestData.Number
                : Name
                ? Name
                : Number}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Colors.Regular,
                color: Colors.white,
                marginTop: 20,
              }}>
              {callConnected ? 'Connected' : 'Audio Calling'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              zIndex: 1000,
              width: 50,
              height: 50,
              borderRadius: 40,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <Icon name="phone" size={20} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </>
  );
};
export default Jitsi;
// import React, {useEffect} from 'react';
// import {View, TouchableOpacity, Text} from 'react-native';
// import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
// import Icon from 'react-native-vector-icons/Entypo';
// const Jitsi = ({navigation, route}) => {
//   //   console.log('props', );
//   const {callType, guestData} = route.params;
//   useEffect(() => {
//     setTimeout(() => {
//       // const url = 'https://meet.jit.si/statCall';
//       const url = `https://meet.jit.si/${
//         callType == 'audio' ? 'HaloChats_Audio-Call' : 'HaloChats_Video-Call'
//       }`;
//       const userInfo = {
//         displayName: 'User',
//         email: 'user@example.com',
//         avatar: 'https:/gravatar.com/avatar/abc123',
//       };
//       const options = {
//         audioMuted: false,
//         audioOnly: false,
//         videoMuted: false,
//         subject: 'your subject',
//         token: 'your token',
//       };
//       const meetFeatureFlags = {
//         // addPeopleEnabled: true,
//         // calendarEnabled: true,
//         // callIntegrationEnabled: true,
//         // chatEnabled: true,
//         // closeCaptionsEnabled: true,
//         // inviteEnabled: true,
//         // androidScreenSharingEnabled: true,
//         // liveStreamingEnabled: true,
//         // meetingNameEnabled: true,
//         // meetingPasswordEnabled: true,
//         // pipEnabled: true,
//         // kickOutEnabled: true,
//         // conferenceTimerEnabled: true,
//         // videoShareButtonEnabled: true,
//         // recordingEnabled: true,
//         // reactionsEnabled: true,
//         // raiseHandEnabled: true,
//         tileViewEnabled: false,
//         toolboxAlwaysVisible: false,
//         toolboxEnabled: false,
//         welcomePageEnabled: false,
//       };
//       callType == 'audio'
//         ? JitsiMeet.audioCall(url, userInfo)
//         : JitsiMeet.call(url, userInfo, meetFeatureFlags);
//       //
//       /* Você também pode usar o  para chamadas apenas de áudio */
//       /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     return () => {
//       JitsiMeet.endCall();
//     };
//   });

//   function onConferenceTerminated(nativeEvent) {
//     /* Conference terminated event */
//     console.log('Meeting End');
//   }

//   function onConferenceJoined(nativeEvent) {
//     /* Conference joined event */
//     console.log('Meeting Joined');
//   }

//   function onConferenceWillJoin(nativeEvent) {
//     /* Conference will join event */
//     console.log('Meeting before joined');
//   }
//   return (
//     <>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={{
//           position: 'absolute',
//           zIndex: 50,
//           backgroundColor: 'white',
//           top: 20,
//           left: 30,
//           borderRadius: 50,
//         }}>
//         <Icon name="circle-with-cross" color="black" size={20} />
//       </TouchableOpacity>
//       <JitsiMeetView
//         onConferenceTerminated={e => onConferenceTerminated(e)}
//         onConferenceJoined={e => onConferenceJoined(e)}
//         onConferenceWillJoin={e => onConferenceWillJoin(e)}
//         style={{
//           flex: 1,
//           // alignItems: 'center',
//           // justifyContent: 'center',
//           // alignSelf: 'center',
//           height: '100%',
//           width: '100%',
//         }}
//       />
//     </>
//   );
// };
// export default Jitsi;
