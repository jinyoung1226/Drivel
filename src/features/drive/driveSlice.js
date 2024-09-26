import {createSlice} from '@reduxjs/toolkit';
import {
  getDriveList,
  getDriveListMore,
  setFilterDriveStyle,
  setFilterDriveTheme,
  setFilterDriveWith,
  setFilterRegion,
  getBlogReview,
  setBlogReviewList,
  getCafeBlogReview,
  setCafeBlogReviewList,
  getDriveReviewList,
  getDriveReviewListMore
} from './driveActions';

const initialState = {
  driveList: null,
  initialPage: 0,
  filterDriveWith: '',
  filterDriveTheme: '',
  filterDriveStyle: '',
  filterRegion: '',
  isLoading: false,
  isLastPage: false,
  currentPage: null,
  blogReviewList: null,
  cafeBlogReviewList: null,
  driveReviewList: [],
  isReviewLastPage: false,
  reviewCurrentPage: null,
  reviewTotalElements: 0,
  averageRating: 0,
  
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
    builder.addCase(setFilterRegion, (state, action) => {
      state.filterRegion = action.payload;
    });
    builder.addCase(getBlogReview.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getBlogReview.fulfilled, (state, action) => {
      state.blogReviewList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getBlogReview.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(setBlogReviewList, (state, action) => {
      state.blogReviewList = action.payload;
    });
    builder.addCase(getCafeBlogReview.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getCafeBlogReview.fulfilled, (state, action) => {
      state.cafeBlogReviewList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCafeBlogReview.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(setCafeBlogReviewList, (state, action) => {
      state.cafeBlogReviewList = action.payload;
    });
    builder.addCase(getDriveReviewList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getDriveReviewList.fulfilled, (state, action) => {
      state.averageRating = action.payload.averageRating;
      state.reviewTotalElements = action.payload.reviewTotalElements;
      state.driveReviewList = action.payload.driveReviewList;
      state.isReviewLastPage = action.payload.isReviewLastPage;
      state.reviewCurrentPage = action.payload.reviewCurrentPage;
      state.isLoading = false;
    });
    builder.addCase(getDriveReviewList.rejected, state => {
      state.isLoading = false
    });
    builder.addCase(getDriveReviewListMore.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getDriveReviewListMore.fulfilled, (state, action) => {
      state.driveReviewList = [...state.driveReviewList, ...action.payload.driveReviewList];
      state.isReviewLastPage = action.payload.isReviewLastPage;
      state.reviewCurrentPage = action.payload.reviewCurrentPage;
      state.isLoading = false;
    });
    builder.addCase(getDriveReviewListMore.rejected, state => {
      state.isLoading = false;
    });


  },
});

export default driveSlice.reducer;
