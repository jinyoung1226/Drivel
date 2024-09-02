import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import store from './src/store/store';
import RootNavigator from './src/Nav/RootNavigator';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { Platform, NativeModules, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as encoding from 'text-encoding';
import BootSplash from "react-native-bootsplash";

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

  const androidRequestPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    console.log('authorizationStatus:', authorizationStatus);
    try {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Android 13이상 , 알림권한 허용.');
          }
        }
      }
    } catch (error) {
      console.log('Android error:', error);
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
    const init = async () => {
      resisterForPushNotificationsAsync();
      androidRequestPermission();
      getFcmToken();
    }
    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
    return unsubscribe;
  }, []);

  return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
  );
};

export default App;
