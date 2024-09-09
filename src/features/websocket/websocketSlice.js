import {createSlice} from '@reduxjs/toolkit';
import {
  connectWebSocket,
  disconnectWebSocket,
  websocketMessageReceived,
  websocketConnected,
  websocketDisconnected,
} from './websocketActions';

const initialState = {
  isConnected: false,
  messages: [],
};

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(websocketConnected, state => {
        state.isConnected = true;
      })
      .addCase(websocketDisconnected, state => {
        state.isConnected = false;
      })
      .addCase(websocketMessageReceived, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(connectWebSocket.fulfilled, state => {
        state.isConnected = true;
      })
      .addCase(connectWebSocket.rejected, state => {
        state.isConnected = false;
      })
      .addCase(disconnectWebSocket.fulfilled, state => {
        state.isConnected = false;
      })
      .addCase(disconnectWebSocket.rejected, state => {
        state.isConnected = true;
      });
  },
});

export default websocketSlice.reducer;
