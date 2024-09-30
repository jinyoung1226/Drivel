import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import Tabs from '../../components/Tabs';
import ToggleSwitch from '../../components/TogleSwitch';
import MyMeetList from './MyMeetList';
import {authApi} from '../../api/api';
import eventEmitter from '../../utils/eventEmitter';

const MyMeet = ({locked}) => {
  console.log(locked);
  const [activeTab, setActiveTab] = useState(0);
  const [isOn, setIsOn] = useState(!locked);
  const [createdMeetList, setCreatedMeetList] = useState([]);
  const [joinedMeetList, setJoinedMeetList] = useState([]);

  const getCreatedMeetList = async () => {
    try {
      const response = await authApi.get('meeting/created');
      if (response.status == 200) {
        console.log(response.data);
        setCreatedMeetList(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const getJoinedMeetList = async () => {
    try {
      const response = await authApi.get('meeting/participating');
      if (response.status == 200) {
        console.log(response.data);
        setJoinedMeetList(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    eventEmitter.on("REFRESH_MEET", () => {getCreatedMeetList(); getJoinedMeetList();});
    getCreatedMeetList();
    getJoinedMeetList();
    return () => {
      eventEmitter.removeListener("REFRESH_MEET", () => {getCreatedMeetList(); getJoinedMeetList();});
    };
  }, []);

  const profileLock = async () => {
    try {
      const response = await authApi.post('profile/lock');
      if (response.status == 200) {
        console.log(response.status);
        setIsOn(!isOn);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
        <Text style={[textStyles.H3, {color: colors.Gray10}]}>
          모임 히스토리
        </Text>
        <View style={{flex: 1}} />
        <Text style={[textStyles.B5, {color: colors.Gray05}]}>
          다른 사용자에게 내 모임 정보를 공개해요
        </Text>
        <View style={{width: 8}} />
        <ToggleSwitch
          onPress={() => {
            profileLock();
          }}
          isOn={isOn}
          setIsOn={setIsOn}
        />
      </View>
      <Tabs
        tabName={['만든 모임', '참여한 모임']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        scrollToTab={() => {}}
      />
      <View style={{height: 24}} />

      {activeTab == 0 && <MyMeetList data={createdMeetList} />}
      {activeTab == 1 && <MyMeetList data={joinedMeetList} />}
    </View>
  );
};

export default MyMeet;
