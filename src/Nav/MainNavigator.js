import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTab from '../BottomTab/HomeTab';
import MeetTab from '../BottomTab/MeetTab';
import MypageTab from '../BottomTab/MypageTab';
import DriveTab from '../BottomTab/DriveTab';
import HomeIcon from '../assets/tabBarIcon/HomeIcon.svg';
import MeetIcon from '../assets/tabBarIcon/MeetIcon.svg';
import DriveCourseIcon from '../assets/tabBarIcon/DriveCourseIcon.svg';
import MypageIcon from '../assets/tabBarIcon/MypageIcon.svg';
import CustomTabBar from '../components/CustomTabBar';
import { useDispatch } from 'react-redux';
import { authApi } from '../api/api';
import { setLikedItem } from '../features/like/likeActions';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {

  const dispatch = useDispatch();

  const getLikedDriveCourse = async () => {
    try {
      const response = await authApi.get('course/liked');
      if (response.status == 200) {
        console.log(response.data, 'liked');
        dispatch(setLikedItem(response.data.courses.map(course => course.id)))
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status, '좋아요한 드라이브코스 불러오기 실패');
        
      } else {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getLikedDriveCourse();
  }, []);

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      >
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerShown: false,
          title: '홈',
          tabBarIcon: ({focused}) => (
            <HomeIcon color={focused ? '#5168F6' : '#ACACAD'} />
          ),
        }}
      />
      <Tab.Screen
        name="MeetTab"
        component={MeetTab}
        options={{
          headerShown: false,
          title: '모임',
          tabBarIcon: ({focused}) => (
            <MeetIcon color={focused ? '#5168F6' : '#ACACAD'} />
          ),
        }}
      />
      <Tab.Screen
        name="DriveTab"
        component={DriveTab}
        options={{
          headerShown: false,
          title: '드라이브코스',
          tabBarIcon: ({focused}) => (
            <DriveCourseIcon color={focused ? '#5168F6' : '#ACACAD'} />
          ),
        }}
      />
      <Tab.Screen
        name="MypageTab"
        component={MypageTab}
        options={{
          headerShown: false,
          title: '마이',
          tabBarIcon: ({focused}) => (
            <MypageIcon color={focused ? '#5168F6' : '#ACACAD'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
