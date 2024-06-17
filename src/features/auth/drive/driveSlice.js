import {createSlice} from '@reduxjs/toolkit';

const driveSlice = createSlice({
  name: 'drive',
  initialState: {
    driveInfo: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDriveInfo.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchDriveInfo.fulfilled, (state, action) => {
      state.driveInfo = action.payload.driveInfo;
      state.status = 'succeeded';
    });
    builder.addCase(fetchDriveInfo.rejected, (state, action) => {
      state.error = action.payload.error;
      state.status = 'failed';
    });
  },
});

export default driveSlice.reducer;
