import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MeetMain from '../Screens/Meet/MeetMain';
import MeetCreate from '../Screens/Meet/MeetCreate';
import MeetFilter from '../Screens/Meet/MeetFilter';
import {TouchableOpacity, View} from 'react-native';
import EyeIcon from '../assets/icons/EyeIcon.svg';
import MeetDetail from '../Screens/Meet/MeetDetail';
import colors from '../styles/colors';
import {textStyles} from '../styles/textStyles';

const Stack = createStackNavigator();

const MeetTab = ({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MeetMain' || routeName === undefined) {
      navigation.setOptions({
        tabBarStyle: {height: Platform.OS === 'ios' ? 93 : 70, display: 'flex'},
      });
    } else {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MeetMain"
        component={MeetMain}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MeetCreate"
        component={MeetCreate}
      />
      <Stack.Screen name="MeetFilter" component={MeetFilter} />
      <Stack.Screen name="MeetDetail" component={MeetDetail} />
    </Stack.Navigator>
  );
};

export default MeetTab;
