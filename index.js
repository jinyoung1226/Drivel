/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking, AppState } from 'react-native';
import { setDeepLinkURL, getDeepLinkURL } from './global'

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (Platform.OS === 'android') {
    if (remoteMessage.data.type === 'JOIN_REQUEST') {
      console.log('딥링크저장')
      setDeepLinkURL('drivel://meet/applyDetail')
      if (AppState.currentState === 'background') {
        Linking.openURL('drivel://meet/applyDetail');
      }
    }
    if (remoteMessage.data.type === 'JOIN_ACCEPTED') {
      console.log('딥링크저장')
      setDeepLinkURL('drivel://meet/meetDetail/' + detail.notification.data.meetingId + '/' + detail.notification.data.courseId + '/' + detail.notification.data.meetingTitle)
    }
  }
});
notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (Platform.OS === 'android') {
    switch (type) {
      case EventType.PRESS:
        if (detail.notification.data.type === 'JOIN_REQUEST') {
          Linking.openURL('drivel://meet/applyDetail');
        }
        if (detail.notification.data.type === 'JOIN_ACCEPTED') {
          Linking.openURL('drivel://meet/meetDetail/' + detail.notification.data.meetingId + '/' + detail.notification.data.courseId + '/' + detail.notification.data.meetingTitle);
        }
        if (detail.notification.data.type === 'JOIN_REJECTED') {
          Linking.openURL('drivel://meet');
        }
        break;
      case EventType.DISMISSED:
        console.log('User dismissed notification');
        break;
    }
  }
});
AppRegistry.registerComponent(appName, () => App);
