import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DriveMain from '../Screens/DriveCourse/DriveMain';
import DriveDetail from '../Screens/DriveCourse/DriveDetail';

const Stack = createStackNavigator();

const DriveTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drive" component={DriveMain} />
      <Stack.Screen name="DriveDetail" component={DriveDetail} />
    </Stack.Navigator>
  );
};

export default DriveTab;