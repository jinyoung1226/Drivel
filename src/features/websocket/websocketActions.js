import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as StompJs from '@stomp/stompjs';
import config from '../../config/config';
import { refreshApi } from '../../api/api';

let webSocketClient = null;
let subscription = null;
let meetingSubscription = null;
// 웹소켓 연결 비동기 액션
export const connectWebSocket = createAsyncThunk(
  'websocket/connect',
  async (_, thunkAPI) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const client = (token) => new StompJs.Client({
          brokerURL: `${config.WEBSOCKET_URL}/ws/connect`,
          forceBinaryWSFrames: true,
          appendMissingNULLonIncoming: true,
          connectHeaders: { accessToken: token },
          reconnectDelay: 0,
          debug: function (str) {
            console.log(str, '웹소켓 연결 로그');
          },
          onStompError: async function (str) {
            console.error('웹소켓 연결 에러 발생: ', str);
            const response = await refreshApi.post(`/token/re-issue`);
            if (response.status === 200) {
              console.log('토큰 재발급 성공');
              await EncryptedStorage.setItem('refreshToken', response.data.refreshToken);
              await AsyncStorage.setItem('accessToken', response.data.accessToken);
              webSocketClient = client(response.data.accessToken);
              webSocketClient.activate();
            } else {
              console.error('토큰 재발급 실패');
            }
          },
        });

        webSocketClient = client(accessToken);
        webSocketClient.onConnect = () => {
          thunkAPI.dispatch(websocketConnected());
          subscription = webSocketClient.subscribe('/sub/alert/eeee', (message) => {
            thunkAPI.dispatch(websocketMessageReceived(message));
          });
        };

        webSocketClient.activate();
        return { isConnected: true };
      } catch (error) {
        console.error('웹소켓 연결 실패', error);
        return thunkAPI.rejectWithValue({ isConnected: false });
      }
    } else {
      console.error('액세스 토큰이 없습니다.');
      return thunkAPI.rejectWithValue({ isConnected: false });
    }
  }
);

export const subscribeToChannel = createAsyncThunk(
  'websocket/subscribe',
  async ({ channel, callback }, thunkAPI) => {
    if (webSocketClient && webSocketClient.connected) {
      try {
        console.log('구독 성공');
        meetingSubscription = webSocketClient.subscribe(channel, callback)
      } catch (error) {
        console.error('구독 실패', error);
      }
    } else {
      console.error('웹소켓이 연결되지 않았습니다.');
    }
  }
);

export const unsubscribeToChannel = createAsyncThunk(
  'websocket/unsubscribe',
  async (_, thunkAPI) => {
    if (meetingSubscription) {
      try {
        meetingSubscription.unsubscribe();
        console.log('구독 해제 성공');
      } catch (error) {
        console.error('구독 해제 실패', error);
      }
    } else {
      console.error('구독 중인 채널이 없습니다.');
    }
  }
);

// 웹소켓 메시지 수신 액션
export const websocketMessageReceived = createAction('websocket/messageReceived');

// 웹소켓 연결 종료 비동기 액션
export const disconnectWebSocket = createAsyncThunk(
  'websocket/disconnect',
  async (_, thunkAPI) => {
    if (webSocketClient) {
      try {
        webSocketClient.deactivate();
        console.log('웹소켓 연결 해제');
        subscription = null;
        webSocketClient = null; 
        return { isConnected: false };
      } catch (error) {
        console.error('웹소켓 연결 해제 실패', error);
        return thunkAPI.rejectWithValue({ isConnected: true });
      }
    } else {
      console.error('웹소켓 클라이언트가 없습니다.');
      return thunkAPI.rejectWithValue({ isConnected: false });
    }
  }
);

// 웹소켓 연결 상태 액션
export const websocketConnected = createAction('websocket/connected');
export const websocketDisconnected = createAction('websocket/disconnected');