import { getMeetList, getMeetListRecommended, getMyMeetList } from '../features/meet/meetActions';

const refreshMeetList = (dispatch) => {
  dispatch(getMyMeetList());
  dispatch(getMeetListRecommended({page: 0, size: 3}));
  dispatch(
    getMeetList({
      page: 0,
      size: 10,
      orderBy: "LATEST",
      themeId: null,
      togetherId: null,
      styleId: null,
      genderId: null,
      age: null,
      carModel: null,
      carCareer: null,
    }),
  );
}

export default refreshMeetList;