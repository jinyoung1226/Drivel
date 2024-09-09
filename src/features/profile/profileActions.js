import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {api, authApi} from '../../api/api';
import {Alert} from 'react-native';
import {setGlobalNickname} from '../auth/authSlice';
export const getMyProfileInfo = createAsyncThunk(
  'profile/getMyProfileInfo',
  async (_, thunkAPI) => {
    try {
      const response = await authApi.get('/profile/my');
      if (response.status == 200) {
        console.log(response.data);
        thunkAPI.dispatch(setGlobalNickname(response.data.nickname));
        return {
          myProfileInfo: response.data,
        };
      }
    } catch (error) {
      if (error.response) {
        Alert.alert(error.response.data.message);
      } else {
        console.log('서버 접속 오류');
      }
    }
  },
);
