import {
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  SafeAreaView,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {fcm} from './src/redux/actions';
import {Store, persistor} from './src/redux/store';
import {useDispatch} from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import messaging from '@react-native-firebase/messaging';
import ParentNav from './src/navigators/Parentnavigator';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import GettingCall from './src/components/gettingCall';
import Video from './src/components/Video';
import Buttons from './src/components/Buttons';
import Utils from './src/components/Utils';
import firestore from '@react-native-firebase/firestore';
import RNCallKeep from 'react-native-callkeep';
import {initializeCallKeep} from './src/callKeep';
import AsyncStorage from '@react-native-async-storage/async-storage';

const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
const App = () => {
  useEffect(() => {
    initializeCallKeep();
    getToken();
    getNotifications();
    Platform.OS === 'android' && _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      if (
        remoteMessage.data.type == 'audio' ||
        remoteMessage.data.type == 'video'
      ) {
        AsyncStorage.setItem(
          'callData',
          JSON.stringify({
            channel: remoteMessage.data.channel,
            Name: remoteMessage.data.Name,
            Number: remoteMessage.data.Number,
            guestData: remoteMessage.data.guestData,
            type: remoteMessage.data.type,
          }),
        ).then(() => {
          RNCallKeep.displayIncomingCall(
            uuidv4(),
            remoteMessage.data.channel ?? 'halochat',
            remoteMessage.data.Name ??
              remoteMessage.data.Number ??
              'PapiChat User',
            '',
            'number',
            remoteMessage.data.type == 'video',
          );
        });
      } else {
        console.log('Invalid Type');
      }

      Platform.OS === 'ios' &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          userInfo: remoteMessage.data,
        });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
    StatusBar.setBackgroundColor('#fff');
  }, []);
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    console.log('i got fcm', fcmToken);
    if (fcmToken) {
      try {
        // fcm(fcmToken)(dispatch);
        Store.dispatch(fcm(fcmToken));
      } catch (e) {
        'Error in dispatching fcm to redux', e;
      }
    }
  };
  const getNotifications = async () => {
    await messaging().onNotificationOpenedApp(remoteMessage => {});
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {});
  };
  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'fcm_fallback_notification_channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log('created channel', created),
    );
  };

  // const dispatch = useDispatch();

  return (
    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     backgroundColor: 'white',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}>
    //   <Buttons
    //     iconName="video"
    //     backgroundColor="grey"
    //     onPress={() => create()}
    //   />
    // </SafeAreaView>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <ParentNav />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
