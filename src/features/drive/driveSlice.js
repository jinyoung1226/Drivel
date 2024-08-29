import {createSlice} from '@reduxjs/toolkit';
import {
  getDriveList,
  getDriveListMore,
  setFilterDriveStyle,
  setFilterDriveTheme,
  setFilterDriveWith,
  getBlogReview,
  setBlogReviewList
} from './driveActions';

const initialState = {
  driveList: null,
  initialPage: 0,
  filterDriveWith: '',
  filterDriveTheme: '',
  filterDriveStyle: '',
  isLoading: false,
  isLastPage: false,
  currentPage: null,
  blogReviewList: null,
};

const driveSlice = createSlice({
  name: 'drive',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDriveList.pending, state => {
      // state.isLoading = true;
    });
    builder.addCase(getDriveList.fulfilled, (state, action) => {
      state.driveList = action.payload.driveList;
      state.isLastPage = action.payload.isLastPage;
      state.currentPage = action.payload.currentPage;
      // state.isLoading = false;
    });
    builder.addCase(getDriveList.rejected, (state, action) => {
      // state.isLoading = false;
    });
    builder.addCase(getDriveListMore.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getDriveListMore.fulfilled, (state, action) => {
      state.driveList = [...state.driveList, ...action.payload.driveList];
      state.isLoading = false;
      state.isLastPage = action.payload.isLastPage;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(getDriveListMore.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(setFilterDriveStyle, (state, action) => {
      state.filterDriveStyle = action.payload;
    });
    builder.addCase(setFilterDriveTheme, (state, action) => {
      state.filterDriveTheme = action.payload;
    });
    builder.addCase(setFilterDriveWith, (state, action) => {
      state.filterDriveWith = action.payload;
    });
    builder.addCase(getBlogReview.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getBlogReview.fulfilled, (state, action) => {
      state.blogReviewList = action.payload;
    });
    builder.addCase(getBlogReview.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(setBlogReviewList, (state, action) => {
      state.blogReviewList = action.payload
    });
  },
});

export default driveSlice.reducer;
