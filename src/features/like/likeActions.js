import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {authApi} from '../../api/api';

export const toggleLike = createAsyncThunk(
  'like/toggleLike',
  async (courseId, thunkAPI) => {
    try {
      const response = await authApi.put(`course/like/${courseId}`);
      return courseId; // 성공 시 courseId 반환
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
