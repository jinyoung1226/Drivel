import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import KakaoLogin from '../Screens/Auth/KakaoLogin';
import PasswordReset from '../Screens/Auth/PasswordReset';
import EmailLogin from '../Screens/Auth/EmailLogin';
import {textStyles} from '../styles/textStyles';
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
          headerTitleStyle: [textStyles.H2, textStyles.Gray10],
        }}
      />
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="EmailLogin" component={EmailLogin} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
