// import React from 'react';
// import {View, Text} from 'react-native';
// import {RTCView} from 'react-native-webrtc';

// import {MediaStream} from 'react-native-webrtc';

// import Buttons from './Buttons';

// function ButtonContainer(props) {
//   return (
//     <View>
//       <Buttons iconName="phone" backgroundColor="red" onPress={props.hangup} />
//     </View>
//   );
// }

// export default function Video(props) {
//   if (props.localStream && !props.remoteStream) {
//     return (
//       <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
//         <RTCView
//           streamURL={props.localStream.toURL()}
//           objectFit={'cover'}
//           style={{position: 'absolute', width: '100%', height: '100%'}}
//         />
//         <ButtonContainer hangup={props.hangup} />
//       </View>
//     );
//   }
//   if (props.localStream && props.remoteStream) {
//     console.log('remote Stream in video', props.remoteStream.toURL());
//     console.log('local stream in video', props.localStream.toURL());
//     return (
//       <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
//         <RTCView
//           streamURL={props.remoteStream.toURL()}
//           objectFit={'cover'}
//           style={{position: 'absolute', width: '100%', height: '100%'}}
//         />
//         <RTCView
//           streamURL={props.localStream.toURL()}
//           objectFit={'cover'}
//           style={{
//             position: 'absolute',
//             width: 100,
//             height: 150,
//             top: 0,
//             left: 20,
//             elevation: 20,
//           }}
//         />
//         <ButtonContainer hangup={props.hangup} />
//       </View>
//     );
//   }
//   return <ButtonContainer hangup={props.hangup} />;
// }
