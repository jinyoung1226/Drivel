import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../styles/colors';
import {ScrollView} from 'react-native-gesture-handler';
import RenderingPage from '../../components/RenderingPage';
import { getMyProfileInfo } from '../../features/profile/profileActions';
import OtherInfo from './OtherInfo';
import OtherDriveTag from './OtherDriveTag';
import UserMannerScoreBar from '../Mypage/UserMannerScoreBar';
import GrayLine from '../../components/GrayLine';
import OtherMeet from './OtherMeet';
import { textStyles } from '../../styles/textStyles';
import BackIcon from '../../assets/icons/BackIcon';
import KebabMenuIcon from '../../assets/icons/KebabMenuIcon';
import MenuModal from '../../components/MenuModal';
const OtherProfile = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const myProfileInfo = useSelector(state => state.profile.myProfileInfo);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로필',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity 
          style={{padding:16}}
          onPress={() => {setModalVisible(!modalVisible)}}
        >
          <KebabMenuIcon color={colors.Gray10} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

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
      <MenuModal setModalVisible={setModalVisible} modalVisible={modalVisible}/>
      <View style={{height: 32}} />
      <OtherInfo myProfileInfo={myProfileInfo}/>
      <View style={{height: 24}} />
      <OtherDriveTag myProfileInfo={myProfileInfo}/>
      <View style={{height: 24}} />
      <UserMannerScoreBar />
      <GrayLine/>
      <OtherMeet/>
    </ScrollView>
  );
};

export default OtherProfile;