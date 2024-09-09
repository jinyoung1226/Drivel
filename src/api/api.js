import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import config from '../config/config';
import {Alert} from 'react-native';

export const api = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const refreshApi = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

refreshApi.interceptors.request.use(
  async config => {
    console.log('헤더에 토큰 삽입');
    const refreshToken = await EncryptedStorage.getItem('refreshToken'); // AsyncStorage에서 토큰 가져오기
    if (refreshToken) {
      console.log(refreshToken, '리프레쉬 토큰');
      config.headers['Authorization'] = `Bearer ${refreshToken}`; // 헤더에 토큰 추가
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

refreshApi.interceptors.response.use(response => {
  console.log('refreshApi응답');
  return response;
});

export const authApi = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

authApi.interceptors.request.use(
  async config => {
    console.log('헤더에 토큰 삽입');
    const token = await AsyncStorage.getItem('accessToken'); // AsyncStorage에서 토큰 가져오기
    if (token) {
      console.log(token);
      config.headers['Authorization'] = `Bearer ${token}`; // 헤더에 토큰 추가
    }
    console.log('액세스토큰 존재');
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  response => {
    console.log('authApi응답');
    return response;
  },
  async error => {
    const originalRequest = error.config;
    //  토큰 만료 등의 조건을 확인하고 토큰 재발급 로직 실행
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log(error, '401');
      originalRequest._retry = true; // 재시도 플래그 설정
      // 토큰 재발급 로직...
      const refreshToken = await EncryptedStorage.getItem('refreshToken');
      console.log(refreshToken, '리프레쉬');
      try {
        const response = await refreshApi.post(`/token/re-issue`);
        if (response.status === 200) {
          console.log(response.data, 're-issue');
          await AsyncStorage.setItem('accessToken', response.data.accessToken);
          await EncryptedStorage.setItem(
            'refreshToken',
            response.data.refreshToken,
          );
          // 새 토큰 저장
          authApi.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data.accessToken}`; // 인스턴스의 기본 헤더 업데이트
          return authApi(originalRequest); // 원래 요청 재시도
        }
      } catch (error) {
        if (error.response.status == 401) {
          Alert.alert(error.response.data.message);
          return Promise.reject(error.response.data.message);
        }
      }
    }
    return Promise.reject(error);
  },
);

export const formDataApi = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

formDataApi.interceptors.request.use(
  async config => {
    console.log('헤더에 토큰 삽입');
    const token = await AsyncStorage.getItem('accessToken'); // AsyncStorage에서 토큰 가져오기
    if (token) {
      console.log(token);
      config.headers['Authorization'] = `Bearer ${token}`; // 헤더에 토큰 추가
    }
    console.log('액세스토큰 존재');
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

formDataApi.interceptors.response.use(
  response => {
    console.log('formDataApi응답');
    return response;
  },
  async error => {
    const originalRequest = error.config;
    //  토큰 만료 등의 조건을 확인하고 토큰 재발급 로직 실행
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log(error, '401');
      originalRequest._retry = true; // 재시도 플래그 설정
      // 토큰 재발급 로직...
      const refreshToken = await EncryptedStorage.getItem('refreshToken');
      console.log(refreshToken, '리프레쉬');
      try {
        const response = await refreshApi.post(`/token/re-issue`);
        if (response.status === 200) {
          console.log(response.data, 're-issue');
          await AsyncStorage.setItem('accessToken', response.data.accessToken);
          await EncryptedStorage.setItem(
            'refreshToken',
            response.data.refreshToken,
          );
          // 새 토큰 저장
          formDataApi.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data.accessToken}`; // 인스턴스의 기본 헤더 업데이트
          return authApi(originalRequest); // 원래 요청 재시도
        }
      } catch (error) {
        if (error.response.status == 401) {
          Alert.alert(error.response.data.message);
          return Promise.reject(error.response.data.message);
        }
      }
    }
    return Promise.reject(error);
  },
);
