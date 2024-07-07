import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {api, authApi} from '../../api/api';

export const getMeetList = createAsyncThunk(
  'meet/getMeetList',
  async ({page, size, sort, age, gender, carModel}, thunkAPI) => {
    try {
      const response = await authApi.get('/meeting', {
        params: {page, size, sort, age, gender, carModel},
      });
      if (response.status == 200) {
        console.log(response.data.number, '현재페이지');
        const meetList = response.data.content;
        const totalMeeting = response.data.totalElements;
        const isLastPage = response.data.last;
        const currentPage = response.data.number;
        console.log(response.data.last);
        return {
          meetList: meetList,
          totalMeeting: totalMeeting,
          isLastPage: isLastPage,
          currentPage: currentPage,
        };
      } else {
        return thunkAPI.rejectWithValue({
          error: `Unexpected response status: ${response.status}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
);

export const getMeetListMore = createAsyncThunk(
  'meet/getMeetListMore',
  async ({page, size, sort, age, gender, carModel}, thunkAPI) => {
    try {
      const response = await authApi.get('/meeting', {
        params: {page, size, sort, age, gender, carModel},
      });
      if (response.status === 200) {
        console.log(response.data.number, '현재페이지');
        console.log(response.data.last);
        const meetList = response.data.content;
        const isLastPage = response.data.last;
        const currentPage = response.data.number;
        return {meetList, isLastPage, currentPage};
      } else {
        return thunkAPI.rejectWithValue({
          error: `Unexpected response status: ${response.status}`,
        });
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

export const getMeetListRecommended = createAsyncThunk(
  'meet/getMeetListRecommended',
  async ({page, size}, thunkAPI) => {
    try {
      const response = await authApi.get('/meeting', {
        params: {page: page, size: size, sort: 'id,DESC'},
      }); //이후 추천순으로 sort 바꾸기
      if (response.status == 200) {
        console.log(response.data);
        const meetListRecommended = response.data.content;
        return {meetListRecommended: meetListRecommended};
      } else {
        return thunkAPI.rejectWithValue({
          error: `Unexpected response status: ${response.status}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
);

export const setTab = createAction('meet/setTab');

export const setFilterGender = createAction('meet/filterGender');

export const setFilterAge = createAction('meet/filterAge');

export const setFilterCarModel = createAction('meet/filterCarModel');

export const setFilterCarCareer = createAction('meet/filterCarCareer');

export const setFilterDriveStyle = createAction('meet/filterDriveStyle');

export const setSort = createAction('meet/setSort');
