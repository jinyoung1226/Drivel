import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import config from '../config/config';
import {Alert} from 'react-native';

export const api = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
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
      config.headers['Authorization'] = `Bearer ${token}`; // 헤더에 토큰 추가
    }
    console.log('액세스토큰 존재')
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  response => {
    console.log('응답');
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
      console.log(refreshToken);
      // console.log(refreshToken,'refreshToken')
      try {
        const response = await api.post(
          `/token/re-issue`,
          {},
          {headers: {Authorization: `Bearer ${refreshToken}`}},
        );
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

// export const formDataApi = axios.create({
//   baseURL: config.SERVER_URL,
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });

// formDataApi.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('accessToken'); // AsyncStorage에서 토큰 가져오기
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`; // 헤더에 토큰 추가
//     }
//     // console.log('@@@@')
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );
// formDataApi.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;
//     // 토큰 만료 등의 조건을 확인하고 토큰 재발급 로직 실행
//     if (error.response.status === 401 && !originalRequest._retry) {
//       console.log(error, '401');
//       originalRequest._retry = true; // 재시도 플래그 설정
//       // 토큰 재발급 로직...
//       const email = await AsyncStorage.getItem('email');
//       // console.log(email, 'email')
//       const refreshToken = await EncryptedStorage.getItem('refreshToken');
//       // console.log(refreshToken,'refreshToken')
//       const response = await axios.post(`${config.SERVER_URL}/token/re-issue`, {
//         email: email,
//         refreshToken: refreshToken,
//       });
//       if (response.status === 200) {
//         // console.log(response.status, '재발급 성공')
//         await EncryptedStorage.setItem(
//           'refreshToken',
//           response.data.refreshToken,
//         );
//         await AsyncStorage.setItem('accessToken', response.data.accessToken); // 새 토큰 저장
//         formDataApi.defaults.headers.common[
//           'Authorization'
//         ] = `Bearer ${response.data.accessToken}`; // 인스턴스의 기본 헤더 업데이트
//         return authApi(originalRequest); // 원래 요청 재시도
//       }
//     }
//     return Promise.reject(error);
//   },
// );
