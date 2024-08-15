import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MeetMain from '../Screens/Meet/MeetMain';
import MeetCreate from '../Screens/Meet/MeetCreate';
import MeetFilter from '../Screens/Meet/MeetFilter';
import MeetDetail from '../Screens/Meet/MeetDetail';
import MeetApplyDetail from '../Screens/Meet/MeetApplyDetail';
import OtherProfile from '../Screens/Common/OtherProfile';
import ReportPage from '../Screens/Common/ReportPage';
import {TouchableOpacity, View} from 'react-native';
import EyeIcon from '../assets/icons/EyeIcon.svg';
import colors from '../styles/colors';
import {textStyles} from '../styles/textStyles';
import { useDispatch } from 'react-redux';
import { showTabBar, hideTabBar } from '../features/tabBar/tabBarSlice';

const Stack = createStackNavigator();

const MeetTab = ({route}) => {

  const dispatch = useDispatch();
  
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MeetMain' || routeName === undefined) {
      dispatch(showTabBar())
    } else {
      dispatch(hideTabBar())
    }
  }, [route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MeetMain"
        component={MeetMain}
        options={{headerShown: false}}
      />
      <Stack.Screen name="MeetCreate" component={MeetCreate} />
      <Stack.Screen name="MeetFilter" component={MeetFilter} />
      <Stack.Screen name="MeetDetail" component={MeetDetail} />
      <Stack.Screen name="MeetApplyDetail" component={MeetApplyDetail} />
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
      <Stack.Screen name="ReportPage" component={ReportPage} />
    </Stack.Navigator>
  );
};

export default MeetTab;
