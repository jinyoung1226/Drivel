import React, {useEffect, useRef} from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import RootNavigator from './src/Nav/RootNavigator';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import config from './src/config/config';
import { EventSourcePolyfill } from 'event-source-polyfill';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => { 
  const eventSourceRef = useRef(null);
  useEffect(() => {
    const setupEventSource = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!accessToken) {
          console.error('Access token is missing.');
          return;
        }

        eventSourceRef.current = new EventSourcePolyfill(
          `${config.SERVER_URL}/sse/connect`,
          {
            heartbeatTimeout: 86400000,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log(eventSourceRef.current);

        eventSourceRef.current.addEventListener('CONNECT', event => {
          console.log(event);
        });

        eventSourceRef.current.addEventListener('JOIN', event => {
          const data = JSON.parse(event.data);
          console.log(data);
        });

        eventSourceRef.current.addEventListener('error', event => {
          console.error('SSE Error:', event);
          eventSourceRef.current.close();
        });
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    setupEventSource();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log(fcmToken, 'fcmToken');
  };
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    Alert.alert(remoteMessage.notification.title);
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