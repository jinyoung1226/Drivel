import {createSlice} from '@reduxjs/toolkit';
import {
  getDriveCurationInfo,
  getRegionCurationInfo,
  setActiveButton,
} from './homeActions';

const initialState = {
  driveCurationList: [],
  regionCurationList: [],
  isLoading: false,
  category: [],
  activeButton: '',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDriveCurationInfo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getDriveCurationInfo.fulfilled, (state, action) => {
      state.driveCurationList = action.payload.driveCurationList;
      state.isLoading = false;
    });
    builder.addCase(getDriveCurationInfo.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(getRegionCurationInfo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getRegionCurationInfo.fulfilled, (state, action) => {
      state.regionCurationList = action.payload.regionCurationList;
      state.category = action.payload.category;
      state.isLoading = false;
    });
    builder.addCase(getRegionCurationInfo.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(setActiveButton, (state, action) => {
      state.activeButton = action.payload;
    });

  },
});

export default homeSlice.reducer;
