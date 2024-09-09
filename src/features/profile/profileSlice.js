import {createSlice} from '@reduxjs/toolkit';
import {getMyProfileInfo} from './profileActions';

// authSlice 정의: 인증 관련 상태와 리듀서를 관리합니다.
const initialState = {
  isLoading: false,
  myProfileInfo: null,
};
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMyProfileInfo.pending, state => {
      state.isLoading = true; // 인증 상태를 확인하는 중이므로 로딩 상태를 true로 설정합니다.
    });
    builder.addCase(getMyProfileInfo.fulfilled, (state, action) => {
      state.myProfileInfo = action.payload.myProfileInfo;
      state.isLoading = false; // 로딩이 완료되었으므로 false로 설정합니다.
    });
    builder.addCase(getMyProfileInfo.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default profileSlice.reducer;
