import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import driveReducer from '../features/drive/driveSlice';
import meetReducer from '../features/meet/meetSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    drive: driveReducer,
    meet: meetReducer
  },
});

export default store;
