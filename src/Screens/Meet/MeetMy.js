import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import MeetList from './MeetList';
import {setTab} from '../../features/meet/meetActions';
import {getMeetListRecommended} from '../../features/meet/meetActions';
import {authApi} from '../../api/api';
import CustomButton from '../../components/CustomButton';
import { getMyMeetList } from '../../features/meet/meetActions';
const MeetMy = ({goMeetDetail}) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState(null);  
  const [showMore, setShowMore] = useState(false);
  const {meetListRecommended, inititalPage, myMeetList} = useSelector(state => state.meet);

  useEffect(() => {
    dispatch(getMeetListRecommended({page: inititalPage, size: 3}));
    dispatch(getMyMeetList())
    // setData(myMeetList.filter(meeting => isThisWeek(meeting.meetingDate)))
    console.log(meetListRecommended);
  }, []);

  useEffect(() => {
    if (myMeetList) {
      setData(myMeetList.filter(meeting => isThisWeek(meeting.meetingDate)));
    }
  }, [myMeetList]);
  
  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(getMeetListRecommended({page: inititalPage, size: 3}));
    setIsRefreshing(false);
  };
  // const getUpcomingMeet = async() => {
  //   try {
  //     const response = await authApi.get(`meeting/upcoming`);
  //     if (response.status === 200) {
  //       console.log(response.data, '@@@');
  //       setMyMeetList(response.data);
  //       setData(response.data.filter(meeting => isThisWeek(meeting.meetingDate)))
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.log(error.response.status);
  //     } else {
  //       console.log('서버 접속 오류');
  //     }
  //   }
  // };

  useEffect(() => {
    
  }, []);

  const nickname = useSelector(state => state.auth.nickname);
  
  const today = new Date();

  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 6),
  );

  const isThisWeek = date => {
    const d = new Date(date);
    return d >= startOfWeek && d <= endOfWeek;
  };
  

  const formatDate = dateString => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 두 자리로 맞춤
    const day = date.getDate().toString().padStart(2, '0'); // 두 자리로 맞춤
    return `${month}월 ${day}일`;
  };

  const renderMeetingItem = ({item}) => (
    <TouchableOpacity 
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={() => goMeetDetail(item)}>
      <Text style={[textStyles.B3, {color: '#B0B0B0', height: 17}]}>
        {formatDate(item.meetingDate)}
      </Text>
      <View style={{width: 32}} />
      <Text style={[textStyles.B2, {color: colors.Blue}]}>{item.title}</Text>
      <View style={{flex: 1}} />
      <Text style={[textStyles.B2, {color: '#C4C4C4'}]}>{'>'}</Text>
    </TouchableOpacity>
  );

  const handleShowMore = () => {
    if (!showMore) {
      setData(myMeetList);
    } else {
      setData(myMeetList.filter(meeting => isThisWeek(meeting.meetingDate)));
    }
    setShowMore(!showMore);
  };

  if (!meetListRecommended || !myMeetList) {
    // 데이터가 로드되지 않은 경우 로딩 스피너 또는 대체 콘텐츠 표시
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <MeetList
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        goMeetDetail={goMeetDetail}
        data={meetListRecommended}
        ListHeaderComponent={
          <View style={{backgroundColor: colors.BG}}>
            <View style={{height: 16}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                paddingHorizontal: 16,
              }}>
              <Text
                style={[textStyles.H1, {color: colors.Gray10}]}>
                {nickname}님, 이번주에{'\n'}모임이
                <Text style={{color: colors.Blue}}>
                  {` ${
                    myMeetList.filter(meeting => isThisWeek(meeting.meetingDate))
                      .length
                  }건 `}
                </Text>
                있어요
              </Text>
              <View style={{flex: 1}} />
              <View
                style={{
                  width: 85,
                  height: 85,
                  backgroundColor: colors.Gray04,
                  borderRadius: 100,
                  marginHorizontal: 20,
                }}
              />
            </View>
            <View style={{height: 24}} />
            {myMeetList.length > 0 ? (
              <View
                style={{
                  padding: 16,
                  marginHorizontal: 16,
                  elevation: 10,
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: colors.Gray01,
                  borderRadius: 10,
                }}>
                <FlatList
                  data={data}
                  renderItem={renderMeetingItem}
                  keyExtractor={item => item.meetingId}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colors.Gray02,
                        marginVertical: 8,
                      }}
                    />
                  )}
                  ListFooterComponent={
                    showMore ? (
                      <TouchableOpacity
                        style={{
                          marginTop: 24,
                          paddingVertical: 4,
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}
                        onPress={handleShowMore}>
                        <Text style={[textStyles.B3, {color: '#B0B0B0'}]}>
                          {'접기'}
                        </Text>
                        <View style={{width: 8}} />
                        <Text
                          style={[
                            textStyles.B2,
                            {color: '#C4C4C4', transform: [{rotate: '-90deg'}]},
                          ]}>
                          {'>'}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          marginTop: 24,
                          paddingVertical: 4,
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}
                        onPress={handleShowMore}>
                        <Text style={[textStyles.B3, {color: '#B0B0B0'}]}>
                          {myMeetList.filter(
                            meeting => isThisWeek(meeting.meetingDate)).length == 0 ? 
                            '이번주 외 모임보기' : '더보기'
                          }
                        </Text>
                        <View style={{width: 8}} />
                        <Text
                          style={[
                            textStyles.B2,
                            {color: '#C4C4C4', transform: [{rotate: '90deg'}]},
                          ]}>
                          {'>'}
                        </Text>
                      </TouchableOpacity>
                    )
                  }
                />
              </View>
            ) : (
              <View style={{paddingHorizontal:16}}>
                <CustomButton 
                  title={'나한테 딱 맞는 모임 구경하러 가기'}
                  onPress={() => {
                    dispatch(setTab(1));
                  }}/>
              </View>
            )}
            <View style={{height: 24}} />
            <View style={{height: 10, backgroundColor: colors.Gray02}} />
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
                <Text style={[textStyles.B2, {color: colors.Gray04}]}>
                  {'더보기  >'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{height: 8}} />
          </View>
        }
      />
    </View>
  );
};
export default MeetMy;
