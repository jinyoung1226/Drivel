/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (Platform.OS === 'android') {
    console.log('딥링크저장')
    await AsyncStorage.setItem('deepLinkURL', 'drivel://meet');
  }
});
notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (Platform.OS === 'android') {
    switch (type) {
      case EventType.PRESS:
        Linking.openURL('drivel://meet/applyDetail');
        break;
      case EventType.DISMISSED:
        console.log('User dismissed notification');
        break;
    }
  }
});
AppRegistry.registerComponent(appName, () => App);
