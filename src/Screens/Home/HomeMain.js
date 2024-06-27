import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDriveInfo} from '../../features/drive/driveActions';
import DriveCourseCuration from './DriveCourseCuration';
import Festival from './Festival';
import Magazine from './Magazine';
import {api, authApi} from '../../api/api';

const {width} = Dimensions.get('window');

const HomeMain = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const category = ['바다와 함께', '자연친화', '노을맛집'];
  const [activeButton, setActiveButton] = useState(category[0]);
  const [filteredDriveCourse, setfilteredDriveCourse] = useState([
    {
      id: 1,
      tag: '바다와 함께',
      title1: '아름다운 해안을 따라 달리는',
      title2: '삼척 새천년 해안도로',
      imagePath:
        'https://wimg.mk.co.kr/meet/neds/2021/11/image_readbot_2021_1053506_16362360634839726.jpg',
    },
    {
      id: 2,
      tag: '바다와 함께',
      title1: '아름다운ㄴ 해안을 따라 달리는',
      title2: '삼척 새천년 해안도로',
      imagePath:
        'https://wimg.mk.co.kr/meet/neds/2021/11/image_readbot_2021_1053506_16362360634839726.jpg',
    },
    {
      id: 3,
      tag: '자연친화',
      title1: '아름다운 해안을 따라 달리는',
      title2: '삼척 새천년 해안도로',
      imagePath:
        'https://media.istockphoto.com/id/1473243967/ko/%EC%82%AC%EC%A7%84/%EC%A0%9C%EC%A3%BC%EB%8F%84-%EB%82%A8%EA%B2%BD-%EC%A0%9C%EC%A3%BC%EB%8F%84-%EC%84%B1%EC%82%B0-%EC%9D%BC%EC%B6%9C%EB%B4%89%EC%9D%98-%EC%9D%BC%EC%B6%9C-%EC%9E%90%EC%97%B0%EA%B2%BD%EA%B4%80.webp?b=1&s=170667a&w=0&k=20&c=0M21WaltW-x_8nK5yB9MgCPfy_hJGpCEWflUix6YihI=',
    },
    {
      id: 4,
      tag: '노을맛집',
      title1: '아름다운 해안을 따라 달리는',
      title2: '삼척 새천년 해안도로',
      imagePath:
        'https://media.istockphoto.com/id/1439634913/ko/%EC%82%AC%EC%A7%84/%EC%84%B1%EC%82%B0%EC%9D%BC%EC%B6%9C%EB%B4%89%EA%B3%BC-%EA%B4%91%EC%B9%98%EA%B8%B0-%ED%95%B4%EC%88%98%EC%9A%95%EC%9E%A5-%EC%A0%9C%EC%A3%BC%EB%8F%84.webp?b=1&s=170667a&w=0&k=20&c=8MGJ3VOhsE-KWmNc8TeOqRqWD01c2ND8EXYzEYryr5o=',
    },
  ]);

  const filteredDriveCourses = filteredDriveCourse.filter(
    course => course.tag === activeButton,
  );

  const handleDriveCourse = id => {
    dispatch(fetchDriveInfo({id}));
    navigation.navigate('DriveDetail');
  };

  const handleButtonPress = button => {
    setActiveButton(button);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Pressable>
          <Image
            source={require('../../assets/image/homeTopImg.jpg')}
            style={[styles.topImage]}
          />
          <Text style={styles.textOverlay}>
            숨겨진 제주도 맛집이 {'\n'}어딘지 궁금하다면?
          </Text>
        </Pressable>
        <DriveCourseCuration
          activeButton={activeButton}
          category={category}
          handleButtonPress={handleButtonPress}
          handleDriveCourse={handleDriveCourse}
          filteredDriveCourses={filteredDriveCourses}
        />
        <View style={styles.bar}></View>
        <Magazine />
        <View style={styles.bar}></View>
        <Festival />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  Pressable: {
    flex: 1,
  },

  topImage: {
    width: width,
    height: 516,
    resizeMode: 'cover',
    borderBottomRightRadius: 40,
  },
  textOverlay: {
    position: 'absolute',
    fontFamily: 'SUIT-Bold',
    fontSize: 24,
    color: '#ffffff',
    bottom: 37,
    left: 24,
  },

  bar: {
    width: width,
    height: 10,
    marginTop: 24,
    backgroundColor: '#F6F6F7',
  },
});
export default HomeMain;
