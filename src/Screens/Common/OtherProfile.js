import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
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
import ConfirmModal from '../../components/ConfirmModal';
import { authApi } from '../../api/api';
const OtherProfile = ({navigation, route}) => {
  const memberId =  route.params.memberId;
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);
  const [type, setType] = useState('');
  const [targetId, setTargetId] = useState('');
  const myProfileInfo = useSelector(state => state.profile.myProfileInfo);
  const { userId } = useSelector(state => state.auth);
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
        userId !== memberId && 
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
    const getProfileInfo = async () => {
      try {
        const response = await authApi.get(`profile/${memberId}`);
        if (response.status === 200) {
          setProfileInfo(response.data);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
        } else {
          console.log(error);
        }
      }
    }
    getProfileInfo();
  }, []);

  if (profileInfo === null) {
    return (
      <RenderingPage/>
    )
  }
  
  return (
    <ScrollView style={{backgroundColor: colors.BG}}>
      {/* <Text style={{color:'#000'}}>{memberId}</Text> */}
      <ConfirmModal
        modalVisible={confirmModalVisible}
        setModalVisible={setConfirmModalVisible}
        type={'userBlock'}
        targetId={memberId}
      />
      <MenuModal 
        setModalVisible={setModalVisible} 
        modalVisible={modalVisible} 
        confirmModalVisible={confirmModalVisible}
        setConfirmModalVisible={setConfirmModalVisible}
        setType={setType}
        setTargetId={setTargetId}
        masterId={memberId}
        status
      />
      <View style={{height: 32}} />
      <OtherInfo myProfileInfo={profileInfo}/>
      <View style={{height: 24}} />
      <OtherDriveTag myProfileInfo={profileInfo}/>
      <View style={{height: 24}} />
      <UserMannerScoreBar />
      <GrayLine/>
      <OtherMeet userId={memberId}/>
    </ScrollView>
  );
};

export default OtherProfile;