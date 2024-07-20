import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import RootNavigator from './src/Nav/RootNavigator';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import config from './src/config/config';
import { EventSourcePolyfill } from 'event-source-polyfill';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  useEffect(() => {

    const setupEventSource = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        console.log(accessToken, 'sse 액세스토큰');
        const eventSource = new EventSourcePolyfill(
          `${config.SERVER_URL}/sse/connect`,
          {
            heartbeatTimeout: 86400000,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log(eventSource);
        eventSource.addEventListener('CONNECT', event => {
          console.log(event);
        });

        eventSource.addEventListener('JOIN', event => {
          const data = JSON.parse(event.data);
          console.log(data);
        });

        eventSource.addEventListener('error', event => {
          console.error('SSE Error:', event);
          eventSource.close();
        });

        return () => {
          eventSource.removeListener('JOIN');
          eventSource.removeListener('error');
          eventSource.close();

        };
      }
    };

    setupEventSource();
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log(fcmToken, 'fcmToken');
  };
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
  useEffect(() => {
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