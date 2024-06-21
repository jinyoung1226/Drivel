import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import driveReducer from '../features/drive/driveSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    drive: driveReducer,
  },
});

export default store;
