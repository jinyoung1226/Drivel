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
import { setLikedItem } from '../../features/like/likeActions';
const MyScrap = ({navigation}) => {
  
  const dispatch = useDispatch();
  const [likedCourse, setLikedCourse] = useState([]);
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
        setLikedCourse(response.data.courses);
        dispatch(setLikedItem(response.data.courses.map(course => course.id)))
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getLikedDriveCourse();
  }, []);

  return (
    <View style={{backgroundColor: colors.BG, flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
        <Text style={[textStyles.B2, {color: colors.Gray10}]}>
          총 {likedCourse.length}개
        </Text>
      </View>
      <LikedList data={likedCourse}/>
    </View>
  );
};

export default MyScrap;
