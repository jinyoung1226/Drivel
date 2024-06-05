import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home/Home';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default MainNavigator;