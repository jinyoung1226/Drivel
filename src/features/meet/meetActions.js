import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {authApi} from '../../api/api';
import {Alert} from 'react-native';

export const getMeetList = createAsyncThunk(
  'meet/getMeetList',
  async (
    {
      page,
      size,
      orderBy,
      age,
      genderId,
      carModel,
      carCareer,
      styleId,
      themeId,
      togetherId,
      regionId,
    },
    thunkAPI,
  ) => {
    try {
      const response = await authApi.get('/meeting', {
        params: {
          page,
          size,
          orderBy,
          age,
          genderId,
          carModel,
          carCareer,
          styleId,
          themeId,
          togetherId,
          regionId,
        },
      });
      if (response.status == 200) {
        // console.log(response.data.number, '현재페이지');
        const meetList = response.data.content;
        const totalMeeting = response.data.totalElements;
        const isLastPage = response.data.last;
        const currentPage = response.data.number;
        // console.log(response.data.last);
        return {
          meetList: meetList,
          totalMeeting: totalMeeting,
          isLastPage: isLastPage,
          currentPage: currentPage,
        };
      } else {
        console.log('미팅리스트 불러오기 에러');
        return thunkAPI.rejectWithValue({
          error: `Unexpected response status: ${response.status}`,
        });
      }
    } catch (error) {
      console.log('미팅리스트 불러오기 에러');
      console.log(error);
    }
  },
);

export const getMeetListMore = createAsyncThunk(
  'meet/getMeetListMore',
  async (
    {
      page,
      size,
      orderBy,
      age,
      genderId,
      carModel,
      carCareer,
      styleId,
      themeId,
      togetherId,
      regionId,
    },
    thunkAPI,
  ) => {
    try {
      const response = await authApi.get('/meeting', {
        params: {
          page,
          size,
          orderBy,
          age,
          genderId,
          carModel,
          carCareer,
          styleId,
          themeId,
          togetherId,
          regionId,
        },
      });
      if (response.status === 200) {
        // console.log(response.data.number, '현재페이지');
        // console.log(response.data.last);
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
      console.log('미팅리스트more 불러오기 에러');
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
        params: {page: page, size: size, orderBy: 'LATEST'},
      }); //이후 추천순으로 sort 바꾸기
      if (response.status == 200) {
        // console.log(response.data);
        const meetListRecommended = response.data.content;
        return {meetListRecommended: meetListRecommended};
      } else {
        return thunkAPI.rejectWithValue({
          error: `Unexpected response status: ${response.status}`,
        });
      }
    } catch (error) {
      console.log('추천미팅리스트 불러오기 에러');
      console.log(error);
    }
  },
);

export const getMyMeetList = createAsyncThunk(
  'meet/getMyMeetList',
  async (_, thunkAPI) => {
    try {
      const response = await authApi.get(`meeting/upcoming`);
      if (response.status === 200) {
        console.log(response.data, '@@@');
        const myMeetList = response.data;
        return {myMeetList: myMeetList};
      }
    } catch (error) {
      if (error.response) {
        console.log('내 미팅리스트 불러오기 에러');
        console.log(error.response.status);
      } else {
        console.log('내 미팅리스트 불러오기 에러');
        console.log('서버 접속 오류');
      }
    }
  },
);

export const getMeetingApplyList = createAsyncThunk(
  'meet/getMeetingApplyList',
  async (_, thunkAPI) => {
    try {
      // Alert.alert('실제 기기에서 작동해');
      const response = await authApi.get(`/meeting/join`);
      if (response.status === 200) {
        console.log(response.data, '@@@');
        // Alert.alert('요청성공');
        const meetApplyList = response.data;
        return {meetApplyList: meetApplyList};
      }
    } catch (error) {
      if (error.response) {
        // Alert.alert('요청실패');
        console.log(error.response.status);
      } else {
        Alert.alert('서버 접속 오류');
        console.log('서버 접속 오류');
      }
    }
  },
);

export const getMeetMessageList = createAsyncThunk(
  'meet/getMeetMessageList',
  async ({meetingId, messageId}, thunkAPI) => {
    try {
      const response = await authApi.get(
        `/meeting/${meetingId}/board/${messageId}`,
      );
      if (response.status === 200) {
        console.log(response.data, '@@@');
        const meetMessageList = response.data;
        const isLastMessage = response.data.length < 50;
        if (response.data.length === 0) {
          return {
            meetMessageList: meetMessageList,
            lastMessageId: null,
            isLastMessage: true,
          };
        } else {
          const lastMessageId = response.data[response.data.length - 1].id;
          return {
            meetMessageList: meetMessageList,
            lastMessageId: lastMessageId,
            isLastMessage: isLastMessage,
          };
        }
      }
    } catch (error) {
      if (error.response) {
        console.log('미팅 메시지 리스트 불러오기 에러');
        console.log(error.response.status);
      } else {
        console.log('미팅 메시지 리스트 불러오기 에러');
        console.log(error);
      }
    }
  },
);

export const getMeetMessageListMore = createAsyncThunk(
  'meet/getMeetMessageListMore',
  async ({meetingId, messageId}, thunkAPI) => {
    try {
      const response = await authApi.get(
        `/meeting/${meetingId}/board/${messageId}`,
      );
      if (response.status === 200) {
        console.log('메시지 추가 불러오기');
        const meetMessageList = response.data;
        const lastMessageId = response.data[response.data.length - 1].id;
        const isLastMessage = response.data.length < 50;
        console.log(response.data.length < 50, 'isLastMessage');
        return {
          meetMessageList: meetMessageList,
          lastMessageId: lastMessageId,
          isLastMessage: isLastMessage,
        };
      }
    } catch (error) {
      if (error.response) {
        console.log('미팅 메시지 리스트 불러오기 에러');
        console.log(error.response.status);
      } else {
        console.log('미팅 메시지 리스트 불러오기 에러');
        console.log('서버 접속 오류');
      }
    }
  },
);

export const getFeedbackUserList = createAsyncThunk(
  'meet/getFeedbackUserList',
  async ({meetingId}, thunkAPI) => {
    try {
      const response = await authApi.get(`/feedback/${meetingId}`);
      if (response.status === 200) {
        console.log(response.data, '@@@');
        const feedbackUserList = response.data.feedbackMemberIds;
        return {feedbackUserList: feedbackUserList};
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

export const setTab = createAction('meet/setTab');

export const setFilterGender = createAction('meet/filterGender');

export const setFilterAge = createAction('meet/filterAge');

export const setFilterCarModel = createAction('meet/filterCarModel');

export const setFilterCarCareer = createAction('meet/filterCarCareer');

export const setFilterDriveStyle = createAction('meet/filterDriveStyle');

export const setFilterDriveTheme = createAction('meet/filterDriveTheme');

export const setFilterDriveWith = createAction('meet/filterDriveWith');

export const setFilterRegion = createAction('meet/filterRegion');

export const setSort = createAction('meet/setSort');

export const setMeetMessageList = createAction('meet/setMeetMessageList');

export const setMeetMessageListNull = createAction(
  'meet/setMeetMessageListNull',
);

export const setFeedbackUserListNull = createAction(
  'meet/setFeedbackUserListNull',
);
export const setLastMessageId = createAction('meet/setLastMessageId');

export const setParticipateStatus = createAction('meet/setParticipateStatus');
