import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TabScreen from '../../components/TabScreen';
import MeetMainTopTab from '../../components/MeetMainTopTab';
import MeetListItem from './MeetListItem';
import {textStyles} from '../../styles/textStyles';
import CreateIcon from '../../assets/icons/CreateIcon.svg';
import SearchICon from '../../assets/icons/SearchIcon.svg';
import MeetList from './MeetList';
import MeetMy from './MeetMy';
import colors from '../../styles/colors';
const MeetMain = ({navigation}) => {
  const [tab, setTab] = useState(0);
  const [filteredMeetingData, setFilteredMeetingData] = useState([
    {
      id: 1,
      title: '서울경기권 드라이브하실 분?',
      course: {
        start: '조각공원',
        midPoint1: '해안도로',
        end: '삼척해변',
      },
      location: '제주도',
      participants: 3,
      capacity: 9,
      age: [20, 30],
      meetingImageAddress:
        'https://drivel-review-image.s3.ap-northeast-2.amazonaws.com/d442721c-1d58-4787-85f5-8f3491081dcf',
    },
  ]);

  const goMeetDetail = item => {
    navigation.navigate('MeetDetail', {item});
  };

  const content = useMemo(() => {
    switch (tab) {
      case 0:
        return <MeetMy />;
      case 1:
        return (
          <MeetList
            goFilter={() => {
              navigation.navigate('MeetFilter');
            }}
            MeetListData={filteredMeetingData}
            goMeetDetail={goMeetDetail}
          />
        );
      default:
        return null;
    }
  }, [tab]);

  return (
    <SafeAreaView style={{backgroundColor: colors.BG, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 16,
          paddingRight: 16,
        }}>
        <MeetMainTopTab
          menus={['내 모임', '둘러보기']}
          onSelectHandler={index => {
            setTab(index);
          }}
          selectedIndex={tab}
        />
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MeetCreate');
          }}>
          <CreateIcon />
        </TouchableOpacity>
        <View style={{width: 16}} />
        <TouchableOpacity onPress={() => {}}>
          <SearchICon />
        </TouchableOpacity>
      </View>
      {content}
    </SafeAreaView>
  );
};
export default MeetMain;
