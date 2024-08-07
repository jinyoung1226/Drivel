import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {api, authApi} from '../../api/api';

export const getDriveList = createAsyncThunk(
  'drive/getDriveList',
  async ({themeId, styleId, togetherId, page, size}, thunkAPI) => {
    try {
      const response = await authApi.get('/course', {
        params: {
          themeId,
          styleId,
          togetherId,
          page,
          size,
        },
      });
      console.log(themeId, styleId, togetherId, page, size);
      if (response.status == 200) {
        const driveList = response.data.content;
        const isLastPage = response.data.last;
        const currentPage = response.data.number;
        return {
          driveList: driveList,
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

export const getDriveListMore = createAsyncThunk(
  'drive/getDriveListMore',
  async ({themeId, styleId, togetherId, page, size}, thunkAPI) => {
    try {
      const response = await authApi.get('/course', {
        params: {
          themeId,
          styleId,
          togetherId,
          page,
          size,
        },
      });
      if (response.status === 200) {
        console.log(response.data.number, '현재페이지');
        console.log(response.data.last);
        const driveList = response.data.content;
        const isLastPage = response.data.last;
        const currentPage = response.data.number;
        return {driveList, isLastPage, currentPage};
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

export const setFilterDriveStyle = createAction('drive/filterDriveStyle');

export const setFilterDriveTheme = createAction('drive/filterDriveTheme');

export const setFilterDriveWith = createAction('drive/filterDriveWith');
