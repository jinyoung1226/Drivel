import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import Tabs from '../../components/Tabs';

import {authApi} from '../../api/api';
import LockIcon from '../../assets/icons/LockIcon';
import OtherMeetList from './OtherMeetList';

const OtherMeet = ({userId}) => {
  const [isLocked, setIsLocked] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [createdMeetList, setCreatedMeetList] = useState([]);
  const [joinedMeetList, setJoinedMeetList] = useState([]);

  const getCreatedMeetList = async () => {
    try {
      const response = await authApi.get(`meeting/created/${userId}`);
      if (response.status == 200) {
        console.log(response.data);
        setCreatedMeetList(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        if (error.response.status == 403) {
          setIsLocked(true);
        }
      } else {
        console.log(error);
      }
    }
  };

  const getJoinedMeetList = async () => {
    try {
      const response = await authApi.get(`meeting/participating/${userId}`);
      if (response.status == 200) {
        console.log(response.data);
        setJoinedMeetList(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        if (error.response.status == 403) {
          setIsLocked(true);
        }
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCreatedMeetList();
    getJoinedMeetList();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
        <Text style={[textStyles.H3, {color: colors.Gray10}]}>
          모임 히스토리
        </Text>
        <View style={{flex: 1}} />
      </View>
      {isLocked ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{height: 16}} />
          <LockIcon />
          <View style={{height: 16}} />
          <Text style={[textStyles.H5, {color: colors.Gray08}]}>
            사용자가 모임 이력을 비공개했어요
          </Text>
        </View>
      ) : (
        <View>
          <Tabs
            tabName={['만든 모임', '참여한 모임']}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            scrollToTab={() => {}}
          />
          <View style={{height: 24}} />
          {activeTab == 0 && <OtherMeetList data={createdMeetList} />}
          {activeTab == 1 && <OtherMeetList data={joinedMeetList} />}
        </View>
      )}
    </View>
  );
};

export default OtherMeet;
