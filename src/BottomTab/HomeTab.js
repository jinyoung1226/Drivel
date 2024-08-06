import React, {useLayoutEffect} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeMain from '../Screens/Home/HomeMain';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Alarm from '../assets/homeIcon/alarm.svg';
import Search from '../assets/homeIcon/search.svg';
import Share from '../assets/icons/ShareIcon.svg';
import BackIcon from '../assets/icons/BackIcon.svg';
import colors from '../styles/colors';
import DriveDetail from '../Screens/DriveCourse/DriveDetail';
import FestivalInfo from '../components/FestivalInfo';
import { useDispatch } from 'react-redux';
import { showTabBar, hideTabBar } from '../features/tabBar/tabBarSlice';

const Stack = createStackNavigator();

const HomeTab = ({route}) => {

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Home' || routeName === undefined) {
      dispatch(showTabBar())
    } else {
      dispatch(hideTabBar())
    }
  }, [route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeMain}
        options={{
          headerTransparent: true,
          headerStyle: styles.headerStyle,
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitleText}>Drivel</Text>
              <View style={styles.iconContainer}>
                <Alarm />
                <Search />
              </View>
            </View>
          ),
          headerBackground: () => <View style={styles.headerBackground} />,
        }}
      />
      <Stack.Screen name="DriveDetail" component={DriveDetail} />
      <Stack.Screen name="FestivalInfo" component={FestivalInfo} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerTitleText: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'YdestreetB',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 6.72,
  },
  headerBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default HomeTab;
