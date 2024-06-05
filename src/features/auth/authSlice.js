import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, login, logout } from './authActions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    accessToken: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.isLoading = false;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.isLoading = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload.error;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload.error;
    });
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
