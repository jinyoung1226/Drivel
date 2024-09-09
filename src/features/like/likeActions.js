import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {authApi} from '../../api/api';

export const toggleLike = createAsyncThunk(
  'like/toggleLike',
  async (courseId, thunkAPI) => {
    try {
      const response = await authApi.put(`course/like/${courseId}`);
      if (response.status == 200) {
        console.log(response.status);
        return courseId;
      }
    } catch (error) {
      if (error.response) {
        console.log('좋아요 토글 에러');
        console.log(error.response.status);
      } else {
        console.log(error);
      }
    }
  },
);

export const setLiked = createAction('like/setLiked');

export const setLikedItem = createAction('like/setLikedItem');
