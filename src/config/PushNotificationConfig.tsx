import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as RootNavigation from './NavigationService';
import {Store} from '../redux/store';
import {useDispatch} from 'react-redux';
import {notificationAlert} from '../redux/actions';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import RNCallKeep from 'react-native-callkeep';
// import moment from 'moment';
const PushNotificationsConfigs = {
  congigurations: () => {
    PushNotification.configure({
      onNotification: notification => {
        Store.dispatch(notificationAlert(true));
        const clicked = notification.userInteraction;
        if (clicked) {
          if (
            notification.data.type === 'audio' ||
            notification.data.type === 'video'
          ) {
            console.log('new on notification log', notification);
            if (notification.data.type === 'audio') {
              RootNavigation.navigate('Jitsi', {
                callType: 'audio',
                guestData: notification.data.guestData,
                channel: notification.data.channel,
                token: notification.data.token,
              });
            } else if (notification.data.type === 'video') {
              RootNavigation.navigate('Jitsi', {
                callType: 'video',
                guestData: notification.data.guestData,
                channel: notification.data.channel,
                token: notification.data.token,
              });
            }

            RNCallKeep.displayIncomingCall(
              uuidv4(),
              notification.data.channel,
              notification.data.guestData.Name ??
                notification.data.guestData.Number,
              '',
              'number',
              notification.data.type == 'video',
            );
          } else {
            console.log('new on notification log', notification);
          }
          // if (notification.data.type === 'apply_job') {
          //   const data = JSON.parse(notification.data.job_data);
          //   console.log('data', data.image);
          //   console.log('heretetetetetetert');
          //   RootNavigation.navigate('JobDetails', {
          //     img: data.image,
          //     name: data.title,
          //     date: moment(Date.now()).format('YYYY-MM-DD'),
          //     address: data.address,
          //     id: data.id,
          //     desc: data.description,
          //     status: 1,
          //   });
          //   //   RootNavigation.navigate('sendmessagechat', {
          //   //     userData: JSON.parse(notification.data.userData),
          // }
          // // } else if (notification.data.type === 'meeting') {
          // //   RootNavigation.navigate('Meetings', {tab: 0});
          // else {
          //   RootNavigation.navigate('TabNavigator', {tab: 1});
          //   //   RootNavigation.navigate('Meetings', {tab: 1});
          // }
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: notification => {
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: err => {},
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
  },
};
export default PushNotificationsConfigs;
