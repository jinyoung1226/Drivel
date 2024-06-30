import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { api, authApi } from '../../api/api'

export const getMeetList = createAsyncThunk('meet/getMeetList', async ({ page, size, sort }, thunkAPI) => {
    try {
      const response = await authApi.get('/meeting', {params: {page: page, size: size, sort: sort}})
      if (response.status == 200) {
        console.log(response.data)
        const meetList = response.data.content
        const totalMeeting = response.data.totalElements
        return { meetList: meetList, totalMeeting: totalMeeting};
      } else {
        return thunkAPI.rejectWithValue({ error: `Unexpected response status: ${response.status}` });
      }
    } catch (error) {
      console.log(error)
    }
});

export const getMeetListRecommended = createAsyncThunk('meet/getMeetListRecommended', async ({ page, size }, thunkAPI) => {
  try {
    const response = await authApi.get('/meeting', {params: {page: page, size: size, sort: 'id,DESC'}}) //이후 추천순으로 sort 바꾸기
    if (response.status == 200) {
      console.log(response.data)
      const meetListRecommended = response.data.content
      return { meetListRecommended: meetListRecommended};
    } else {
      return thunkAPI.rejectWithValue({ error: `Unexpected response status: ${response.status}` });
    }
  } catch (error) {
    console.log(error)
  }
});

export const setTab = createAction('meet/setTab');