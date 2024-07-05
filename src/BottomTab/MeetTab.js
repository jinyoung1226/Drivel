import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MeetMain from '../Screens/Meet/MeetMain';
import MeetCreate from '../Screens/Meet/MeetCreate';
import MeetFilter from '../Screens/Meet/MeetFilter';
import {TouchableOpacity, View} from 'react-native';
import EyeIcon from '../assets/icons/EyeIcon.svg';
import MeetDetail from '../Screens/Meet/MeetDetail';

const Stack = createStackNavigator();

const MeetTab = navigation => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Meet"
        component={MeetMain}
        options={{headerShown: false}}
      />
      <Stack.Screen name="MeetCreate" component={MeetCreate} />
      <Stack.Screen name="MeetFilter" component={MeetFilter} />
      <Stack.Screen name="MeetDetail" component={MeetDetail} />
    </Stack.Navigator>
  );
};

export default MeetTab;
