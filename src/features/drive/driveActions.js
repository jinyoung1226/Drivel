import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, authApi} from '../../api/api';

export const fetchDriveInfo = createAsyncThunk(
  'drive/fetchDriveInfo',
  async ({id}, thunkAPI) => {
    try {
      console.log('Fetching drive info for ID:', id);
      const response = await authApi.get(`/course/${id}`);
      console.log('Response status:', response.status);
      if (response.status === 200) {
        // console.log(response.data);
        return response.data;
      } else {
        throw new Error('Failed to fetch drive info');
      }
    } catch (error) {
      // 에러 발생 시 에러 메시지를 포함하여 rejectWithValue로 리턴
      console.error('Error fetching drive info:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
