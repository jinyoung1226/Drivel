/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (Platform.OS === 'android') {
    console.log('딥링크저장')
    await AsyncStorage.setItem('deepLinkURL', 'drivel://meet');
  }
});

AppRegistry.registerComponent(appName, () => App);
