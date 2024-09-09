import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
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
      meetingTitle: item.meetingTitle,
    });
  };

  return (
    <View style={{backgroundColor: colors.BG, flex: 1}}>
      {Platform.OS === 'ios' && <View style={{height: 44}} />}
      <View style={{borderBottomWidth: 1, borderBottomColor: colors.Gray02}}>
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
      </View>
      <View style={{flex: 1}}>
        <View style={{display: currentTab === 0 ? 'flex' : 'none', flex: 1}}>
          <MeetMy />
        </View>
        <View style={{display: currentTab === 1 ? 'flex' : 'none', flex: 1}}>
          <MeetBrowse />
        </View>
      </View>
    </View>
  );
};

export default MeetMain;
