import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setTab} from '../../features/meet/meetActions';
import CustomButton from '../../components/CustomButton';
import isThisWeek from '../../utils/isThisWeek';
import { useNavigation } from '@react-navigation/native';

const MeetUpcomingList = ({data, myMeetList, handleShowMore, showMore, setShowMore}) => {
  const navigation = useNavigation();
  // const [data, setData] = useState(null);
  // const [showMore, setShowMore] = useState(false);
  // const {myMeetList} = useSelector(state => state.meet);

  // useEffect(() => {
  //   if (myMeetList) {
  //     setData(myMeetList.filter(meeting => isThisWeek(meeting.meetingDate)));
  //   }
  // }, [myMeetList]);

  // const handleShowMore = () => {
  //   if (!showMore) {
  //     setData(myMeetList);
  //   } else {
  //     setData(myMeetList.filter(meeting => isThisWeek(meeting.meetingDate)));
  //   }
  //   setShowMore(!showMore);
  // };

  const dispatch = useDispatch();
  const formatDate = dateString => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 두 자리로 맞춤
    const day = date.getDate().toString().padStart(2, '0'); // 두 자리로 맞춤
    return `${month}월 ${day}일`;
  };


  const goMeetDetail = item => {
    navigation.navigate('MeetDetail', {
      meetingId: item.meetingId,
      courseId: item.courseId,
      meetingTitle: item.meetingTitle,
    });
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
      <Text
        style={[textStyles.B2, {fontFamily: 'SUIT-Bold', color: '#C4C4C4'}]}>
        {'>'}
      </Text>
    </TouchableOpacity>
  );

  // if (!myMeetList) {
  //   // 데이터가 로드되지 않은 경우 로딩 스피너 또는 대체 콘텐츠 표시
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <View>
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
            scrollEnabled={false}
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
              myMeetList.length == myMeetList.filter(meeting =>isThisWeek(meeting.meetingDate)).length ? 
              (
                null
              ) : (
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
                      {
                        fontFamily: 'SUIT-Bold',
                        color: '#C4C4C4',
                        transform: [{rotate: '-90deg'}],
                      },
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
                    {myMeetList.filter(meeting =>
                      isThisWeek(meeting.meetingDate),
                    ).length == 0
                      ? '이번주 외 모임보기'
                      : '더보기'}
                  </Text>
                  <View style={{width: 8}} />
                  <Text
                    style={[
                      textStyles.B2,
                      {
                        fontFamily: 'SUIT-Bold',
                        color: '#C4C4C4',
                        transform: [{rotate: '90deg'}],
                      },
                    ]}>
                    {'>'}
                  </Text>
                </TouchableOpacity>
                )
              )
            }
          />
        </View>
      ) : (
        <View style={{paddingHorizontal: 16}}>
          <CustomButton
            title={'나한테 딱 맞는 모임 구경하러 가기'}
            onPress={() => {
              dispatch(setTab(1));
            }}
          />
        </View>
      )}
    </View>
  );
}

export default MeetUpcomingList;