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
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDriveInfo} from '../../features/drive/driveActions';
import DriveCourseCuration from './DriveCourseCuration';
import Festival from './Festival';
import Magazine from './Magazine';
import {api, authApi} from '../../api/api';
import GrayLine from '../../components/GrayLine';

const {width} = Dimensions.get('window');

const HomeMain = ({navigation}) => {
  const [driveCourseList, setDriveCourseList] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeButton, setActiveButton] = useState('');
  const [festivalList, setFestivalList] = useState([]);

  useEffect(() => {
    const getDriveCurationInfo = async () => {
      try {
        const response = await authApi.get('course/my-theme');
        if (response.status === 200) {
          const driveData = response.data.map(data => ({
            themeId: data.theme.id,
            themeName: data.theme.displayName,
            courses: data.courses.map(course => ({
              id: course.id,
              liked: course.liked,
              title: course.title,
              description: course.description,
              imagePath: course.imagePath,
            })),
          }));
          setDriveCourseList(driveData);

          const categoryData = driveData.map(data => data.themeName);
          setCategory(categoryData);
          if (categoryData.length > 0) {
            setActiveButton(categoryData[0]);
          }

          console.log(JSON.stringify(driveData, null, 2), 'api 응답 데이터');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            Alert.alert('코스를 불러올 수 없습니다.');
          }
        } else {
          console.log(error);
          Alert.alert('서버와의 통신 실패');
        }
      }
    };
    getDriveCurationInfo();
  }, []);

  const driveCourseLists = driveCourseList
    .filter(course => course.themeName === activeButton)
    .flatMap(item => item.courses);

  const handleDriveCourse = id => {
    navigation.navigate('DriveDetail', {id: id});
  };

  const handleButtonPress = button => {
    setActiveButton(button);
  };

  if (driveCourseList.length === 0) {
    // 데이터가 로드되지 않은 경우 로딩 스피너 또는 대체 콘텐츠 표시
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
          driveCourseLists={driveCourseLists}
        />
        <GrayLine />
        <Magazine />
        <GrayLine />
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
});
export default HomeMain;
