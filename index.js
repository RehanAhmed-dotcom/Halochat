/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import messaging from '@react-native-firebase/messaging';
import PushNotificationConfig from './src/config/PushNotificationConfig';
import PushNotification from 'react-native-push-notification';
import RNCallKeep from 'react-native-callkeep';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().setBackgroundMessageHandler(async remoteMessage => {
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
        remoteMessage.data.Name ?? remoteMessage.data.Number ?? 'PapiChat User',
        '',
        'number',
        remoteMessage.data.type == 'video',
      );
    });
  }
  PushNotification.localNotification(remoteMessage);
});
PushNotificationConfig.congigurations();
AppRegistry.registerComponent(appName, () => App);
