import {createSlice} from '@reduxjs/toolkit';

// authSlice 정의: 인증 관련 상태와 리듀서를 관리합니다.
const initialState = {
  isTabBarVisible: true,
};
const tabBarSlice = createSlice({
  name: 'tabBar',
  initialState,
  reducers: {
    showTabBar(state) {
      state.isTabBarVisible = true;
    },
    hideTabBar(state) {
      state.isTabBarVisible = false;
    },
  },
});

export const {showTabBar, hideTabBar} = tabBarSlice.actions;

export default tabBarSlice.reducer;
