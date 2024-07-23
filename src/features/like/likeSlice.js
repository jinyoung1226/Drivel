import {createSlice} from '@reduxjs/toolkit';
import {toggleLike} from './likeActions';

const likeSlice = createSlice({
  name: 'like',
  initialState: {
    likedItems: {}, // 각 코스의 좋아요 상태를 관리하는 객체
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(toggleLike.pending, state => {
        state.status = 'loading';
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const courseId = action.payload;
        if (state.likedItems[courseId] === undefined) {
          state.likedItems[courseId] = true; // 처음 좋아요가 눌렸을 때 true로 설정
        } else {
          state.likedItems[courseId] = !state.likedItems[courseId];
        }
        state.status = 'succeeded';
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default likeSlice.reducer;
