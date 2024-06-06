import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeMain from '../Screens/Home/HomeMain';

const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeMain} />
    </Stack.Navigator>
  );
};

export default HomeTab;