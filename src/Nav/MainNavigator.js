import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from '../BottomTab/HomeTab';
import MeetTab from '../BottomTab/MeetTab';
import MypageTab from '../BottomTab/MypageTab';
import DriveTab from '../BottomTab/DriveTab';
const Tab = createBottomTabNavigator();
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeTab} options={{headerShown: false}}/>
      <Tab.Screen name="MeetTab" component={MeetTab} options={{headerShown: false}}/>
      <Tab.Screen name="DriveTab" component={DriveTab} options={{headerShown: false}}/>
      <Tab.Screen name="MypageTab" component={MypageTab} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
};

export default MainNavigator;