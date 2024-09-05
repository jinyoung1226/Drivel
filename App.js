import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import RootNavigator from './src/Nav/RootNavigator';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { Platform, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as encoding from 'text-encoding';
import BootSplash from "react-native-bootsplash";
import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';
import { navigationRef } from './src/Nav/RootNavigator'

// console.log = () => {};
// console.warn = () => {};
// console.error = () => {};

// if (process.env.NODE_ENV === "production") {
//   console = window.console || {};
//   console.log = function no_console() {};
//   console.warn = function no_console() {};
//   console.error = function () {};
// }

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

  const onMessageReceived = async (message) => {
    console.log('message:', message);
    await notifee.requestPermission()
    
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    notifee.displayNotification({
      title: message.notification.title,
      body: message.notification.body,
      android: {
          channelId: channelId,
          smallIcon: 'ic_launcher',
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
      },
    })
  };

  const unsubscribe = messaging().onMessage(onMessageReceived);

  const foregroundEvent = notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        navigationRef.current?.navigate('MeetTab', {
          screen: 'MeetMain',
        });
        navigationRef.current?.navigate('MeetTab', {
          screen: 'MeetApplyDetail',
        });
        break;
    }
  });

  const backgroundEvent = notifee.onBackgroundEvent(async ({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        navigationRef.current?.navigate('MeetTab', {
          screen: 'MeetMain',
        });
        navigationRef.current?.navigate('MeetTab', {
          screen: 'MeetApplyDetail',
        });
        break;
    }
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
      // await notifee.cancelNotification("Default");
      // await notifee.deleteChannel('Miscellaneous');
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
    return () => {
      unsubscribe(); // FCM 메시지 핸들러 클린업
      foregroundEvent(); // Notifee 이벤트 핸들러 클린업
      backgroundEvent
    };
  }, []);

  return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
  );
};

export default App;
