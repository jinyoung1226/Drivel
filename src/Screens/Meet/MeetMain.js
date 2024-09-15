import React from 'react';
import {View, TouchableOpacity, Platform, Alert} from 'react-native';

import MeetMainTopTab from './MeetMainTopTab';
import CreateIcon from '../../assets/icons/CreateIcon.svg';
import MeetBrowse from './MeetBrowse';
import MeetMy from './MeetMy';
import colors from '../../styles/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setTab} from '../../features/meet/meetActions';
import { authApi } from '../../api/api';
import CheckProfileModal from '../../components/CheckProfileModal';

const MeetMain = ({navigation}) => {
  const {currentTab} = useSelector(state => state.meet);
  const dispatch = useDispatch();
  const [checkProfileModalVisible, setCheckProfileModalVisible] = React.useState(false);
  const checkCreateMeet = async() => {
    try {
      const response = await authApi.get('/onboarding')
      if (response.status === 200) {
        if (response.data.enableToCreateMeeting)
        navigation.navigate('MeetCreate');
        else
        setCheckProfileModalVisible(true);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  }
  return (
    <View style={{backgroundColor: colors.BG, flex: 1}}>
      <CheckProfileModal
        modalVisible={checkProfileModalVisible}
        setModalVisible={setCheckProfileModalVisible}
      />
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
              checkCreateMeet();
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
