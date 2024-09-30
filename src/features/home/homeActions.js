import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {api, authApi} from '../../api/api';

export const getDriveCurationInfo = createAsyncThunk(
  'drive/getDriveCurationInfo',
  async (_, thunkAPI) => {
    try {
      const response = await authApi.get('course/my-theme');
      if (response.status == 200) {
        // console.log(response.data, 'driveCurationList');
        const driveCurationList = response.data;
        return {
          driveCurationList: driveCurationList,
        };
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  },
);

export const getRegionCurationInfo = createAsyncThunk(
  'drive/getRegionCurationInfo',
  async (_, thunkAPI) => {
    try {
      const response = await authApi.get('course/my-region');
      if (response.status == 200) {
        console.log(response.data, 'regionCurationList');
        const regionCurationList = response.data;
        const category = response.data.map(data => data.tagName);

          if (category.length > 0) {
            thunkAPI.dispatch(setActiveButton(category[0]));
          }
        return {
          regionCurationList: regionCurationList,
          category: category,
        };
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  },
);
export const setActiveButton = createAction('drive/setActiveButton');