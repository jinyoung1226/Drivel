import {createSlice} from '@reduxjs/toolkit';
import {toggleLike, setLiked, setLikedItem} from './likeActions';

const likeSlice = createSlice({
  name: 'like',
  initialState: {
    liked: false, // 각 코스의 좋아요 상태를 관리하는 객체
    isLoading: false,
    courseId: '',
    likedItem: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(toggleLike.pending, state => {
        state.isLoading = true;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseId = action.payload.courseId;
      })
      .addCase(toggleLike.rejected, state => {
        state.isLoading = false;
      });
    builder.addCase(setLiked, (state, action) => {
      state.liked = action.payload;
    });
    builder.addCase(setLikedItem, (state, action) => {
      if (Array.isArray(action.payload)) {
        // If the payload is an array, replace likedItem with it
        state.likedItem = action.payload;
      } else {
        // Otherwise, toggle the item in the likedItem array
        const itemId = action.payload;
        const index = state.likedItem.findIndex(likedItemId => likedItemId === itemId);
        
        if (index !== -1) {
          // If item is found, remove it from the array
          state.likedItem.splice(index, 1);
        } else {
          // If item is not found, add it to the array
          state.likedItem.push(itemId);
        }
      }
    });
  },
});

export default likeSlice.reducer;
