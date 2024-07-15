import React, {useLayoutEffect} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import DriveMain from '../Screens/DriveCourse/DriveMain';
import DriveDetail from '../Screens/DriveCourse/DriveDetail';
import Share from '../assets/icons/ShareIcon.svg';
import BackIcon from '../assets/icons/BackIcon.svg';
import colors from '../styles/colors';
import FestivalInfo from '../components/FestivalInfo';

const Stack = createStackNavigator();

const DriveTab = ({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'DriveMain' || routeName === undefined) {
      navigation.setOptions({
        tabBarStyle: {height: Platform.OS === 'ios' ? 93 : 70, display: 'flex'},
      });
    } else {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator initialRouteName="DriveMain">
      <Stack.Screen name="DriveMain" component={DriveMain} />
      <Stack.Screen name="DriveDetail" component={DriveDetail} />
      <Stack.Screen name="FestivalInfo" component={FestivalInfo} />
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
