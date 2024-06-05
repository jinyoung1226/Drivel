import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken) {
    return { isAuthenticated: true, accessToken };
  } else {
    return { isAuthenticated: false, accessToken: null };
  }
});

export const login = createAsyncThunk('auth/login', async (_, thunkAPI) => {
  try {
    const accessToken = 'dummy_token'; // 더미 토큰 생성
    await AsyncStorage.setItem('accessToken', accessToken);
    return { isAuthenticated: true, accessToken };
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'Login failed' });
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await AsyncStorage.removeItem('accessToken');
    return { isAuthenticated: false, accessToken: null };
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'Logout failed' });
  }
});

// export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
//   try {
//     const response = await axios.post('https://yourapi.com/login', { username, password });
//     const accessToken = response.data.accessToken;

//     await AsyncStorage.setItem('accessToken', accessToken);

//     return { isAuthenticated: true, accessToken };
//   } catch (error) {
//     return thunkAPI.rejectWithValue({ error: error.response.data });
//   }
// });