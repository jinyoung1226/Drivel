import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import MeetList from './MeetList';
import {getMeetListRecommended, getMyMeetList, getMeetingApplyList, setTab} from '../../features/meet/meetActions';
import {authApi} from '../../api/api';
import RenderingPage from '../../components/RenderingPage';
import MeetApplyPreview from './MeetApplyPreview';
import isThisWeek from '../../utils/isThisWeek';
import MeetUpcomingList from './MeetUpcomingList';

const MeetMy = () => {

  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const nickname = useSelector(state => state.auth.nickname);
  const {meetListRecommended, inititalPage, myMeetList, meetApplyList} = useSelector(
    state => state.meet,
  );
  
  useEffect(() => {
    dispatch(getMeetListRecommended({page: inititalPage, size: 3}));
    dispatch(getMyMeetList());
    dispatch(getMeetingApplyList());

  }, []);

  useEffect(() => {
    if (myMeetList) {
      setData(myMeetList.filter(meeting => isThisWeek(meeting.meetingDate)));
    }
  }, [myMeetList]);

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(getMeetListRecommended({page: inititalPage, size: 3}));
    dispatch(getMyMeetList());
    dispatch(getMeetingApplyList());
    setIsRefreshing(false);
  };

  const handleShowMore = () => {
    if (!showMore) {
      setData(myMeetList);
    } else {
      setData(myMeetList.filter(meeting => isThisWeek(meeting.meetingDate)));
    }
    setShowMore(!showMore);
  };

  if (!meetListRecommended || !meetApplyList || !myMeetList) {
    // 데이터가 로드되지 않은 경우 로딩 스피너 또는 대체 콘텐츠 표시
    return (
      <RenderingPage/>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <MeetList
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        data={meetListRecommended}
        ListHeaderComponent={
          <View style={{backgroundColor: colors.BG}}>
            <View style={{height: 24}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                paddingHorizontal: 16,
              }}>
              <Text style={[textStyles.H1, {color: colors.Gray10}]}>
                {nickname}님, 이번주에{'\n'}모임이
                <Text style={{color: colors.Blue}}>
                  {` ${
                    myMeetList.filter(meeting =>
                      isThisWeek(meeting.meetingDate),
                    ).length
                  }건 `}
                </Text>
                있어요
              </Text>
              <View style={{flex: 1}} />
            </View>
            <View style={{height: 24}} />
            <MeetUpcomingList data={data} myMeetList={myMeetList} handleShowMore={handleShowMore} showMore={showMore} setShowMore={setShowMore}/>
            <View style={{height: 24}} />
            <View style={{height: 10, backgroundColor: colors.Gray02}} />
            {!meetApplyList || meetApplyList.length == 0 ? 
            null 
            :
            <View>
              <View style={{height: 24}} />
              <MeetApplyPreview/>
              <View style={{height: 24}} />
              <View style={{height: 10, backgroundColor: colors.Gray02}} />  
            </View>}
            <View style={{height: 24}} />
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 16,
                alignItems: 'center',
              }}>
              <Text style={[textStyles.H2, {color: colors.Gray10}]}>
                👀 이런 모임은 어때요?
              </Text>
              <View style={{flex: 1}} />
              <TouchableOpacity
                onPress={() => {
                  dispatch(setTab(1));
                }}>
                <Text
                  style={[
                    textStyles.B3,
                    {fontFamily: 'SUIT-Bold', color: colors.Gray04},
                  ]}>
                  {'더보기  >'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{height: 16}} />
          </View>
        }
      />
    </View>
  );
};

export default MeetMy;
