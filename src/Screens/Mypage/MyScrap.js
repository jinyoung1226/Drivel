import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../features/auth/authActions';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import Tabs from '../../components/Tabs';
import {authApi} from '../../api/api';
import LikedList from './LikedList';
import BackIcon from '../../assets/icons/BackIcon';
const MyScrap = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [likedDriveCourse, setLikedDriveCourse] = useState([]);
  const nickname = useSelector(state => state.auth.nickname);
  const dispatch = useDispatch();
  const tabName = ['드라이브 코스', '관광명소'];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '내 스크랩',
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
    });
  }, [navigation]);

  const getLikedDriveCourse = async () => {
    try {
      const response = await authApi.get('course/liked');
      if (response.status == 200) {
        console.log(response.data, 'liked');
        setLikedDriveCourse(response.data.courses);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };
  useEffect(() => {
    getLikedDriveCourse();
  }, []);

  const goDriveDetail = id => {
    navigation.navigate('DriveDetail', {id: id});
  };
  return (
    <View style={{backgroundColor: colors.BG, flex: 1}}>
      <Tabs
        tabName={tabName}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
        <Text style={[textStyles.B2, {color: colors.Gray10}]}>
          총 {likedDriveCourse.length}개
        </Text>
      </View>
      <LikedList data={likedDriveCourse} goDriveDetail={goDriveDetail} />
    </View>
  );
};

export default MyScrap;
