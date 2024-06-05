import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Auth/Login';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;