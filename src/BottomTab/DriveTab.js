import React, {useLayoutEffect} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import DriveMain from '../Screens/DriveCourse/DriveMain';
import DriveDetail from '../Screens/DriveCourse/DriveDetail';
import DriveFilter from '../Screens/DriveCourse/DriveFilter';
import FestivalInfo from '../components/FestivalInfo';
import {useDispatch} from 'react-redux';
import {showTabBar, hideTabBar} from '../features/tabBar/tabBarSlice';
import RestaurantInfo from '../Screens/DriveCourse/RestaurantInfo';
import DriveStart from '../Screens/DriveCourse/DriveStart';
import DriveSearch from '../Screens/DriveCourse/DriveSearch';

const Stack = createStackNavigator();

const DriveTab = ({route}) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'DriveMain' || routeName === undefined) {
      dispatch(showTabBar());
    } else {
      dispatch(hideTabBar());
    }
  }, [route]);
  return (
    <Stack.Navigator initialRouteName="DriveMain">
      <Stack.Screen
        name="DriveMain"
        component={DriveMain}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DriveSearch"
        component={DriveSearch}
        options={{headerShown: false}}
      />
      <Stack.Screen name="DriveFilter" component={DriveFilter} />
      <Stack.Screen name="DriveDetail" component={DriveDetail} />
      <Stack.Screen name="FestivalInfo" component={FestivalInfo} />
      <Stack.Screen name="RestaurantInfo" component={RestaurantInfo} />
      <Stack.Screen name="DriveStart" component={DriveStart} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    alignItems: 'center',
  },

  headerTitleText: {
    color: '#191919',
    fontSize: 18,
    fontFamily: 'SUIT-Bold',
  },
  rightIconContainer: {
    flexDirection: 'row',
    paddingVertical: 6.72,
    marginRight: 22,
  },
  leftIconContainer: {
    flexDirection: 'row',
    paddingVertical: 6.72,
    marginLeft: 16,
  },
});

export default DriveTab;
