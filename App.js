import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import store from './src/store/store';
import RootNavigator from './src/Nav/RootNavigator';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as encoding from 'text-encoding';


const App = () => {

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      await AsyncStorage.setItem('fcmToken', fcmToken);
      console.log(fcmToken, 'fcmToken');
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
  };
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    Alert.alert(remoteMessage.notification.title);
  });

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('Permission denied');
    }
  };

  const resisterForPushNotificationsAsync = async () => {
    return requestPermission().then(async (enabled) => {
      if (enabled) {
        if (Platform.OS === 'ios') {
          // ios의 경우 필수가 아니라고도 하고 필수라고도 하고.. 그냥 넣어버렸다.
          messaging().registerDeviceForRemoteMessages();
        }
        return await messaging().getToken()
      }
    });
  };

  useEffect(() => {
    resisterForPushNotificationsAsync();
    getFcmToken();
    unsubscribe
    return unsubscribe;
  }, []);

  return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
  );
};

export default App;
