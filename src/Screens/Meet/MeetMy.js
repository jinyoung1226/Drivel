import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import MeetList from './MeetList';
import {setTab} from '../../features/meet/meetActions';
import {getMeetListRecommended} from '../../features/meet/meetActions';
const MeetMy = ({goMeetDetail}) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {meetListRecommended, inititalPage} = useSelector(state => state.meet);

  useEffect(() => {
    dispatch(getMeetListRecommended({page: inititalPage, size: 3}));
    console.log(meetListRecommended);
  }, [dispatch]);

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(getMeetListRecommended({page: inititalPage, size: 3}));
    setIsRefreshing(false);
  };

  const nickname = useSelector(state => state.auth.nickname);
  const myMeetList = [
    {
      id: 1,
      date: '2024-06-28',
      title: '네바퀴 모임',
    },
    {
      id: 2,
      date: '2024-06-29',
      title: '같이 수원 갈사람',
    },
    {
      id: 3,
      date: '2024-07-06',
      title: '같이 수원 갈사람',
    },
  ];

  const today = new Date();

  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 6),
  );

  const isThisWeek = date => {
    const d = new Date(date);
    return d >= startOfWeek && d <= endOfWeek;
  };
  const [data, setData] = useState(
    myMeetList.filter(meeting => isThisWeek(meeting.date)),
  );
  const [showMore, setShowMore] = useState(false);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 두 자리로 맞춤
    const day = date.getDate().toString().padStart(2, '0'); // 두 자리로 맞춤
    return `${month}월 ${day}일`;
  };

  const renderMeetingItem = ({item}) => (
    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={[textStyles.B3, {color: '#B0B0B0', height: 17}]}>
        {formatDate(item.date)}
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
      setData(myMeetList.filter(meeting => isThisWeek(meeting.date)));
    }
    setShowMore(!showMore);
  };

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
                style={[textStyles.H1, {color: colors.Gray10, lineHeight: 34}]}>
                {nickname}님, 이번주에{'\n'}모임이
                <Text style={{color: colors.Blue}}>
                  {` ${
                    myMeetList.filter(meeting => isThisWeek(meeting.date))
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
                keyExtractor={item => item.id.toString()}
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
                        {'더보기'}
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
