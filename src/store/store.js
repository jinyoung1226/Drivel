import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import driveReducer from '../features/drive/driveSlice';
import meetReducer from '../features/meet/meetSlice';
import likeReducer from '../features/like/likeSlice';
import profileReducer from '../features/profile/profileSlice';
import tabBarReducer from '../features/tabBar/tabBarSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    drive: driveReducer,
    meet: meetReducer,
    like: likeReducer,
    profile: profileReducer,
    tabBar: tabBarReducer,
  },
});

export default store;
