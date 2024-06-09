import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import KakaoLogin from '../Screens/Auth/KakaoLogin'
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;