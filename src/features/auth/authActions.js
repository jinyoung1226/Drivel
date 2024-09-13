import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {api, authApi, refreshApi} from '../../api/api';
import {Alert} from 'react-native';

// 사용자의 인증 상태를 확인하는 비동기 액션
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const response = await authApi.post('/token/signIn');
        if (response.status == 200) {
          console.log(response.data, '/token/signIn');
          const nickname = response.data.nickname;
          const userId = response.data.id;
          if (response.data.onboarded == true) {
            return {
              isAuthenticated: true,
              accessToken: accessToken,
              nickname: nickname,
              onboarded: true,
              isLoading: false,
              userId: userId,
            };
          }
          if (response.data.onboarded == false) {
            return {
              isAuthenticated: true,
              accessToken: accessToken,
              nickname: nickname,
              onboarded: false,
              isLoading: false,
              userId: userId,
            };
          }
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          Alert.alert('로그인이 필요합니다');
          return thunkAPI.rejectWithValue({
            isAuthenticated: false,
            accessToken: null,
            isLoading: false,
          });
        } else {
          Alert.alert('서버 접속 오류');
          return thunkAPI.rejectWithValue({
            isAuthenticated: false,
            accessToken: null,
            isLoading: false,
          });
        }
      }
    } else {
      return {isAuthenticated: false, accessToken: null, isLoading: false};
    }
  },
);

// 사용자가 로그인하는 비동기 액션
export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}, thunkAPI) => {
    try {
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      const response = await api.post('/auth/signIn', {
        email,
        password,
        fcmToken: fcmToken,
      }); //fcm토큰 발행하는거 만들고 불러와야함.
      console.log(response.status);
      console.log(fcmToken, 'fcm');
      if (response.status == 200) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const nickname = response.data.nickname;
        const userId = response.data.id;
        console.log(response.data, 'login');
        await AsyncStorage.setItem('accessToken', accessToken);
        await EncryptedStorage.setItem('refreshToken', refreshToken);
        if (response.data.onboarded == true) {
          return {
            isAuthenticated: true,
            accessToken: accessToken,
            nickname: nickname,
            onboarded: true,
            isLoading: false,
            userId: userId,
          };
        }
        if (response.data.onboarded == false) {
          return {
            isAuthenticated: true,
            accessToken: accessToken,
            nickname: nickname,
            onboarded: false,
            isLoading: false,
            userId: userId,
          };
        }
      }
    } catch (error) {
      if (error.response) {
        Alert.alert(error.response.data.message);
        return thunkAPI.rejectWithValue({
          isAuthenticated: false,
          accessToken: null,
          isLoading: false,
        });
      } else {
        Alert.alert('서버접속오류');
        return thunkAPI.rejectWithValue({
          isAuthenticated: false,
          accessToken: null,
          isLoading: false,
        });
      }
    }
  },
);

// 사용자가 로그아웃하는 비동기 액션
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await refreshApi.post('/auth/signOut');
    if (response.status == 200) {
      console.log(response.status);
      await AsyncStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');
      return {
        isAuthenticated: false,
        accessToken: null,
        isLoading: false,
        userId: null,
      };
    }
  } catch (error) {
    console.log(error.response.status);
    if (error.response) {
      await AsyncStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');
      return thunkAPI.rejectWithValue({
        isAuthenticated: false,
        accessToken: null,
        isLoading: false,
        userId: null,
      });
    } else {
      await AsyncStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');
      Alert.alert('서버접속오류');
      return thunkAPI.rejectWithValue({
        isAuthenticated: false,
        accessToken: null,
        isLoading: false,
        userId: null,
      });
    }
  }
});

export const kakaoLogin = createAsyncThunk(
  'auth/kakaoLogin',
  async ({code}, thunkAPI) => {
    try {
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      const response = await api.get('/kakao/login', {
        params: {code: code, fcmToken: fcmToken},
      });
      if (response.status == 200) {
        console.log(fcmToken, 'fcm');
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const nickname = response.data.nickname;
        const userId = response.data.id;
        await AsyncStorage.setItem('isKakaoRegitered', 'true');
        await AsyncStorage.setItem('accessToken', accessToken); //AsyncStorage에 저장하는 이유는 애플리케이션이 재시작될 때도 accessToken을 유지하기 위함. 자동로그인되야하니..
        await EncryptedStorage.setItem('refreshToken', refreshToken);
        console.log(response.data, '카카오 로그인성공');
        if (response.data.onboarded == true) {
          return {
            isAuthenticated: true,
            accessToken: accessToken,
            nickname: nickname,
            onboarded: true,
            isLoading: false,
            userId: userId,
          };
        }
        if (response.data.onboarded == false) {
          return {
            isAuthenticated: true,
            accessToken: accessToken,
            nickname: nickname,
            onboarded: false,
            isLoading: false,
            userId: userId,
          };
        }
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        Alert.alert(error.response.data.message);
        return thunkAPI.rejectWithValue({
          isAuthenticated: false,
          accessToken: null,
          isLoading: false,
        });
      } else {
        Alert.alert('서버접속오류');
        return thunkAPI.rejectWithValue({
          isAuthenticated: false,
          accessToken: null,
          isLoading: false,
        });
      }
    }
  },
);
export const setOnboarded = createAction('auth/setOnboarded');
