import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import database from '@react-native-firebase/database';
import {recieverMsg, senderMsg} from '../components/messageUtils';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import InputField from '../components/InputField';
import ChatComp from '../components/ChatComp';
// const {
//   RtcTokenBuilder,
//   RtmTokenBuilder,
//   RtcRole,
//   RtmRole,
// } = require('agora-access-token');
import {callToken} from '../lib/api';
import myModal from '../components/modal';
import SendIcon from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-vector-icons/Entypo';
import {editImage} from '../lib/api';
import Colors from '../styles';
import GettingCall from '../components/gettingCall';
import Video from '../components/Video';
import Buttons from '../components/Buttons';
import Utils from '../components/Utils';
import firestore from '@react-native-firebase/firestore';
import ScreensHeader from '../components/ScreensHeader';
import Arrow from 'react-native-vector-icons/AntDesign';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';
import CartIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Jitsi from '../../Jitsi';
// import {
//   EventOnAddStream,
//   RTCIceCandidate,
//   MediaStream,
//   RTCPeerConnection,
//   RTCSessionDescription,
// } from 'react-native-webrtc';
// const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
const Singlechatscreen = ({navigation, route}) => {
  const name = route?.params?.name;
  const image = route?.params?.image;
  const number = route?.params?.number;
  const [type, setType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {userdata, token} = useSelector(({USER}) => USER.userData);

  const guestData = {
    Name: route?.params.name,
    Image: route?.params.image,
    Number: route?.params?.number,
    Fname: route?.params?.fname,
    Lname: route?.params?.lname,
    Gender: route?.params?.gender,
    Bio: route?.params?.bio,
    Fcm: route?.params?.fcm,
    // Fcm: 'its guest fcm coming from chat list ',
  };
  console.log('guset', guestData);
  const userData2 = {
    Name: userdata.firstname
      ? `${userdata.firstname} ${userdata.lastname}`
      : userdata.email,
    Image: userdata.image,
    Number: userdata.email,
    Fname: userdata.firstname,
    Lname: userdata.lastname,
    Gender: userdata.gender,
    Bio: userdata.bio,
    Fcm: userdata.fcm_token,
    // Fcm: 'Its rehan ahmed fcm coming from contact redux',
  };
  // console.log('guest dat', guestData);
  // console.log('user dat', userData2);
  const [JoinMeeting, setJoinMeeting] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  // console.log('others fcm i got ', guestData.Fcm);
  // console.log('mine fcm i got', userdata.fcm_token);
  // console.log('abc');
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
  console.log('messages', messages);
  const disappearingMessageHandler = () => {
    setInterval(() => {
      const now = Date.now();
      const target = 24 * 60 * 60 * 1000; // 24 Hours limit
      database()
        .ref('messeges')
        .child(userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
        .once('value', snap => {
          snap.forEach(item => {
            const date = item.val()?.messege?.date;
            if (now - date >= target) {
              database()
                .ref('messeges')
                .child(
                  userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
                )
                .child(
                  guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
                )
                .child(item.key)
                .remove();
            }
          });
        });
    }, 3000);
  };

  useEffect(() => {
    // disappearingMessageHandler();
  }, []);

  useEffect(() => {
    _getMeesages();
    _updateChatCount();
  }, []);
  const _updateChatCount = async () => {
    try {
      database()
        .ref(
          'users/' + userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
        )
        .child(guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
        .once('value', snapshot => {
          if (snapshot.val() != null) {
            database()
              .ref(
                'users/' +
                  userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
              )
              .child(guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
              .update({
                counter: 0,
              });
          }
        });
    } catch (error) {}
  };
  // const _updatedeleteCount = async () => {
  //   try {
  //     database()
  //       .ref(
  //         'messeges/' + userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
  //       )
  //       .child(guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
  //       .once('value', snapshot => {
  //         if (snapshot.val() != null) {
  //           database()
  //             .ref(
  //               'messeges/' +
  //                 userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
  //             )
  //             .child(guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
  //             .update({
  //               delete: true,
  //             });
  //         }
  //       });
  //   } catch (error) {}
  // };
  const handleSend = () => {
    setMessage('');
    // _handlePushNotification();
    if (message) {
      _handlePushNotification();
      senderMsg(
        message,
        userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
        guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
        Date.now(),
      );
      _chatUsers()
        .then(() => {})
        .catch(err => {});

      recieverMsg(
        message,
        userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
        guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
        Date.now(),
      );
      _chatUsers()
        .then(() => {})
        .catch(err => {});
    }
  };
  const _handlePushNotificationAudio = (channel, token) => {
    const userData1 = {
      name: `${
        userdata.firstname
          ? `${userdata.firstname} ${userdata.lastname}`
          : userdata.email
      }`,
      // email: userData.userdata.email,
      image: userdata.image,
      fcm_token: userdata.fcm_token,
    };
    const dataToSend = {
      notification: {
        id: `${userData1.name}`,
        title: `${userData1.name}`,
        body: `${
          userdata.firstname
            ? `${userdata.firstname} ${userdata.lastname} is Audio calling you`
            : `${userdata.email} is Audio calling you`
        }`,
        callType: 'audio',
        guestData,
      },
      data: {
        guestData: guestData,
        type: 'audio',
        callType: 'audio',
        channel,
        token,
        Name: userData2.Name,
        Number: userData2.Number,
      },
      to: guestData.Fcm,
    };
    const data = JSON.stringify(dataToSend);
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAfSyLXK4:APA91bGyul-YWkCKWieAJsezTNTWQ8lxDZdoL0bClqvkNyjLOS2bFCixQ9xlTJ-hmGyNS1LWWKpcpiHyqhuK4sIn0cP-GSLMxedxqA-P59w-rfljd7pYSf55knvkdVGXh2lh8rblhKEf',
      },
      body: data,
    })
      .then(res => res.json('response of push notification', res))
      .then(res => {})
      .catch(err => {});
  };
  const _handlePushNotificationVideo = (channel, token) => {
    const userData1 = {
      name: `${
        userdata.firstname
          ? `${userdata.firstname} ${userdata.lastname}`
          : userdata.email
      }`,
      // email: userData.userdata.email,
      image: userdata.image,
      fcm_token: userdata.fcm_token,
    };
    const dataToSend = {
      notification: {
        id: `${userData1.name}`,
        title: `${userData1.name}`,
        body: `${
          userdata.firstname
            ? `${userdata.firstname} ${userdata.lastname} is Video calling you`
            : `${userdata.email} is Video calling you`
        }`,
      },
      data: {
        guestData: guestData,
        type: 'video',
        callType: 'video',
        channel,
        token,
      },
      to: guestData.Fcm,
    };
    const data = JSON.stringify(dataToSend);
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAfSyLXK4:APA91bGyul-YWkCKWieAJsezTNTWQ8lxDZdoL0bClqvkNyjLOS2bFCixQ9xlTJ-hmGyNS1LWWKpcpiHyqhuK4sIn0cP-GSLMxedxqA-P59w-rfljd7pYSf55knvkdVGXh2lh8rblhKEf',
      },
      body: data,
    })
      .then(res => res.json('response of push notification', res))
      .then(res => {})
      .catch(err => {});
  };
  const _handlePushNotification = () => {
    const userData1 = {
      name: `${
        userdata.firstname
          ? `${userdata.firstname} ${userdata.lastname}`
          : userdata.email
      }`,
      // email: userData.userdata.email,
      image: userdata.image,
      fcm_token: userdata.fcm_token,
    };
    const dataToSend = {
      notification: {
        id: `${userData1.name}`,
        title: `${userData1.name}`,
        body: message,
      },
      data: {guestData: guestData, type: 'message'},
      to: guestData.Fcm,
    };
    const data = JSON.stringify(dataToSend);
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAfSyLXK4:APA91bGyul-YWkCKWieAJsezTNTWQ8lxDZdoL0bClqvkNyjLOS2bFCixQ9xlTJ-hmGyNS1LWWKpcpiHyqhuK4sIn0cP-GSLMxedxqA-P59w-rfljd7pYSf55knvkdVGXh2lh8rblhKEf',
      },
      body: data,
    })
      .then(res => res.json('response of push notification', res))
      .then(res => {})
      .catch(err => {});
  };
  const _chatUsers = async () => {
    try {
      console.log('guest in chat', guestData);
      database()
        .ref(
          'users/' + userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
        )
        .child(guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
        .set({
          latestMessage: message,
          time: Date.now(),
          timestamp: database.ServerValue.TIMESTAMP,
          counter: 0,
          user: guestData,
        });

      database()
        .ref(
          'users/' + guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
        )
        .child(userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
        .once('value', snapshot => {
          const counts = snapshot?.val()?.counter;
          database()
            .ref(
              'users/' +
                guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''),
            )
            .child(userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
            .set({
              latestMessage: message,
              time: Date.now(),
              timestamp: database.ServerValue.TIMESTAMP,
              counter: counts ? counts + 1 : 1,
              user: userData2,
            });
        });
    } catch (error) {
      console.log('eerr');
    }
  };
  // console.log(
  //   'checking value',
  //   database()
  //     .ref('messeges')
  //     .child(userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
  //     .child(guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
  //     .child('messege'),
  // );
  const deleteMessage = async (id, msg) => {
    console.log('checking', id);
    database()
      .ref('messeges')
      .child(userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(id)
      .remove();
  };

  const _getMeesages = async () => {
    try {
      database()
        .ref('messeges')
        .child(userData2.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData.Number.slice(-10).replace(/[^a-zA-Z0-9 ]/g, ''))
        .on('value', dataSnapshot => {
          let msgs = [];
          dataSnapshot.forEach(child => {
            msgs.push({
              key: child.key,
              sendBy: child.val().messege.sender,
              delete: child.val().messege.delete,
              recievedBy: child.val().messege.reciever,
              msg: child.val().messege.msg,
              date: child.val().messege.date,
            });
            return undefined;
          });
          setMessages(msgs.reverse());
        });
    } catch (error) {
      console.log('eror');
    }
  };
  const Picker = () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: false,
    }).then(image => {
      const data = new FormData();
      data.append('image', {
        uri: image.path,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
      editImage({Auth: token}, data).then(res => {
        setMessage(res.path);
      });
      // setMessage(image.path);
    });
  };
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [gettingCall, setGettingCall] = useState(false);
  const pc = useRef();
  const connecting = useRef(false);
  // console.log('ref pc', pc);
  // console.log('ref connecting', connecting);
  // useEffect(() => {
  //   const cRef = firestore().collection('meet').doc(String('chatId'));

  //   const subscribe = cRef.onSnapshot(snapshot => {
  //     const data = snapshot.data();
  //     if (pc.current && !pc.current.remoteDescription && data && data.answer) {
  //       pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
  //     }
  //     if (data && data.offer && !connecting.current) {
  //       setGettingCall(true);
  //     }
  //   });
  //   const subscribeDelete = cRef.collection('callee').onSnapshot(snapshot => {
  //     snapshot.docChanges().forEach(change => {
  //       if (change.type == 'removed') {
  //         hangup();
  //       }
  //     });
  //   });
  //   return () => {
  //     subscribe();
  //     subscribeDelete();
  //   };
  // }, [pc.current]);
  const setupWebrtc = async () => {
    pc.current = new RTCPeerConnection(configuration);
    const stream = await Utils.getStream();
    if (stream) {
      console.log('stream', stream);
      setLocalStream(stream);
      pc.current.addStream(stream);
    }

    pc.current.onaddstream = event => {
      console.log('i am the event set to remote stream', event);
      setRemoteStream(event.stream);
    };
  };
  const create = async () => {
    console.log('Calling');
    connecting.current = true;

    await setupWebrtc();

    const cRef = firestore().collection('meet').doc(String('chatId'));

    collectIceCandidates(cRef, 'caller', 'callee');
    if (pc.current) {
      const offer = await pc.current.createOffer();
      pc.current.setLocalDescription(offer);
      const cWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };
      cRef.set(cWithOffer);
    }
  };
  const join = async () => {
    connecting.current = true;
    setGettingCall(false);

    const cRef = firestore().collection('meet').doc(String('chatId'));
    const offer = (await cRef.get()).data()?.offer;
    if (offer) {
      await setupWebrtc();

      collectIceCandidates(cRef, 'callee', 'caller');
      if (pc.current) {
        pc.current.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await pc.current.createAnswer();
        pc.current.setLocalDescription(answer);
        const cWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        cRef.update(cWithAnswer);
      }
    }
  };
  const hangup = async () => {
    setGettingCall(false);
    connecting.current = false;
    streamCleanUp();
    firestoreCleanUp();
    if (pc.current) {
      pc.current.close();
    }
  };
  const streamCleanUp = async () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      localStream.release();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };
  const firestoreCleanUp = async () => {
    const cRef = firestore().collection('meet').doc(String('chatId'));
    if (cRef) {
      const calleeCandidate = await cRef.collection('callee').get();
      calleeCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });
      const callerCandidate = await cRef.collection('caller').get();
      callerCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });
      cRef.delete();
    }
  };
  const collectIceCandidates = async (cRef, localName, remoteName) => {
    console.log('local Name', localName);
    const candidateCollection = cRef.collection(String(localName));

    if (pc.current) {
      pc.current.onicecandidate = event => {
        if (event.candidate) {
          candidateCollection.add(event.candidate);
        }
      };
    }
    console.log('remote stream', remoteStream);
    cRef.collection(String(remoteStream)).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current?.addIceCandidate(candidate);
        }
      });
    });
  };
  if (gettingCall) {
    return <GettingCall hangup={hangup} join={join} />;
  }
  if (localStream) {
    return (
      <Video
        hangup={hangup}
        localStream={localStream}
        remoteStream={remoteStream}
      />
    );
  }
  const Wrapper = Platform.OS === 'android' ? View : KeyboardAvoidingView;
  return (
    <Wrapper
      behavior={Platform.OS == 'android' ? 'height' : 'padding'}
      style={styles.container}>
      {JoinMeeting ? (
        <Jitsi callType={type} />
      ) : (
        <>
          <ScreensHeader
            imageShow={true}
            guestData={guestData}
            navigation={navigation}
            headerheight={{
              height: 100,
            }}
            titlestyle={{
              top: 6,
            }}
            titlview={{
              paddingTop: 6,
            }}
            title={name}
            image={image}
            Icon3={
              // <PhoneIcon
              //   name={'video-camera'}
              //   size={22}
              //   color={Colors.mainColor}
              //   style={{marginRight: 16, marginTop: 0}}
              // />
              <Icon
                name="phone"
                size={20}
                color={Colors.mainColor}
                onPress={() => {
                  setShowModal(true);
                  const unique = new Date().valueOf();
                  callToken({Auth: token})
                    // callToken({Auth: token, channelName: `${unique}a`})
                    .then(res => {
                      console.log('token', res.token);
                      setShowModal(false);
                      // _handlePushNotificationAudio(
                      //   'Arish',
                      //   '006610e09a264ba41158f7fdeaf67f0f033IABjvFH3fBZLP2A3xBzYPbGTDL3F9lX+qPTRMeFv9D9XeQPd+mIAAAAAIgAb78m5iSQrYgQAAQCIJCtiAgCIJCtiAwCIJCtiBACIJCti',
                      // );
                      _handlePushNotificationAudio(res.channelName, res.token);
                      navigation.navigate('Jitsi', {
                        callType: 'audio',
                        guestData,
                        channel: res.channelName,
                        token: res.token,
                        Number: userdata.email,
                        // channel: 'Arish',
                        // token:
                        //   '006610e09a264ba41158f7fdeaf67f0f033IABjvFH3fBZLP2A3xBzYPbGTDL3F9lX+qPTRMeFv9D9XeQPd+mIAAAAAIgAb78m5iSQrYgQAAQCIJCtiAgCIJCtiAwCIJCtiBACIJCti',
                      });
                    })
                    .catch(() => {
                      setShowModal(false);
                    });
                  // _handlePushNotificationAudio();
                  // navigation.navigate('Jitsi', {callType: 'audio', guestData});
                }}
              />
            }
            Icon2={
              <TouchableOpacity
                // style={{backgroundColor: 'red'}}
                onPress={() => {
                  setShowModal(true);
                  const unique = new Date().valueOf();
                  console.log('unique', unique);
                  callToken({Auth: token, channelName: `${unique}a`})
                    .then(res => {
                      console.log('token', res);
                      setShowModal(false);
                      _handlePushNotificationVideo(res.channelName, res.token);
                      // _handlePushNotificationVideo(
                      //   'Arish',
                      //   '006610e09a264ba41158f7fdeaf67f0f033IABjvFH3fBZLP2A3xBzYPbGTDL3F9lX+qPTRMeFv9D9XeQPd+mIAAAAAIgAb78m5iSQrYgQAAQCIJCtiAgCIJCtiAwCIJCtiBACIJCti',
                      // );
                      navigation.navigate('Jitsi', {
                        callType: 'video',
                        guestData,
                        channel: res.channelName,
                        token: res.token,
                        // channel: 'Arish',
                        // token:
                        //   '006610e09a264ba41158f7fdeaf67f0f033IABjvFH3fBZLP2A3xBzYPbGTDL3F9lX+qPTRMeFv9D9XeQPd+mIAAAAAIgAb78m5iSQrYgQAAQCIJCtiAgCIJCtiAwCIJCtiBACIJCti',
                      });
                    })
                    .catch(() => {
                      setShowModal(false);
                    });
                  // const appID = '610e09a264ba41158f7fdeaf67f0f033';
                  // const appCertificate = '93eb8c694ab74924a3589cfe551ef7e9';
                  // const channelName = 'Arishg';
                  // const uid = 2882341273;
                  // const account = '2882341273';
                  // const role = RtcRole.PUBLISHER;
                  // const expirationTimeInSeconds = 3600;
                  // const currentTimestamp = Math.floor(Date.now() / 1000);
                  // const privilegeExpiredTs =
                  //   currentTimestamp + expirationTimeInSeconds;
                  // const tokenB = RtcTokenBuilder.buildTokenWithAccount(
                  //   appID,
                  //   appCertificate,
                  //   channelName,
                  //   account,
                  //   role,
                  //   privilegeExpiredTs,
                  // );
                  // console.log('Token With UserAccount: ' + tokenB);
                }}>
                <Image
                  tintColor={Colors.mainColor}
                  color={Colors.mainColor}
                  source={require('../assets/103782_video_icon.png')}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: Colors.mainColor,
                    marginRight: 15,
                  }}
                  resizeMode={'cover'}
                  //
                />
              </TouchableOpacity>
            }
            Icon={
              <Arrow
                name={'left'}
                size={28}
                onPress={() => navigation.goBack()}
                style={{marginLeft: 12, marginTop: 0}}
                color={Colors.mainColor}
              />
            }
          />
          <View style={[styles.chatContainer, {marginBottom: 5}]}>
            <FlatList
              inverted
              showsVerticalScrollIndicator={false}
              data={messages}
              renderItem={({item}) => (
                // <Message
                //   msg={item.msg}
                //   sendBy={item.sendBy}
                //   guestImage={guestData.Image}
                //   date={item.date}
                // />
                <ChatComp item={item} onDelete={deleteMessage} />
              )}
              keyExtractor={(_, index) => `message-${index}`}
            />
          </View>
          <View
            style={[
              styles.chatContainer,
              {
                ...styles.chatParent,
                flex: keyboardStatus == 'Keyboard Shown' ? 1.1 : 0.5,
              },
            ]}
            // style={styles.updatedChatContainer}
          >
            <Camera
              name={'camera'}
              size={22}
              style={{marginRight: 10}}
              color={Colors.grey}
              onPress={Picker}
            />
            <InputField
              placeholder={'Write a message here...'}
              placeholderTextColor={'grey'}
              value={message}
              onChangeText={text => setMessage(text)}
              Style={{
                backgroundColor: null,
                borderRadius: 25,
                width: 250,
                color: 'black',
              }}
            />
            <View>
              <SendIcon
                name={'send'}
                size={22}
                style={{marginLeft: 12}}
                color={Colors.mainColor}
                onPress={handleSend}
              />
            </View>
          </View>
        </>
      )}
      {myModal(showModal)}
    </Wrapper>
  );
};

export default Singlechatscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // backgroundColor: 'red',
  },
  headerstyle: {
    backgroundColor: Colors.mainColor,
    height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  chatContainer: {
    flex: 4,
    // height: 100,
    // backgroundColor: 'green',
    // marginBottom: 10,
  },
  chatContainer1: {
    flex: 4,
    // height: 100,
    backgroundColor: 'green',
  },
  chatParent: {
    // height: 100,
    justifyContent: 'center',
    // paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D0DCDB',
    // marginBottom: 10,
    // elevation:5
  },
  updatedChatContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    // paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D0DCDB',
    width: '100%',
    marginBottom: 30,
  },
});
