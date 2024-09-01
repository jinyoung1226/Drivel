import React, {useLayoutEffect} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeMain from '../Screens/Home/HomeMain';
import {View, Text} from 'react-native';
import Alarm from '../assets/homeIcon/alarm.svg';
import DriveDetail from '../Screens/DriveCourse/DriveDetail';
import FestivalInfo from '../components/FestivalInfo';
import {useDispatch} from 'react-redux';
import {showTabBar, hideTabBar} from '../features/tabBar/tabBarSlice';
import DriveStart from '../Screens/DriveCourse/DriveStart';
import RestaurantInfo from '../Screens/DriveCourse/RestaurantInfo';
import ReportPage from '../Screens/Common/ReportPage';
import MagazineInfo from '../Screens/Home/MagazineInfo';

const Stack = createStackNavigator();

const HomeTab = ({route}) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Home' || routeName === undefined) {
      dispatch(showTabBar());
    } else {
      dispatch(hideTabBar());
    }
  }, [route]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeMain} />
      <Stack.Screen name="DriveDetail" component={DriveDetail} />
      <Stack.Screen name="ReportPage" component={ReportPage} />
      <Stack.Screen name="FestivalInfo" component={FestivalInfo} />
      <Stack.Screen name="MagazineInfo" component={MagazineInfo} />
      <Stack.Screen name="RestaurantInfo" component={RestaurantInfo} />
      <Stack.Screen name="DriveStart" component={DriveStart} />
    </Stack.Navigator>
  );
};

export default HomeTab;
