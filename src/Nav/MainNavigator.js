import React from 'react';
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
const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarItemStyle: {},
        tabBarLabelStyle: {
          height: Platform.OS === 'ios' ? 37 : 25,
          fontSize: 12,
          fontFamily: 'SUIT-SemiBold',
        },
        tabBarStyle: {height: Platform.OS === 'ios' ? 93 : 70},
        tabBarActiveTintColor: '#5168F6',
        tabBarInactiveTintColor: '#ACACAD',
      })}>
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
