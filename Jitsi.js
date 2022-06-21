// import React, {useEffect} from 'react';
// import {View, Text} from 'react-native';
// import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

// const Jitsi = props => {
//   console.log('props', props);
//   useEffect(() => {
//     setTimeout(() => {
//       const url = 'https://meet.jit.si/B741B63E-C5E6-4D82-BAC4-048BE25D8CC7';
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
//         addPeopleEnabled: true,
//         calendarEnabled: true,
//         callIntegrationEnabled: true,
//         chatEnabled: true,
//         closeCaptionsEnabled: true,
//         inviteEnabled: true,
//         androidScreenSharingEnabled: true,
//         liveStreamingEnabled: true,
//         meetingNameEnabled: true,
//         meetingPasswordEnabled: true,
//         pipEnabled: true,
//         kickOutEnabled: true,
//         conferenceTimerEnabled: true,
//         videoShareButtonEnabled: true,
//         recordingEnabled: true,
//         reactionsEnabled: true,
//         raiseHandEnabled: true,
//         tileViewEnabled: true,
//         toolboxAlwaysVisible: false,
//         toolboxEnabled: true,
//         welcomePageEnabled: false,
//       };
//       props.callType == 'audio'
//         ? JitsiMeet.audioCall(url, userInfo)
//         : JitsiMeet.call(url, userInfo);
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
//       <View style={{position: 'absolute', zIndex: 50, top: 20, left: 30}}>
//         <Text style={{color: 'red'}}>skdfjdskfjsldf</Text>
//       </View>
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
