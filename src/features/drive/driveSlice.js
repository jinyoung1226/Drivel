import {createSlice} from '@reduxjs/toolkit';
import {fetchDriveInfo} from './driveActions';

const driveSlice = createSlice({
  name: 'drive',
  initialState: {
    driveInfo: null,
    isLoading: null,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDriveInfo.pending, state => {
      state.isLoading = 'loading';
    });
    builder.addCase(fetchDriveInfo.fulfilled, (state, action) => {
      state.driveInfo = action.payload;
      state.isLoading = 'succeeded';
    });
    builder.addCase(fetchDriveInfo.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = 'failed';
    });
  },
});

export default driveSlice.reducer;
