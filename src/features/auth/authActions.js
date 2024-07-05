import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {api, authApi} from '../../api/api';
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
          return {
            isAuthenticated: true,
            accessToken: accessToken,
            nickname: nickname,
          };
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
      return {isAuthenticated: false, accessToken: null};
    }
  },
);

// 사용자가 로그인하는 비동기 액션
export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}, thunkAPI) => {
    try {
      // const fcmToken = await AsyncStorage.getItem('fcmToken');
      const response = await api.post('/auth/signIn', {
        email,
        password,
        fcmToken: 'aaa',
      }); //fcm토큰 발행하는거 만들고 불러와야함.
      console.log(response.status);
      if (response.status == 200) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const nickname = response.data.nickname;
        await AsyncStorage.setItem('accessToken', accessToken); //AsyncStorage에 저장하는 이유는 애플리케이션이 재시작될 때도 accessToken을 유지하기 위함. 자동로그인되야하니..
        await EncryptedStorage.setItem('refreshToken', refreshToken);
        return {
          isAuthenticated: true,
          accessToken: accessToken,
          nickname: nickname,
        }; // 액세스 토큰을 redux로 관리할 필요가 있을까??,, 흠..
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status == 401) {
          console.log(error.response.data);
          Alert.alert(error.response.data.message);
        }
      } else {
        Alert.alert('서버접속오류');
      }
    }
  },
);

// 사용자가 로그아웃하는 비동기 액션
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await authApi.post('/auth/signOut');
    if (response.status == 200) {
      console.log(response.status);
      await AsyncStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');
      return {isAuthenticated: false, accessToken: null};
    }
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status == 401) {
      await AsyncStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');
      return thunkAPI.rejectWithValue({
        isAuthenticated: false,
        accessToken: null,
      });
    } else {
      Alert.alert('서버접속오류');
    }
  }
});

export const kakaoLogin = createAsyncThunk(
  'auth/kakaoLogin',
  async ({code}, thunkAPI) => {
    try {
      const response = await api.get('/kakao/login', {params: {code: code}});
      if (response.status == 200) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const nickname = response.data.nickname;
        await AsyncStorage.setItem('accessToken', accessToken); //AsyncStorage에 저장하는 이유는 애플리케이션이 재시작될 때도 accessToken을 유지하기 위함. 자동로그인되야하니..
        await EncryptedStorage.setItem('refreshToken', refreshToken);
        console.log('로그인성공');
        return {
          isAuthenticated: true,
          accessToken: accessToken,
          nickname: nickname,
          isKakaoLoggedIn: true,
        };
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        if (error.response.status == 401) {
          Alert.alert(error.response.data.message);
        }
      } else {
        Alert.alert('서버접속오류');
      }
    }
  },
);
