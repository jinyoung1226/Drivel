import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MeetMainTopTab from './MeetMainTopTab';
import CreateIcon from '../../assets/icons/CreateIcon.svg';
import MeetBrowse from './MeetBrowse';
import MeetMy from './MeetMy';
import colors from '../../styles/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setTab} from '../../features/meet/meetActions';

const MeetMain = ({navigation}) => {
  const {currentTab} = useSelector(state => state.meet);
  const dispatch = useDispatch();
  const goMeetDetail = item => {
    navigation.navigate('MeetDetail', {
      meetingId: item.meetingId,
      courseId: item.courseId,
    });
  };

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
            dispatch(setTab(index));
          }}
          selectedIndex={currentTab}
        />
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MeetCreate');
          }}>
          <CreateIcon />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <View style={{display: currentTab === 0 ? 'flex' : 'none', flex: 1}}>
          <MeetMy goMeetDetail={goMeetDetail} />
        </View>
        <View style={{display: currentTab === 1 ? 'flex' : 'none', flex: 1}}>
          <MeetBrowse
            goFilter={() => {
              navigation.navigate('MeetFilter');
            }}
            goMeetDetail={goMeetDetail}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MeetMain;
