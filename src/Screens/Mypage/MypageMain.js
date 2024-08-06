import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../styles/colors';
import {ScrollView} from 'react-native-gesture-handler';
import RenderingPage from '../../components/RenderingPage';
import { getMyProfileInfo } from '../../features/profile/profileActions';
import MyInfo from './MyInfo';
import ProfileImageModal from './ProfileImageModal';
import MyDriveTag from './MyDriveTag';
import UserCollectionBar from './UserCollectionBar';
import UserMannerScoreBar from './UserMannerScoreBar';
import GrayLine from '../../components/GrayLine';
import MyMeet from './MyMeet';

const MyPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const myProfileInfo = useSelector(state => state.profile.myProfileInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfileInfo());
  }, []);

  if (myProfileInfo === null) {
    return (
      <RenderingPage/>
    )
  }
  
  return (
    <ScrollView style={{backgroundColor: colors.BG}}>
      <ProfileImageModal setModalVisible={setModalVisible} modalVisible={modalVisible}/>
      <View style={{height: 32}} />
      <MyInfo myProfileInfo={myProfileInfo} setModalVisible={setModalVisible} modalVisible={modalVisible}/>
      <View style={{height: 24}} />
      <MyDriveTag myProfileInfo={myProfileInfo}/>
      <View style={{height: 24}} />
      <UserCollectionBar />
      <View style={{height: 24}} />
      <UserMannerScoreBar />
      <GrayLine/>
      <MyMeet/>
    </ScrollView>
  );
};

export default MyPage;
