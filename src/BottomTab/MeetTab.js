import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MeetMain from '../Screens/Meet/MeetMain';
const Stack = createStackNavigator();

const MeetTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Meet" component={MeetMain} />
    </Stack.Navigator>
  );
};

export default MeetTab;